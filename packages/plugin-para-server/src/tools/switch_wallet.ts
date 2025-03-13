import {para} from "../utils/config"
import { SolanaAgentKit,type BaseWallet } from "solana-agent-kit";
import { baseWallet } from "../utils/base-wallet";
import { Connection,VersionedTransaction, Transaction, PublicKey } from "@solana/web3.js";
import { ParaSolanaWeb3Signer } from "@getpara/solana-web3.js-v1-integration";
export async function switchWallet(agent:SolanaAgentKit,userShare:string,type:"pregen" | "main") {
  try {
    if (type=="pregen" && !userShare) {
      throw new Error(
        "Provide `userShare` in the request body to switch wallet.",
      );
    }

    if (type==="main" ) {
      agent.wallet = baseWallet as BaseWallet;
      return {
        message: "switched to main wallet successfully",
      };
    } else {
      await para.setUserShare(userShare); 
      const solanaConnection = new Connection(process.env.RPC_URL as string);

      // Create the Para Solana Signer
      const solanaSigner = new ParaSolanaWeb3Signer(para, solanaConnection);  
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
        message: "switched to pre-generated wallet successfully",
      };
    }
  } catch (error: any) {
    throw new Error(`Error switching wallet: ${error.message}`);
  }
}
