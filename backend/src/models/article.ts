export interface ArticlePayload {
  article?: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export interface ArticlesQuery {
  offset?: string;
  limit?: string;
  tag?: string;
  favorited?: string;
  author?: string;
}
