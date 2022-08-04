import type { Article } from '~/models/Article';
import type { User } from '~/models/User';
import { makeRequest } from './api';

export const addToFavorites = async (
  article: Article,
  user: User | null
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${article.slug}/favorite`,
    'POST',
    {},
    user?.token
  );

  return response;
};

export const removeFromFavorites = async (
  article: Article,
  user: User | null
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${article.slug}/favorite`,
    'DELETE',
    {},
    user?.token
  );

  return response;
};
