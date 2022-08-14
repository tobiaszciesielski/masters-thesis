import { makeRequest } from './api';

export const getUserFeed = async (
  token: string | undefined,
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
    token
  );

  return articlesResponse;
};

export const getGlobalFeed = async (
  token: string | undefined
): Promise<Response> => {
  const articlesResponse = await makeRequest(
    '/articles',
    'GET',
    {
      limit: 20,
      offset: 0,
    },
    token
  );

  return articlesResponse;
};

export const getArticlesByAuthor = async (
  token: string | undefined,
  username: string
) => {
  const articlesResponse = await makeRequest(
    `/articles?author=${username}`,
    'GET',
    {},
    token
  );

  return articlesResponse;
};

export const getFeedByTag = async (
  token: string | undefined,
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
    token
  );

  return articlesResponse;
};
