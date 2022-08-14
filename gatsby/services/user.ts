import { makeRequest } from './api';

export const updateUser = async (
  token: string | undefined,

  values: Object
): Promise<Response> => {
  const response = await makeRequest('/user', 'PUT', { user: values }, token);

  return response;
};
