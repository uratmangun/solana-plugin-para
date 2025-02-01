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
    "remove empty accounts",
    "clean up token accounts",
    "close SPL token accounts",
    "clean wallet",
    "shut down token accounts",
    "delete my token accounts",
    "close all inactive accounts",
    "remove unused accounts",
    "terminate SolutioFi accounts",
    "disable token accounts",
    "deactivate empty token accounts",
    "close redundant token accounts",
    "clear token accounts",
    "clear out unused accounts",
    "free up space by closing accounts",
    "reclaim SOL by closing accounts",
    "remove dust accounts",
    "purge my wallet of empty accounts",
    "clean up my wallet",
    "close obsolete token accounts",
    "stop tracking these token accounts",
    "delete token accounts permanently",
    "wipe out unused accounts",
    "shrink my wallet size",
    "I want to close some accounts",
    "help me remove extra token accounts",
    "delete unnecessary accounts",
    "get rid of my extra accounts",
    "stop storing old token accounts",
    "automatically close empty accounts",
    "revoke token accounts",
    "finalize and close my token accounts",
    "close down Solana token accounts",
    "remove all zero-balance token accounts",
    "disable my SPL token accounts",
    "remove dust from my wallet",
    "clean up wallet clutter",
    "shut down old token accounts",
    "clear old token accounts",
    "close excess token accounts",
    "I want to remove some token accounts",
    "clean my Solana wallet",
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
