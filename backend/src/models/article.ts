export interface ArticlePayload {
  article?: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}