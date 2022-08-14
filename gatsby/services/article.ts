import { Article } from '../models/Article';
import { User } from '../models/User';
import { makeRequest } from './api';

export const createArticle = async (user: User | null, values: Object) => {
  const response = makeRequest(
    '/articles',
    'POST',
    { article: values },
    user?.token
  );

  return response;
};

export const updateArticle = async (
  user: User | null,
  slug: string,
  values: Object
) => {
  const response = await makeRequest(
    `/articles/${slug}`,
    'PUT',
    { article: values },
    user?.token
  );

  return response;
};

export const addToFavorites = async (
  user: User | null,
  article: Article
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
  user: User | null,
  article: Article
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${article.slug}/favorite`,
    'DELETE',
    {},
    user?.token
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
  user: User | null,
  slug: string,
  commentId: number
): Promise<any> => {
  const response = await makeRequest(
    `/articles/${slug}/comments/${commentId}`,
    'DELETE',
    {},
    user?.token
  );

  return response;
};
