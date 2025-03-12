import { Plugin, SolanaAgentKit } from "solana-agent-kit";


import {
  createParaPregenWallet,
  getParaPregenWallets,
  updateParaPregenWallet,
  switchWallet
} from "./tools";

import createParaPregenWalletAction from "./actions/createParaPregenWallet";
import getParaPregenWalletsAction from "./actions/getParaPregenWallets";
import updateParaPregenWalletAction from "./actions/updateParaPregenWallet";
import switchWalletAction from "./actions/switchWallet";
// Define and export the plugin
const ParaServerPlugin = {
  name: "para-server",

  // Combine all tools
  methods: {
    getParaPregenWallets,
    updateParaPregenWallet,
    createParaPregenWallet,
    switchWallet
  },

  // Combine all actions
  actions: [
    switchWalletAction,
    createParaPregenWalletAction,
    getParaPregenWalletsAction,
    updateParaPregenWalletAction,
  
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
export = ParaServerPlugin;
