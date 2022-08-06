import { User } from '../models/User';
import { makeRequest } from './api';

export const getUserFeed = async (user: User): Promise<any> => {
  const articlesResponse = await makeRequest(
    '/articles/feed',
    'GET',
    {
      limit: 20,
      offset: 0,
    },
    user?.token
  );

  return articlesResponse;
};

export const getGlobalFeed = async (user: User | undefined): Promise<any> => {
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
