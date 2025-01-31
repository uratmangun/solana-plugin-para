import { VersionedTransaction } from "@solana/web3.js";
import { SolanaAgentKit } from "../../agent";

/**
 * Execute a bridge transaction on Solana.
 * Takes the transaction data from createBridgeOrder and executes it.
 * 
 * @param agent SolanaAgentKit instance for signing and sending the transaction
 * @param transactionData Hex-encoded transaction data from createBridgeOrder
 * @returns Transaction signature
 */
export async function executeBridgeOrder(
  agent: SolanaAgentKit,
  transactionData: string
): Promise<string> {
  try {
    process.stdout.write("\n Preparing to execute bridge transaction");
    process.stdout.write(`\n Transaction Data: ${transactionData}`);
    
    const txBuffer = Buffer.from(transactionData.substring(2), "hex");

    const transaction = VersionedTransaction.deserialize(txBuffer);
    transaction.sign([agent.wallet]);
    process.stdout.write("\n Sending transaction...");
    
    const signature = await agent.connection.sendTransaction(transaction);
    
    process.stdout.write(`\n Transaction sent! Signature: ${signature}`);
    process.stdout.write("\n Confirming transaction...");
    
    const confirmation = await agent.connection.confirmTransaction(signature);
    
    if (confirmation.value.err) {
      process.stderr.write(`\n Transaction failed: ${JSON.stringify(confirmation.value.err)}\n`);
      throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}`);
    }
    
    process.stdout.write(`\n Transaction confirmed! View on explorer: https://explorer.solana.com/tx/${signature}\n`);
    
    return signature;
  } catch (error: any) {
    process.stderr.write(`\n Failed to execute bridge transaction: ${error.message}\n`);
    if (error.logs) {
      process.stderr.write("\n Transaction logs:");
      error.logs.forEach((log: string) => process.stderr.write(`\n${log}`));
    }
    throw error;
  }
}
