import { Plugin, SolanaAgentKit } from "solana-agent-kit";

// Import all actions
import getTokenDataAction from "./dexscreener/actions/getTokenData";
import tokenDataByTickerAction from "./dexscreener/actions/getTokenDataByTicker";
import fetchPriceAction from "./jupiter/actions/fetchPrice";
import stakeWithJupAction from "./jupiter/actions/stakeWithJup";
import tradeAction from "./jupiter/actions/trade";
import compressedAirdropAction from "./lightprotocol/actions/compressedAirdrop";

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
