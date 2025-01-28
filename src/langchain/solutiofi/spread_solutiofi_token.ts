import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaSpreadTokenTool extends Tool {
  name = "spread_solutiofi_token";
  description = `Spread token using SolutioFi protocol.
  Input: JSON string with inputAsset, targetTokens, and priorityFee`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const { inputAsset, targetTokens, priorityFee } = JSON.parse(input);
      const result = await this.solanaKit.spreadToken(
        inputAsset,
        targetTokens,
        priorityFee,
      );
      return JSON.stringify({
        status: "success",
        result,
      });
    } catch (error: any) {
      return JSON.stringify({ status: "error", message: error.message });
    }
  }
}
