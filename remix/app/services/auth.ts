import type { User } from '~/models/User';
import { makeRequest } from './api';

export const getUserWithToken = async (token: string): Promise<User | null> => {
  const response = await makeRequest('/user', 'GET', {}, token);
  if (response.status !== 200) {
    return null;
  }

  const { user } = await response.json();

  return user;
};
