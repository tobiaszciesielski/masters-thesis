import { Profile } from '../models/Profile';
import { User } from '../models/User';
import { makeRequest } from './api';

export const getProfile = async (user: User | null, username: string) => {
  const response = await makeRequest(
    `/profiles/${username}`,
    'GET',
    {},
    user?.token
  );

  return response;
};

export const follow = async (
  user: User | null,
  profile: Profile
): Promise<any> => {
  const response = await makeRequest(
    `/profiles/${profile.username}/follow`,
    'POST',
    {},
    user?.token
  );

  return response;
};

export const unfollow = async (
  user: User | null,
  profile: Profile
): Promise<any> => {
  const response = await makeRequest(
    `/profiles/${profile.username}/follow`,
    'DELETE',
    {},
    user?.token
  );

  return response;
};
