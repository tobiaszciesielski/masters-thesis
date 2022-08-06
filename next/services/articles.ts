import { User } from '../models/User';
import { makeRequest } from './api';

export const getUserFeed = async (
  user: User,
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

export const getGlobalFeed = async (
  user: User | undefined
): Promise<Response> => {
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
  user: User | undefined,
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
  user: User | undefined,
  tag: string
): Promise<Response> => {
  const articlesResponse = await makeRequest('/articles', 'GET', {
    limit: 20,
    offset: 0,
    tag: tag,
  });

  return articlesResponse;
};
