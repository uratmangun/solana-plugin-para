import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class SolanaGetTokenPricesTool extends Tool {
  name = "get_solutiofi_token_prices";
  description = `Get token prices from SolutioFi protocol.
  Input: JSON string with mints array`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const { mints } = JSON.parse(input);
      const prices = await this.solanaKit.getTokenPrices(mints);
      return JSON.stringify({
        status: "success",
        prices,
      });
    } catch (error: any) {
      return JSON.stringify({ status: "error", message: error.message });
    }
  }
}
