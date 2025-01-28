import type { Action } from "../../types";
import { z } from "zod";
import { SolanaAgentKit } from "../../agent";
import { PublicKey } from "@solana/web3.js";

const closeAccountsAction: Action = {
  name: "CLOSE_SOLUTIOFI_ACCOUNTS",
  description: "Close specific token accounts using SolutioFi",
  similes: [
    "close token accounts",
    "close solutiofi accounts",
    "close accounts on solutiofi",
  ],
  examples: [
    [
      {
        input: {
          mints: ["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"],
        },
        output: {
          status: "success",
          message: "Successfully closed accounts",
          transactions: ["tx_signature"],
        },
        explanation: "Close specified token accounts",
      },
    ],
  ],
  schema: z.object({
    mints: z.array(z.string()).describe("Array of mint addresses to close"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { mints } = input;
      const transactions = await agent.closeAccounts(mints);

      return {
        status: "success",
        transactions,
        message: `Successfully closed ${mints.length} accounts`,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to close accounts: ${error.message}`,
        code: error.code || "CLOSE_ACCOUNTS_ERROR",
      };
    }
  },
};

export default closeAccountsAction;
