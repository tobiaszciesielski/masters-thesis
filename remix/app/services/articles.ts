import type { User } from '~/models/User';
import { makeRequest } from './api';

export const getUserFeed = async (
  user: User | null,
  author?: string
): Promise<Response> => {
  const articlesResponse = await makeRequest(
    '/articles/feed',
    'GET',
    {
      limit: 20,
      offset: 0,
      author,
    },
    user?.token
  );

  return articlesResponse;
};

export const getGlobalFeed = async (user: User | null): Promise<Response> => {
  const articlesResponse = await makeRequest(
    '/articles',
    'GET',
    {
      limit: 20,
      offset: 0,
    },
    user?.token
  );

  return articlesResponse;
};

export const getArticlesByAuthor = async (
  user: User | null,
  username: string
) => {
  const articlesResponse = await makeRequest(
    `/articles?author=${username}`,
    'GET',
    {},
    user?.token
  );

  return articlesResponse;
};

export const getFeedByTag = async (
  user: User | null,
  tag: string
): Promise<Response> => {
  const articlesResponse = await makeRequest(
    '/articles',
    'GET',
    {
      limit: 20,
      offset: 0,
      tag: tag,
    },
    user?.token
  );

  return articlesResponse;
};
