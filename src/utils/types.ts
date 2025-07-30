export interface books_search {
    docs: search_doc
}

interface search_doc {
    key: string,
    title: string,
    author_key?: string[]
}