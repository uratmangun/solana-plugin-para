# Solana Agent Kit Para Plugin

This is a Solana Agent Kit v2 plugin that can be used in both server and web environments. Below are the instructions for setting up and using the plugin.

# How to install dependencies

```bash
pnpm add solana-plugin-para-web solana-plugin-para-server
```

## Initial Setup

First, initialize the Solana Agent Kit v2:

```typescript
// solana.ts
import { SolanaAgentKit, type BaseWallet } from "solana-agent-kit";

// Create the Solana Agent
export const solanaAgent = new SolanaAgentKit(
  {} as BaseWallet, // Temporary wallet, will be replaced
  process.env.NEXT_PUBLIC_RPC_URL as string,
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string || "",
  }
);
```

## Usage

### Web Version

```typescript
import ParaWebPlugin from "solana-plugin-para-web";
import { solanaAgent } from "./solana";

export const solanaAgentWithPara = solanaAgent.use(ParaWebPlugin);
export const para = solanaAgentWithPara.methods.getParaInstance();
```

### Server Version

```typescript
import { solanaAgent } from "./solana";
import ParaServerPlugin from "solana-plugin-para-server";
import TokenPlugin from "@solana-agent-kit/plugin-token";

export const solanaAgentWithPara = solanaAgent.use(ParaServerPlugin).use(TokenPlugin);
```

## Publishing to npm

After versioning your packages (e.g. `pnpm run version-packages`), publish both plugins with:

```fish
pnpm run publish-para-plugins
```

This command will build and publish `solana-plugin-para-web` and `solana-plugin-para-server` to npm.

