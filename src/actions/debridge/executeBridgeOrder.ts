import { z } from "zod";
import { Action } from "../../types/action";
import { executeBridgeOrder } from "../../tools/debridge/executeBridgeOrder";
import { SolanaAgentKit } from "../../agent";

const executeBridgeOrderAction: Action = {
  name: "EXECUTE_BRIDGE_ORDER",
  description: "Execute a cross-chain bridge transaction on Solana. ⚠️ IMPORTANT: This is a critical operation that will move your tokens between chains - always get user confirmation before proceeding. This is the final step in the bridging process after getting a quote and creating an order. The transaction data must be obtained from CREATE_BRIDGE_ORDER first. Follow these steps:\n1. Use GET_SUPPORTED_CHAINS to find chain IDs\n2. Use GET_TOKENS_INFO to get token addresses\n3. Use GET_BRIDGE_QUOTE to estimate fees and amounts\n4. Use CREATE_BRIDGE_ORDER to prepare the transaction\n5. Get explicit user confirmation to proceed\n6. Finally, use this command to execute the prepared transaction\n\nExample:\nEXECUTE_BRIDGE_ORDER { \"transactionData\": \"0x123...\" }",
  similes: [
    "execute bridge transaction",
    "send bridge transaction",
    "submit bridge transaction",
    "process bridge transaction",
    "complete bridge transfer",
    "finalize cross-chain transfer"
  ],
  examples: [
    [
      {
        input: {
          transactionData: "0x23b872dd000000000000000000000000742d35cc6634c0532925a3b844bc454e4438f44e000000000000000000000000e7351fd770a37282b91d153ee690b63579b6e837000000000000000000000000000000000000000000000000000de0b6b3a7640000"
        },
        output: {
          status: "success",
          signature: "4jJ6UvwqzHHqKif7hKvz3JwA8qQFEAuQqFBpPgX6qHzk9UF9eBiNJSqrEEtbqzVBGZYqoAKK6hUqHP4YmwmvQsZm",
          message: "Successfully executed bridge transaction. Signature: 4jJ6..."
        },
        explanation: "After getting user confirmation, execute a cross-chain bridge transaction using transaction data from CREATE_BRIDGE_ORDER. This will move tokens between chains. The signature can be used to track the transaction status."
      }
    ]
  ],
  schema: z.object({
    transactionData: z.string().describe("Transaction data obtained from CREATE_BRIDGE_ORDER command. Must be provided exactly as shown in the CREATE_BRIDGE_ORDER output. ⚠️ IMPORTANT: Get user confirmation before executing this transaction as it will move tokens between chains.")
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      // Add warning in logs before execution
      process.stdout.write("\n⚠️  WARNING: About to execute cross-chain bridge transaction. This will move tokens between chains.\n");
      process.stdout.write(`\n📝 Using transaction data: ${input.transactionData}\n`);
      
      const signature = await executeBridgeOrder(agent, input.transactionData);

      return {
        status: "success",
        signature,
        message: `Successfully executed bridge transaction. Signature: ${signature.slice(0, 4)}...`
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to execute bridge transaction: ${error.message}`
      };
    }
  }
};

export default executeBridgeOrderAction;
