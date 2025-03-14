import { Plugin, SolanaAgentKit } from "solana-agent-kit";


import {
  claimParaPregenWallet,
  getParaInstance,
  getAllWallets,
  useWallet
} from "./tools";

import claimParaPregenWalletAction from "./actions/claimParaPregenWallet";
import getAllWalletsAction from "./actions/getAllWallets";
import useWalletAction from "./actions/useWallet";
// Define and export the plugin
const ParaWebPlugin = {
  name: "para-web",

  // Combine all tools
  methods: {
    claimParaPregenWallet,  
    getParaInstance,
    getAllWallets,
    useWallet
  },

  // Combine all actions
  actions: [
   
    claimParaPregenWalletAction,
    getAllWalletsAction,
    useWalletAction
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
export default ParaWebPlugin;
