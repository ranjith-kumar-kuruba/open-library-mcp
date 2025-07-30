"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSearch = registerSearch;
function registerSearch(server) {
    server.tool("search_books", "Search for books on open library api", {
        input: {}
    });
}
