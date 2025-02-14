import { Plugin, SolanaAgentKit } from "solana-agent-kit";

// Import all actions
import getAllDomainsTLDsAction from "./alldomains/actions/getAllDomainsTLDs";
import getOwnedAllDomainsAction from "./alldomains/actions/getOwnedAllDomains";
import getOwnedDomainsForTLDAction from "./alldomains/actions/getOwnedDomainsForTLD";
import resolveDomainAction from "./alldomains/actions/resolveDomain";
import getAllTopicsAction from "./allora/actions/getAllTopics";
import getInferenceByTopicIdAction from "./allora/actions/getInferenceByTopicId";
import getPriceInferenceAction from "./allora/actions/getPriceInference";
import createGibworkTaskAction from "./gibwork/actions/createGibworkTask";
import createWebhookAction from "./helius/actions/createWebhook";
import deleteWebhookAction from "./helius/actions/deleteWebhook";
import getAssetsByOwnerAction from "./helius/actions/getAssetsbyOwner";
import getWebhookAction from "./helius/actions/getWebhook";
import parseSolanaTransactionAction from "./helius/actions/parseTransaction";

// Import all tools
import { getAllDomainsTLDs, getOwnedAllDomains, getOwnedDomainsForTLD, resolveAllDomains } from "./alldomains/tools";
import { getAllTopics, getInferenceByTopicId, getPriceInference } from "./allora/tools";
import { createGibworkTask } from "./gibwork/tools";
import { create_HeliusWebhook, deleteHeliusWebhook, getAssetsByOwner, getHeliusWebhook, parseTransaction } from "./helius/tools";

// Define and export the plugin
const MiscPlugin: Plugin = {
    name: 'misc',

    // Combine all tools
    methods: {
        getAllDomainsTLDs,
        getOwnedAllDomains,
        getOwnedDomainsForTLD,
        resolveAllDomains,
        getAllTopics,
        getInferenceByTopicId,
        getPriceInference,
        createGibworkTask,
        create_HeliusWebhook,
        deleteHeliusWebhook,
        getAssetsByOwner,
        getHeliusWebhook,
        parseTransaction
    },

    // Combine all actions
    actions: [
        getAllDomainsTLDsAction,
        getOwnedAllDomainsAction,
        getOwnedDomainsForTLDAction,
        resolveDomainAction,
        getAllTopicsAction,
        getInferenceByTopicIdAction,
        getPriceInferenceAction,
        createGibworkTaskAction,
        createWebhookAction,
        deleteWebhookAction,
        getAssetsByOwnerAction,
        getWebhookAction,
        parseSolanaTransactionAction
    ],

    // Initialize function
    initialize: function (agent: SolanaAgentKit): void {

        // Initialize all methods with the agent instance
        Object.entries(this.methods).forEach(([methodName, method]) => {
            if (typeof method === 'function') {
                this.methods[methodName] = method.bind(null, agent);
            }
        });


        // Any necessary initialization logic
        if (!agent.config.OPENAI_API_KEY) {
            console.warn('Warning: OPENAI_API_KEY not provided in config');
        }
    }
};

// Default export for convenience
export = MiscPlugin;