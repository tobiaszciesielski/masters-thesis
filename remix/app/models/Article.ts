import type { User } from './User';

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  tagList: string[];
  favoritesCount: number;
  favorited: boolean;
}

export interface ArticlesResponse {
  articles: Article[];
}
