import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { Config, Plugin } from "../types";

/**
 * Defines a type that merges all plugin methods into the `methods` object
 */
type PluginMethods<T> = T extends Plugin ? T["methods"] : {};

/**
 * Main class for interacting with Solana blockchain.
 *
 * @example
 * // Define a plugin
 * const tokenPlugin = {
 *    name: "tokenPlugin",
 *    actions: [],
 *    methods: {
 *      transferToken: (to: string, amount: number) => {
 *        console.log(`Transferring ${amount} to ${to}`);
 *      },
 *    },
 *    initialize: (agent: any) => {},
 * };
 *
 * @example
 * // Create SolanaAgentKit instance
 * const agent = new SolanaAgentKit("<privateKey>", "<rpcUrl>", {});
 *
 * @example
 * // Add plugin
 * const agentWithPlugin = agent.use(tokenPlugin);
 *
 * @example
 * // Use plugin method
 * agentWithPlugin.methods.transferToken("SomePublicKey", 100);
 */
export class SolanaAgentKit<TPlugins = {}> {
	public connection: Connection;
	public wallet: Keypair;
	public wallet_address: PublicKey;
	public config: Config;
	private plugins: Map<string, Plugin> = new Map();

	public methods: TPlugins = {} as TPlugins;

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

		if (typeof configOrKey === "string" || configOrKey === null) {
			this.config = { OPENAI_API_KEY: configOrKey || "" };
		} else {
			this.config = configOrKey;
		}
	}

	/**
	 * Adds a plugin and registers its methods inside `methods`
	 */
	use<P extends Plugin>(
		plugin: P,
	): SolanaAgentKit<TPlugins & PluginMethods<P>> {
		if (this.plugins.has(plugin.name)) {
			throw new Error(`Plugin ${plugin.name} is already registered`);
		}
		plugin.initialize(this as SolanaAgentKit);

		// Register plugin methods inside `methods`
		Object.entries(plugin.methods).forEach(([methodName, method]) => {
			if ((this.methods as any)[methodName]) {
				throw new Error(`Method ${methodName} already exists in methods`);
			}
			(this.methods as any)[methodName] = method.bind(plugin);
		});

		this.plugins.set(plugin.name, plugin);
		return this as SolanaAgentKit<TPlugins & PluginMethods<P>>;
	}
}
