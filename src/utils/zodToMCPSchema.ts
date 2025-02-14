import { z } from "zod";

// Define the raw shape type that MCP tools expect
export type MCPSchemaShape = {
  [key: string]: z.ZodType<any>;
};

// Type guards for Zod schema types
function isZodOptional(schema: z.ZodTypeAny): schema is z.ZodOptional<any> {
  return schema instanceof z.ZodOptional;
}

function isZodObject(schema: z.ZodTypeAny): schema is z.ZodObject<any> {
  return schema instanceof z.ZodObject;
}

/**
 * Converts a Zod object schema to a flat shape for MCP tools
 * @param schema The Zod schema to convert
 * @returns A flattened schema shape compatible with MCP tools
 * @throws Error if the schema is not an object type
 */
export function zodToMCPShape(schema: z.ZodTypeAny): MCPSchemaShape {
  if (!isZodObject(schema)) {
    throw new Error("MCP tools require an object schema at the top level");
  }

  const shape = schema.shape;
  const result: MCPSchemaShape = {};

  for (const [key, value] of Object.entries(shape)) {
    // If it's an optional field, get the underlying type
    result[key] = isZodOptional(value as any) ? (value as any).unwrap() : value;
  }

  return result;
}

// Example usage:
/*
const exampleSchema = z.object({
  name: z.string(),
  age: z.number().optional(),
  isActive: z.boolean()
});

const mcpShape = zodToMCPShape(exampleSchema);
*/