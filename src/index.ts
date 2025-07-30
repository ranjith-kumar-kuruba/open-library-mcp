import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerSearch } from "./tools/book-search"

const server = new McpServer({
    name: "open-library-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});

registerSearch(server)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Open library mcp Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});