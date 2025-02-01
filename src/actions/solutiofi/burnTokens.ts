import type { Action } from "../../types";
import { z } from "zod";
import { SolanaAgentKit } from "../../agent";
import { PublicKey } from "@solana/web3.js";

const burnTokensAction: Action = {
  name: "BURN_SOLUTIOFI_TOKENS",
  description: "Burn tokens using SolutioFi",
  similes: [
    "burn tokens",
    "destroy tokens",
    "burn assets",
    "remove tokens from circulation",
    "delete my tokens",
    "send tokens to burn address",
    "permanently remove my tokens",
    "burn my SolutioFi tokens",
    "burn assets on solutiofi",
  ],
  examples: [
    [
      {
        input: {
          mints: ["tokenMint123", "tokenMint456"],
        },
        output: {
          status: "success",
          message: "Successfully burned tokens",
          transactions: ["tx_signature"],
        },
        explanation: "Burn specified tokens",
      },
    ],
  ],
  schema: z.object({
    mints: z.array(z.string()).describe("Array of mint addresses to burn"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { mints } = input;
      const transactions = await agent.burnTokens(mints);

      return {
        status: "success",
        transactions,
        message: "Successfully burned tokens",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to burn tokens: ${error.message}`,
        code: error.code || "BURN_TOKENS_ERROR",
      };
    }
  },
};

export default burnTokensAction;
