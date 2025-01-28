import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaGetUserTokensTool extends Tool {
  name = "get_solutiofi_user_tokens";
  description = `Get user tokens from SolutioFi protocol.
  Input: JSON string with assetType`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const { assetType } = JSON.parse(input);
      const tokens = await this.solanaKit.getUserTokens(assetType);
      return JSON.stringify({
        status: "success",
        tokens,
      });
    } catch (error: any) {
      return JSON.stringify({ status: "error", message: error.message });
    }
  }
}
