import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
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
export class SolanaAgentKit {
  public connection: Connection;
  public wallet: Keypair;
  public wallet_address: PublicKey;
  public config: Config;
  private plugins: Map<string, Plugin> = new Map();

  /**
   * @deprecated Using openai_api_key directly in constructor is deprecated.
   * Please use the new constructor with Config object instead:
   * @example
   * const agent = new SolanaAgentKit(privateKey, rpcUrl, {
   *   OPENAI_API_KEY: 'your-key'
   * });
   */
  constructor(
    private_key: string,
    rpc_url: string,
    openai_api_key: string | null,
  );
  constructor(private_key: string, rpc_url: string, config: Config);
  constructor(
    private_key: string,
    rpc_url: string,
    configOrKey: Config | string | null,
  ) {
    this.connection = new Connection(
      rpc_url || "https://api.mainnet-beta.solana.com",
    );
    this.wallet = Keypair.fromSecretKey(bs58.decode(private_key));
    this.wallet_address = this.wallet.publicKey;

    // Handle both old and new patterns
    if (typeof configOrKey === "string" || configOrKey === null) {
      this.config = { OPENAI_API_KEY: configOrKey || "" };
    } else {
      this.config = configOrKey;
    }
  }

  use(plugin: Plugin): this {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin ${plugin.name} is already registered`);
    }
    plugin.initialize(this);
    
    // Add all plugin methods to the agent instance
    Object.entries(plugin.methods).forEach(([methodName, method]) => {
      if ((this as any)[methodName]) {
        throw new Error(`Method ${methodName} already exists on SolanaAgentKit`);
      }
      (this as any)[methodName] = method.bind(plugin);
    });

    this.plugins.set(plugin.name, plugin);
    return this;
  }
}
