import { SolanaAgentKit, createVercelAITools } from "solana-agent-kit";
import TokenPlugin from "@solana-agent-kit/plugin-token";
import NFTPlugin from "@solana-agent-kit/plugin-nft";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Initialize agent with your test wallet
  const agent = new SolanaAgentKit(
    process.env.WALLET_PRIVATE_KEY!,
    process.env.RPC_URL!,
    {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
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
