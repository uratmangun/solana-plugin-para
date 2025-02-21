import { Plugin, SolanaAgentKit } from "solana-agent-kit";

// Import all actions
// dexscreener
import getTokenDataAction from "./dexscreener/actions/getTokenData";
import tokenDataByTickerAction from "./dexscreener/actions/getTokenDataByTicker";

// jupiter
import fetchPriceAction from "./jupiter/actions/fetchPrice";
import stakeWithJupAction from "./jupiter/actions/stakeWithJup";
import tradeAction from "./jupiter/actions/trade";

// lightprotocol
import compressedAirdropAction from "./lightprotocol/actions/compressedAirdrop";

// solana
import balanceAction from "./solana/actions/balance";
import tokenBalancesAction from "./solana/actions/tokenBalances";
import getTPSAction from "./solana/actions/getTPS";
import closeEmptyTokenAccountsAction from "./solana/actions/closeEmptyTokenAccounts";
import requestFundsAction from "./solana/actions/requestFunds";
import transferAction from "./solana/actions/transfer";

// mayan
import mayanSwapAction from "./mayan/actions/swap";

// pumpfun
import launchPumpfunTokenAction from "./pumpfun/actions/launchPumpfunToken";

// pyth
import pythFetchPriceAction from "./pyth/actions/pythFetchPrice";

// rugcheck
import rugcheckAction from "./rugcheck/actions/rugcheck";

// Import all tools
import {
  getTokenDataByAddress,
  getTokenAddressFromTicker,
  getTokenDataByTicker,
} from "./dexscreener/tools";
import { fetchPrice } from "./jupiter/tools/fetch_price";
import { stakeWithJup } from "./jupiter/tools/stake_with_jup";
import { trade } from "./jupiter/tools/trade";
import { sendCompressedAirdrop } from "./lightprotocol/tools/send_compressed_airdrop";
// Define and export the plugin
const TokenPlugin = {
  name: "token",

  // Combine all tools
  methods: {
    getTokenDataByAddress,
    getTokenAddressFromTicker,
    getTokenDataByTicker,
    fetchPrice,
    stakeWithJup,
    trade,
    sendCompressedAirdrop,
  },

  // Combine all actions
  actions: [
    getTokenDataAction,
    tokenDataByTickerAction,
    fetchPriceAction,
    stakeWithJupAction,
    tradeAction,
    compressedAirdropAction,
    balanceAction,
    tokenBalancesAction,
    getTPSAction,
    closeEmptyTokenAccountsAction,
    requestFundsAction,
    transferAction,
    mayanSwapAction,
    launchPumpfunTokenAction,
    pythFetchPriceAction,
    rugcheckAction,
  ],

  // Initialize function
  initialize: function (agent: SolanaAgentKit): void {
    // Initialize all methods with the agent instance
    Object.entries(this.methods).forEach(([methodName, method]) => {
      if (typeof method === "function") {
        this.methods[methodName] = method.bind(null, agent);
      }
    });

    // Any necessary initialization logic
    if (!agent.config.OPENAI_API_KEY) {
      console.warn("Warning: OPENAI_API_KEY not provided in config");
    }
  },
} satisfies Plugin;

// Default export for convenience
export = TokenPlugin;
