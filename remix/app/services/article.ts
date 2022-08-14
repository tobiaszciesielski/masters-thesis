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

export const addComment = async (
  token: string | undefined,
  slug: string
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${slug}/comments`,
    'DELETE',
    {},
    token
  );

  return response;
};

export const deleteComment = async (
  token: string | undefined,
  slug: string,
  commentId: number
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${slug}/comments/${commentId}`,
    'DELETE',
    {},
    token
  );

  return response;
};
