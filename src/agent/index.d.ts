import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Config, Plugin } from "../types";
/**
 * Main class for interacting with Solana blockchain
 * Provides a unified interface for token operations, NFT management, trading and more
 *
 * @class SolanaAgentKit
 * @property {@link Connection} connection - Solana RPC connection
 * @property {@link Keypair} wallet - Wallet keypair for signing transactions
 * @property {@link PublicKey} wallet_address - Public key of the wallet
 * @property {@link Config} config - Configuration object
 */
export declare class SolanaAgentKit {
    connection: Connection;
    wallet: Keypair;
    wallet_address: PublicKey;
    config: Config;
    private plugins;
    /**
     * @deprecated Using openai_api_key directly in constructor is deprecated.
     * Please use the new constructor with Config object instead:
     * @example
     * const agent = new SolanaAgentKit(privateKey, rpcUrl, {
     *   OPENAI_API_KEY: 'your-key'
     * });
     */
    constructor(private_key: string, rpc_url: string, openai_api_key: string | null);
    constructor(private_key: string, rpc_url: string, config: Config);
    use(plugin: Plugin): this;
}
//# sourceMappingURL=index.d.ts.map