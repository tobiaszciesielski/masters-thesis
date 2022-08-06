import { User } from '../models/User';
import { makeRequest } from './api';

export const getUserFeed = async (user: User | null): Promise<any> => {
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
