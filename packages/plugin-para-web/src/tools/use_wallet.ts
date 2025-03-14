import {para} from "../utils/config";
import { ParaSolanaWeb3Signer } from "@getpara/solana-web3.js-v1-integration";
import { Connection,VersionedTransaction, Transaction, PublicKey } from "@solana/web3.js";
import {SolanaAgentKit} from "solana-agent-kit";
export async function useWallet(agent: SolanaAgentKit, walletId: string) {
  try {
  if(!walletId){
    throw new Error("Provide `walletId` in the request body to use a wallet.");
  }
    const isLoggedIn = await para.isFullyLoggedIn();
if(!isLoggedIn){
  throw new Error("Please login to Para to use a wallet.");
}
const solanaConnection = new Connection(process.env.NEXT_PUBLIC_RPC_URL as string);

// Create the Para Solana Signer
const solanaSigner = new ParaSolanaWeb3Signer(para, solanaConnection,walletId);
agent.wallet = {
  publicKey: solanaSigner.sender as PublicKey,
  sendTransaction: async (tx: VersionedTransaction | Transaction) => {
    if (tx instanceof VersionedTransaction) {
      const signedTx = await solanaSigner.signVersionedTransaction(tx);
      return await solanaConnection.sendRawTransaction(signedTx.serialize());
    } else {
      const signedTx = await solanaSigner.signTransaction(tx);
      return await solanaConnection.sendRawTransaction(signedTx.serialize());
    }
  },
  signTransaction: async <T extends Transaction | VersionedTransaction>(tx: T): Promise<T> => {
    if (tx instanceof VersionedTransaction) {
      return await solanaSigner.signVersionedTransaction(tx) as T;
    } else {
      return await solanaSigner.signTransaction(tx) as T;
    }
  },
  signAllTransactions: async <T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]> => {
    const signedTxs = await Promise.all(txs.map(async (tx) => {
      if (tx instanceof VersionedTransaction) {
        return await solanaSigner.signVersionedTransaction(tx) as T;
      } else {
        return await solanaSigner.signTransaction(tx) as T;
      }
    }));
    return signedTxs;
  },
};

    return {
       message: "Wallet used successfully.",
       walletId
    };
  } catch (error: any) {
    throw new Error(`use wallet failed ${error.message}`);
  }
}
