import type { Article } from '~/models/Article';

import { makeRequest } from './api';

export const addToFavorites = async (
  token: string | undefined,
  article: Article
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${article.slug}/favorite`,
    'POST',
    {},
    token
  );

  return response;
};

export const removeFromFavorites = async (
  token: string | undefined,
  article: Article
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${article.slug}/favorite`,
    'DELETE',
    {},
    token
  );

  return response;
};
