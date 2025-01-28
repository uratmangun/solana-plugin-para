import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaMergeTokensTool extends Tool {
  name = "merge_tokens";
  description = `Merge tokens using SolutioFi protocol.
  Input: JSON string with inputAssets, outputMint, and priorityFee`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const { inputAssets, outputMint, priorityFee } = JSON.parse(input);
      const result = await this.solanaKit.mergeTokens(
        inputAssets,
        outputMint,
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
