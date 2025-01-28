import type { Action } from "../../types";
import { z } from "zod";
import { SolanaAgentKit } from "../../agent";
import { AssetType } from "../../tools/solutiofi/types";

const getUserTokensAction: Action = {
  name: "GET_SOLUTIOFI_USER_TOKENS",
  description: "Get user token holdings from SolutioFi",
  similes: [
    "get user tokens",
    "check token holdings",
    "list my tokens on solutiofi",
  ],
  examples: [
    [
      {
        input: {
          assetType: "assets",
        },
        output: {
          status: "success",
          tokens: [
            { mint: "token1", balance: "100" },
            { mint: "token2", balance: "200" },
          ],
        },
        explanation: "Get user's token holdings",
      },
    ],
  ],
  schema: z.object({
    assetType: z
      .enum(["assets", "accounts", "nfts"])
      .describe("Type of assets to retrieve"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { assetType } = input;
      const tokens = await agent.getUserTokens(assetType as AssetType);

      return {
        status: "success",
        tokens,
        message: "Successfully retrieved user tokens",
      };
    } catch (error: any) {
      return {
        status: "error",
        message: `Failed to get user tokens: ${error.message}`,
        code: error.code || "GET_USER_TOKENS_ERROR",
      };
    }
  },
};

export default getUserTokensAction;
