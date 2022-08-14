import type { Profile } from '~/models/Profile';

import { makeRequest } from './api';

export const getProfile = async (
  token: string | undefined,
  username: string
) => {
  const response = await makeRequest(`/profiles/${username}`, 'GET', {}, token);
  return response;
};

export const follow = async (
  token: string | undefined,
  profile: Profile
): Promise<any> => {
  const response = await makeRequest(
    `/profiles/${profile.username}/follow`,
    'POST',
    {},
    token
  );

  return response;
};

export const unfollow = async (
  token: string | undefined,
  profile: Profile
): Promise<any> => {
  const response = await makeRequest(
    `/profiles/${profile.username}/follow`,
    'DELETE',
    {},
    token
  );

  return response;
};
