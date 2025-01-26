import {
  ChainName,
  fetchQuote,
  Quote,
  swapFromEvm,
  swapFromSolana,
} from "@mayanfinance/swap-sdk";
import { SolanaAgentKit } from "../../agent";
import { getDefaultProvider, TransactionResponse, Wallet } from "ethers";
import { VersionedTransaction, Transaction } from "@solana/web3.js";

export async function swap(
  agent: SolanaAgentKit,
  amount: string,
  fromChain: string,
  fromToken: string,
  toChain: string,
  toToken: string,
  dstAddr: string,
  slippageBps: "auto" | number = "auto",
): Promise<string> {
  const quotes = await fetchQuote({
    amount: +amount,
    fromChain: fromChain as ChainName,
    toChain: toChain as ChainName,
    fromToken,
    toToken,
    slippageBps,
  });
  if (quotes.length === 0) {
    throw new Error(
      "There is no quote available for the tokens you requested.",
    );
  }

  let txHash;
  if (fromChain === "solana") {
    txHash = await swapSolana(quotes[0], agent, dstAddr);
  } else {
    txHash = await swapEVM(quotes[0], agent, dstAddr);
  }

  return `https://explorer.mayan.finance/swap/${txHash}`;
}

async function swapSolana(
  quote: Quote,
  agent: SolanaAgentKit,
  dstAddr: string,
): Promise<string> {
  const jitoConfig = await getJitoConfig();
  const jitoTipLamports = await getJitoTipLamports();
  const jitoTip = jitoConfig?.enable
    ? Math.min(
        jitoTipLamports || jitoConfig?.defaultTipLamports,
        jitoConfig?.maxTipLamports,
      )
    : 0;

  const jitoOptions = {
    tipLamports: jitoTip,
    jitoAccount: jitoConfig.jitoAccount,
    jitoSendUrl: jitoConfig.sendBundleUrl,
    signAllTransactions: async <T extends Transaction | VersionedTransaction>(
      trxs: T[],
    ): Promise<T[]> => {
      for (let i = 0; i < trxs.length; i++) {
        if ("version" in trxs[i]) {
          (trxs[i] as VersionedTransaction).sign([agent.wallet]);
        } else {
          (trxs[i] as Transaction).partialSign(agent.wallet);
        }
      }
      return trxs;
    },
  };

  const signer = async <T extends Transaction | VersionedTransaction>(
    trx: T,
  ): Promise<T> => {
    if ("version" in trx) {
      (trx as VersionedTransaction).sign([agent.wallet]);
    } else {
      (trx as Transaction).partialSign(agent.wallet);
    }
    return trx;
  };

  const swapRes = await swapFromSolana(
    quote,
    agent.wallet.publicKey.toString(),
    dstAddr,
    null,
    signer,
    agent.connection,
    [],
    { skipPreflight: true },
    jitoOptions,
  );
  if (!swapRes.signature) {
    throw new Error("Error on swap from solana. Try again.");
  }

  try {
    const { blockhash, lastValidBlockHeight } =
      await agent.connection.getLatestBlockhash();
    const result = await agent.connection.confirmTransaction(
      {
        signature: swapRes.signature,
        blockhash: blockhash,
        lastValidBlockHeight: lastValidBlockHeight,
      },
      "confirmed",
    );
    if (result?.value.err) {
      throw new Error(`Transaction ${swapRes.serializedTrx} reverted!`);
    }
    return swapRes.signature;
  } catch (error) {
    // Wait for 3 sec and check mayan explorer
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const res = await fetch(
      `https://explorer-api.mayan.finance/v3/swap/trx/${swapRes.signature}`,
    );
    if (res.status !== 200) {
      throw error;
    }
    return swapRes.signature;
  }
}

let evmWallet: Wallet | null;

async function swapEVM(
  quote: Quote,
  agent: SolanaAgentKit,
  dstAddr: string,
): Promise<string> {
  if (!evmWallet) {
    if (agent.config.ETHEREUM_PRIVATE_KEY) {
      evmWallet = new Wallet(agent.config.ETHEREUM_PRIVATE_KEY);
    } else {
      throw new Error("You haven't provided EVM wallet private key.");
    }
  }
  const signer = evmWallet.connect(getDefaultProvider(quote.fromToken.chainId));

  const swapRes = await swapFromEvm(
    quote,
    evmWallet.address,
    dstAddr,
    null,
    signer,
    // TODO: permit.
    null,
    null,
    null,
  );
  if (typeof swapRes === "string") {
    return swapRes;
  }
  return (swapRes as TransactionResponse).hash;
}

type SolanaJitoConfig = {
  enable: boolean;
  defaultTipLamports: number;
  maxTipLamports: number;
  sendBundleUrl: string;
  jitoAccount: string;
};

type SiaResponse = Readonly<{
  solanaJitoConfig: SolanaJitoConfig;
}>;

async function getJitoConfig(): Promise<SolanaJitoConfig> {
  const res = await fetch(`https://sia.mayan.finance/v4/init`);
  const data: SiaResponse = await res.json();
  return data.solanaJitoConfig;
}

async function getJitoTipLamports() {
  const res = await fetch(`https://price-api.mayan.finance/jito-tips/suggest`);
  const data = await res.json();
  const tip =
    typeof data?.default === "number" && Number.isFinite(data.default)
      ? data?.default?.toFixed(9)
      : null;
  return tip ? Math.floor(Number(tip) * 10 ** 9) : null;
}
