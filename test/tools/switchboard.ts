import { PublicKey } from "@solana/web3.js";
import { SolanaAgentKit } from "../../src";
import "dotenv/config";

const agent = new SolanaAgentKit(
  process.env.SOLANA_PRIVATE_KEY!,
  process.env.RPC_URL!,
  { OPENAI_API_KEY: process.env.OPENAI_API_KEY! },
);

/****************************** SIMULATE A VALID FEED ******************************** */

(async () => {
  const result = await agent.simulateSwitchboardFeed(
    "6qmsMwtMmeqMgZEhyLv1Pe4wcqT5iKwJAWnmzmnKjf83", // BTC/USDC 
    "http://crossbar.switchboard.xyz");

  console.log("✅ BTC/USDC feed simulation result: ", result);
})();
    
(async () => {
  const result = await agent.simulateSwitchboardFeed(
    "9wcBMATS8bGLQ2UcRuYjsRAD7TPqB1CMhqfueBx78Uj2", // TRUMP/USD
    "http://crossbar.switchboard.xyz");

  console.log("✅ TRUMP/USD feed simulation result: ", result);
})();

/**************************** SIMULATE AN INVALID FEED ******************************* */

(async () => {
  try {
    const result = await agent.simulateSwitchboardFeed(
      "BwBLNEuTnqQVhzgx3557szSgz1PEHEvj2RRoPiFWR8YB", // Nonexistent feed
      "http://crossbar.switchboard.xyz");
    console.error("❌ This call should have failed.")
    process.exit(1);
  } catch (error: any) {
    if (error.message.includes("Did you provide the right mainnet feed hash?")) {
      console.log("✅ nonexistent feed error thrown as expected");
    }
    else {
      console.error(error);
      process.exit(1);
    }
  }

})();