import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod"
import { URLS } from "../utils/constant";
import { books_search } from "../utils/types"

export function registerSearch(server: McpServer) {
    server.tool(
        "search_book",
        "Search book from open library api",
        {
            input: z.object({
                q: z.string().describe("Enter book name ex: harry potter"),
                limit: z.number().optional().describe("Enter the limit"),
                page: z.number().optional().describe("Enter the page number ")
            })

        },
        async ({ input }) => {
            const { base_url, book_search_url } = URLS

            const params = new URLSearchParams({
                q: input.q,
            })

            if (input.limit !== undefined) {
                const limit = input.limit ?? 5
                params.append("limit", String(limit))
            }

            if (input.page !== undefined) {
                const page = input.page ?? 1
                params.append("page", String(page))
            }

            const url = `${base_url}/${book_search_url}?${params}`
            console.error("url", url)

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });

            if (!response.ok) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to search books: ${response.statusText}`,
                        },
                    ],
                };
            }
            const data = await response.json()
            const bookSearchData: books_search = data.docs[0]
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(bookSearchData),
                    },
                ],
            };
        }
    );
}