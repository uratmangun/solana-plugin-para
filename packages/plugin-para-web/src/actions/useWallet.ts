import { Action } from "solana-agent-kit";
import { SolanaAgentKit } from "solana-agent-kit";
import { z } from "zod";
import { useWallet } from "../tools";

const useWalletAction: Action = {
  name: "USE_WALLET",
  similes: [
    "use wallet"
  ],
  description: "Use a wallet",
  examples: [
    [
      {
        input: {
            walletId: "asdasdas",
        },
        output: {
          status: "success",
            message: "Wallet used successfully.",
          walletId:"asdasdas"
        },
        explanation: "Use a wallet",
      },
    ],
  ],
  schema: z.object({
    email: z.string().describe("The email address to create the wallet for"),
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    try {
      const { walletId } = input;
      const response = await useWallet(agent, walletId);

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

export default useWalletAction;
