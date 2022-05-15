export interface ArticlePayload {
  article?: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export interface ArticlesQuery extends PaginationQuery {
  tag?: string;
  favorited?: string;
  author?: string;
}

export interface PaginationQuery {
  offset?: string;
  limit?: string;
}
