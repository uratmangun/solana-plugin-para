import { Action } from "solana-agent-kit";
import { SolanaAgentKit } from "solana-agent-kit";
import { z } from "zod";
import { claimParaPregenWallet } from "../tools";

const claimParaPregenWalletAction: Action = {
  name: "CLAIM_PARA_PREGEN_WALLET",
  similes: [
    "claim para pregen wallet"
  ],
  description: "Claim a pregen wallet for Para",
  examples: [
    [
      {
        input: {
          email: "test@test.com",
        },
        output: {
          status: "success",
          message: "Pre-generated wallet claimed successfully.",
        email:"test@test.com"
        },
        explanation: "Claim a pregen wallet for Para",
      },
    ],
  ],
  schema: z.object({
    email: z.string().describe("The email address to create the wallet for"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { email } = input;
      const response = await claimParaPregenWallet(email);

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

export default claimParaPregenWalletAction;
