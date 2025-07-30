"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSearch = registerSearch;
const zod_1 = require("zod");
const constant_1 = require("../utils/constant");
function registerSearch(server) {
    server.tool("search_book", "Search book from open library api", {
        input: zod_1.z.object({
            q: zod_1.z.string().describe("Enter book name ex: harry potter"),
            limit: zod_1.z.number().optional().describe("Enter the limit"),
            page: zod_1.z.number().optional().describe("Enter the page number ")
        })
    }, async ({ input }) => {
        const { base_url, book_search_url } = constant_1.URLS;
        const params = new URLSearchParams({
            q: input.q,
        });
        if (input.limit !== undefined) {
            const limit = input.limit ?? 5;
            params.append("limit", String(limit));
        }
        if (input.page !== undefined) {
            const page = input.page ?? 1;
            params.append("page", String(page));
        }
        const url = `${base_url}/${book_search_url}?${params}`;
        console.error("url", url);
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
        const data = await response.json();
        const bookSearchData = data.docs[0];
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(bookSearchData),
                },
            ],
        };
    });
}
