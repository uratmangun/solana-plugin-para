import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import type { Action } from "../types/action";
import { SolanaAgentKit } from "../agent";
import { zodToMCPShape } from "../utils/zodToMCPSchema";

/**
 * Creates an MCP server from a set of actions
 */
export function createMcpServer(
  actions: Record<string, Action>,
  solanaAgentKit: SolanaAgentKit,
  options: {
    name: string;
    version: string;
  }
) {
  // Create MCP server instance
  const server = new McpServer({
    name: options.name,
    version: options.version,
  });

  // Convert each action to an MCP tool
  for (const [key, action] of Object.entries(actions)) {
    server.tool(
      action.name,
      action.description,
      zodToMCPShape(action.schema),
      async (params) => {
        try {
          // Execute the action handler
          const result = await action.handler(solanaAgentKit, params);
          
          // Format the result as MCP tool response
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ]
          };
        } catch (error) {
          // Handle errors in MCP format
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: error instanceof Error ? error.message : "Unknown error occurred"
              }
            ]
          };
        }
      }
    );

    // Add examples as prompts if they exist
    if (action.examples && action.examples.length > 0) {
      server.prompt(
        `${action.name}-examples`,
        {
          showIndex: z.string().optional().describe("Example index to show (number)")
        },
        (args) => {
          const showIndex = args.showIndex ? parseInt(args.showIndex) : undefined;
          const examples = action.examples.flat();
          const selectedExamples = typeof showIndex === 'number' 
            ? [examples[showIndex]]
            : examples;

          const exampleText = selectedExamples
            .map((ex, idx) => `
Example ${idx + 1}:
Input: ${JSON.stringify(ex.input, null, 2)}
Output: ${JSON.stringify(ex.output, null, 2)}
Explanation: ${ex.explanation}
            `)
            .join('\n');

          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Examples for ${action.name}:\n${exampleText}`
                }
              }
            ]
          };
        }
      );
    }
  }

  return server;
}

/**
 * Helper to start the MCP server with stdio transport
 */
export async function startMcpServer(
  actions: Record<string, Action>,
  solanaAgentKit: SolanaAgentKit,
  options: {
    name: string;
    version: string;
  }
) {
  const server = createMcpServer(actions, solanaAgentKit, options);
  console.log("MCP server created");
  const transport = new StdioServerTransport();
  console.log("Stdio transport created");
  await server.connect(transport);
  console.log("MCP server started");
  return server;
}

/**
 * Example usage:
 *
 * import { ACTIONS } from "./actions";
 * import { startMcpServer } from "./mcpWrapper";
 *
 * const solanaAgentKit = new SolanaAgentKit();
 * 
 * startMcpServer(ACTIONS, solanaAgentKit, {
 *   name: "solana-actions",
 *   version: "1.0.0"
 * });
 */