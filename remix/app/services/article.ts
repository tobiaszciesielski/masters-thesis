import type { Article } from '~/models/Article';

import { makeRequest } from './api';

export const createArticle = async (
  token: string | undefined,
  values: Object
) => {
  const response = makeRequest('/articles', 'POST', { article: values }, token);

  return response;
};

export const updateArticle = async (
  token: string | undefined,
  slug: string,
  values: Object
) => {
  const response = await makeRequest(
    `/articles/${slug}`,
    'PUT',
    { article: values },
    token
  );

  return response;
};

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
  slug: string,
  body: Object
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${slug}/comments`,
    'POST',
    { comment: body },
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
