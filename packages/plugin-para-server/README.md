# @getpara/plugin-para-server

This plugin provides server-side tools and actions for managing Para wallets and services in the Solana Agent Kit. It enables pre-generated wallet management and other Para-specific functionalities for server applications.

## Installation

```bash
pnpm add @getpara/plugin-para-server
# or
bun add @getpara/plugin-para-server
```

## Setup

First, initialize the Solana Agent Kit with the Para Server Plugin:

```typescript
import { SolanaAgentKit, type BaseWallet } from "solana-agent-kit";
import ParaServerPlugin from "@getpara/plugin-para-server";
import TokenPlugin from "@solana-agent-kit/plugin-token";

// Create the Solana Agent
const solanaAgent = new SolanaAgentKit(
  {} as BaseWallet, // Temporary wallet, will be replaced
  process.env.NEXT_PUBLIC_RPC_URL as string,
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string || "",
  }
);

// Add Para Server Plugin and Token Plugin
export const solanaAgentWithPara = solanaAgent.use(ParaServerPlugin).use(TokenPlugin);
```

## Available Methods

### getParaInstance()
Returns the Para instance that can be used to interact with Para services directly.

```typescript
const para = solanaAgentWithPara.methods.getParaInstance();
```

### createParaPregenWallet(email: string)
Creates a pre-generated Para wallet for a specific email address.

```typescript
try {
  const result = await solanaAgentWithPara.methods.createParaPregenWallet("user@example.com");
  console.log('Wallet created successfully!');
  console.log({
    address: result.address,
    email: result.email,
    walletId: result.walletId
  });
} catch (error) {
  if (error.message.includes("already exists")) {
    console.error('A wallet already exists for this email');
  } else {
    console.error('Failed to create wallet:', error.message);
  }
}
```

### getParaPregenWallets(email: string)
Retrieves all pre-generated wallets associated with a specific email address.

```typescript
try {
  const { listAllPregenWallets } = await solanaAgentWithPara.methods.getParaPregenWallets("user@example.com");
  console.log('Pre-generated wallets:', listAllPregenWallets);
  
  // Example of processing wallets
  listAllPregenWallets.forEach(wallet => {
    console.log('Wallet ID:', wallet.id);
    console.log('Wallet Address:', wallet.address);
  });
} catch (error) {
  console.error('Failed to get pre-generated wallets:', error.message);
}
```

### updateParaPregenWallet(email: string, walletId: string)
Updates the email identifier for an existing pre-generated wallet.

```typescript
try {
  const result = await solanaAgentWithPara.methods.updateParaPregenWallet(
    "newemail@example.com",
    "wallet_id_here"
  );
  console.log('Wallet updated successfully!');
  console.log({
    email: result.email,
    walletId: result.walletId
  });
} catch (error) {
  if (error.message.includes("already exists")) {
    console.error('A wallet already exists for this email');
  } else {
    console.error('Failed to update wallet:', error.message);
  }
}
```

## Error Handling

The plugin methods may throw errors in the following cases:
- Invalid email format
- Duplicate wallet creation attempts
- Invalid wallet IDs
- Network connectivity issues
- Para API errors

Always wrap method calls in try-catch blocks and handle errors appropriately in your application.

## TypeScript Support

This plugin is written in TypeScript and provides full type definitions for all methods and return values. Import the necessary types from the package:

```typescript
import { WalletType } from "@getpara/server-sdk";
```

## Environment Variables

Make sure to set up the following environment variables:
- `NEXT_PUBLIC_RPC_URL`: Your Solana RPC URL
- `OPENAI_API_KEY`: Your OpenAI API key (if using OpenAI features)
- Any additional Para-specific environment variables required for your use case

## Contributing

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on our GitHub repository.

## License

[License Type] - See LICENSE file for details
