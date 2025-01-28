import type { Action } from "../../types";
import { z } from "zod";
import { SolanaAgentKit } from "../../agent";

const getTokenPricesAction: Action = {
  name: "GET_SOLUTIOFI_TOKEN_PRICES",
  description: "Get token prices from SolutioFi",
  similes: [
    "get token prices",
    "check token prices",
    "price check on solutiofi",
  ],
  examples: [
    [
      {
        input: {
          mints: ["tokenMint123", "tokenMint456"],
        },
        output: {
          status: "success",
          prices: {
            tokenMint123: "1.23",
            tokenMint456: "4.56",
          },
        },
        explanation: "Get prices for specified tokens",
      },
    ],
  ],
  schema: z.object({
    mints: z
      .array(z.string())
      .describe("Array of mint addresses to get prices for"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { mints } = input;
      const prices = await agent.getTokenPrices(mints);

      return {
        status: "success",
        prices,
        message: "Successfully retrieved token prices",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to get token prices: ${error.message}`,
        code: error.code || "GET_PRICES_ERROR",
      };
    }
  },
};

export default getTokenPricesAction;
