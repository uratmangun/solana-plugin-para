import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";

export class ElfaPingTool extends Tool {
  name = "elfa_ping";
  description = "Checks the health of the Elfa AI API by pinging it.";

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(): Promise<string> {
    try {
      const data = await this.agent.pingElfaAiApi();
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaApiKeyStatusTool extends Tool {
  name = "elfa_api_key_status";
  description =
    "Retrieves the status and usage details of the Elfa AI API key.";

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(): Promise<string> {
    try {
      const data = await this.agent.getElfaAiApiKeyStatus();
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaGetMentionsTool extends Tool {
  name = "elfa_get_smart_mentions";
  description = `Retrieves tweets by smart accounts with smart engagement from the Elfa AI API.
  Inputs (input is a JSON string):
  {
    "limit": number,      // optional, default 100
    "offset": number      // optional, default 0
  }`;

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const params = input ? JSON.parse(input) : {};
      const limit = params.limit ?? 100;
      const offset = params.offset ?? 0;
      const data = await this.agent.getSmartMentions(limit, offset);
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaGetTopMentionsTool extends Tool {
  name = "elfa_get_top_mentions";
  description = `Retrieves top tweets for a given ticker symbol from the Elfa AI API.
  Inputs (input is a JSON string):
  {
    "ticker": string,               // required, e.g. "SOL"
    "timeWindow": string,           // optional, default "1h"
    "page": number,                 // optional, default 1
    "pageSize": number,             // optional, default 10
    "includeAccountDetails": boolean // optional, default false
  }`;

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const params = JSON.parse(input);
      if (!params.ticker) {
        throw new Error("Ticker is required.");
      }
      const timeWindow = params.timeWindow || "1h";
      const page = params.page || 1;
      const pageSize = params.pageSize || 10;
      const includeAccountDetails = params.includeAccountDetails || false;
      const data = await this.agent.getTopMentionsByTicker(
        params.ticker,
        timeWindow,
        page,
        pageSize,
        includeAccountDetails,
      );
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaSearchMentionsTool extends Tool {
  name = "elfa_search_mentions_by_keywords";
  description = `Searches for tweets by keywords within a specified date range using the Elfa AI API.
  Inputs (input is a JSON string):
  {
    "keywords": string,  // required, a string of keywords seperated by commas
    "from": number,        // required, start date as unix timestamp
    "to": number,          // required, end date as unix timestamp
    "limit": number,       // optional, default 20
  }`;

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const params = JSON.parse(input);
      if (!params.keywords || !params.from || !params.to) {
        throw new Error("Keywords, from, and to fields are required.");
      }
      const limit = params.limit || 20;
      const data = await this.agent.searchMentionsByKeywords(
        params.keywords,
        params.from,
        params.to,
        limit,
      );
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaTrendingTokensTool extends Tool {
  name = "elfa_trending_tokens";
  description = `Retrieves trending tokens based on mentions from the Elfa AI API.`;

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const data = await this.agent.getTrendingTokens();
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}

export class ElfaAccountSmartStatsTool extends Tool {
  name = "elfa_account_smart_stats";
  description = `Retrieves smart stats and social metrics for a specified twitter account from the Elfa AI API.
  Inputs (input is a JSON string):
  {
    "username": string  // required
  }`;

  constructor(private agent: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const params = JSON.parse(input);
      if (!params.username) {
        throw new Error("Username is required.");
      }
      const data = await this.agent.getSmartTwitterAccountStats(
        params.username,
      );
      return JSON.stringify({ status: "success", data });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}
