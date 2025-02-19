import { SolanaAgentKit, createVercelAITools } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import dotenv from "dotenv";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import bs58 from "bs58";

dotenv.config();

async function main() {
  const keyPair = Keypair.fromSecretKey(
    bs58.decode(process.env.SOLANA_PRIVATE_KEY as string),
  );

  // Initialize agent with your test wallet
  const agent = new SolanaAgentKit(
    {
      publicKey: keyPair.publicKey,
      sendTransaction: async (tx) => {
        const connection = new Connection(process.env.RPC_URL as string);
        if (tx instanceof VersionedTransaction) tx.sign([keyPair]);
        else tx.sign(keyPair);
        return await connection.sendRawTransaction(tx.serialize());
      },
      signTransaction: async (tx) => {
        if (tx instanceof VersionedTransaction) tx.sign([keyPair]);
        else tx.sign(keyPair);
        return tx;
      },
      signAllTransactions: async (txs) => {
        txs.forEach((tx) => {
          if (tx instanceof VersionedTransaction) tx.sign([keyPair]);
          else tx.sign(keyPair);
        });
        return txs;
      },
    },
    process.env.RPC_URL!,
    {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      signOnly: true,
    },
  )
    // Load all plugins
    .use(TokenPlugin)
    .use(NFTPlugin);

  console.log("Available methods on agent:", Object.keys(agent));

  const tools = createVercelAITools(agent, TokenPlugin.actions);
  console.log(tools);

  // Test a method
  console.log("Testing Token Plugin...");
  const tokenData = await agent.methods.getAsset(
    agent,
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  );
  console.log("USDC Token Data:", tokenData);

  console.log("Testing NFT Plugin...");
  // Add your NFT plugin test here

  console.log("Testing DeFi Plugin...");
  // Add your DeFi plugin test here

  console.log("Testing Misc Plugin...");
  // Add your misc plugin test here

  console.log("Testing Blinks Plugin...");
  // Add your blinks plugin test here
}

main()
  .then(() => console.log("All tests completed successfully!"))
  .catch((error) => {
    console.error("Error during tests:", error);
    process.exit(1);
  });
