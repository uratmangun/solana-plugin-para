# solana-plugin-para-web

This plugin provides web-specific tools and actions for interacting with Para services in the Solana Agent Kit. It enables wallet management, authentication, and other Para-specific functionalities in web applications.

## Installation

```bash
pnpm add solana-plugin-para-web
# or
bun add solana-plugin-para-web
```

## Setup

First, initialize the Solana Agent Kit with the Para Web Plugin:

```typescript
import { SolanaAgentKit, type BaseWallet } from "solana-agent-kit";
import ParaWebPlugin from "solana-plugin-para-web";

// Create the Solana Agent
const solanaAgent = new SolanaAgentKit(
  {} as BaseWallet, // Temporary wallet, will be replaced
  process.env.NEXT_PUBLIC_RPC_URL as string,
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string || "",
  }
);

// Add Para Web Plugin
export const solanaAgentWithPara = solanaAgent.use(ParaWebPlugin);
export const para = solanaAgentWithPara.methods.getParaInstance();
```

## Available Methods

### getParaInstance()
Returns the Para instance that can be used to interact with Para services directly.

```typescript
const para = solanaAgentWithPara.methods.getParaInstance();
```

### getAllWallets()
Retrieves all wallets associated with the currently logged-in Para account. Requires user to be logged in.

```typescript
try {
  const { wallets } = await solanaAgentWithPara.methods.getAllWallets();
  console.log('Your Para wallets:', wallets);
  
  // Example of processing wallets
  wallets.forEach(wallet => {
    console.log('Wallet address:', wallet.publicKey.toString());
  });
} catch (error) {
  if (error.message.includes("Please login to Para")) {
    // Handle not logged in state
    console.error('Please log in to Para first');
  } else {
    console.error('Failed to get wallets:', error.message);
  }
}
```

### claimParaPregenWallet()
Claims a pre-generated Para wallet using the user's email address. This method requires the user to be logged in to Para.

```typescript
try {
  const result = await solanaAgentWithPara.methods.claimParaPregenWallet();
  console.log('Wallet claimed successfully!');
  console.log('Associated email:', result.email);
} catch (error) {
  if (error.message.includes("Please login to Para")) {
    console.error('Authentication required: Please log in to Para');
  } else {
    console.error('Failed to claim wallet:', error.message);
  }
}
```

## Authentication

Most methods in this plugin require the user to be authenticated with Para. You can check the authentication status using:

```typescript
const checkAuth = async () => {
  const isLoggedIn = await para.isFullyLoggedIn();
  if (!isLoggedIn) {
    console.log('User needs to log in');
    // Implement your login flow here
  } else {
    console.log('User is authenticated');
  }
};
```

## Error Handling

The plugin methods may throw errors in the following cases:
- User is not authenticated with Para
- Network connectivity issues
- Invalid parameters or operation failures
- Rate limiting or API restrictions

Always wrap method calls in try-catch blocks and handle errors appropriately in your application.

## TypeScript Support

This plugin is written in TypeScript and provides full type definitions for all methods and return values.

## Contributing

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on our GitHub repository.

## License

[License Type] - See LICENSE file for details
