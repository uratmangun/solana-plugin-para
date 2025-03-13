import { Action } from "solana-agent-kit";
import { SolanaAgentKit } from "solana-agent-kit";
import { z } from "zod";
import { switchWallet } from "../tools";

const switchWalletAction: Action = {
  name: "SWITCH_WALLET",
  similes: [
    "switch wallet",
    "change wallet"
  ],
  description: "Switch wallet between pre-generated and main wallet",
  examples: [
    [
      {
        input: {
          userShare: "sdfsdfsdfsd",
          type: "pregen"
        },
        output: {
          status: "success",
          message: "switched to pre-generated wallet successfully",
         
        },
        explanation: "Switch wallet between pre-generated and main wallet",
      },
    ],
  ],
  schema: z.object({
    userShare: z.string().describe("The user share to switch wallet"),
    type: z.enum(["pregen", "main"]).describe("The type of wallet to switch to"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { userShare, type } = input;
      const response = await switchWallet(agent,userShare, type);

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

export default switchWalletAction;
