import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaBurnTokensTool extends Tool {
  name = "burn_solutiofi_tokens";
  description = `Burn tokens using SolutioFi protocol.
  Input: JSON string with mints array to burn`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const { mints } = JSON.parse(input);
      const transactions = await this.solanaKit.burnTokens(mints);
      return JSON.stringify({
        status: "success",
        transactions,
      });
    } catch (error: any) {
      return JSON.stringify({ status: "error", message: error.message });
    }
  }
}
