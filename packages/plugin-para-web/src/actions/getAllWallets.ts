import { Action } from "solana-agent-kit";
import { SolanaAgentKit } from "solana-agent-kit";
import { z } from "zod";
import { getAllWallets } from "../tools";

const getAllWalletsAction: Action = {
  name: "GET_ALL_WALLETS",
  similes: ["get all wallets"],
  description: "Get all wallets",
  examples: [
    [
      {
        input: {},
        output: {
          status: "success",
          wallets: [],
        },
        explanation: "Get all wallets",
      },
    ],
  ],
  schema: z.object({}),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const response = await getAllWallets();

      return {
        status: "success",
        ...response,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: error.message,
      };
    }
  },
};

export default getAllWalletsAction;
