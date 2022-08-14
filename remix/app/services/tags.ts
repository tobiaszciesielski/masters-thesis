import { makeRequest } from './api';

export const getAllTags = async (): Promise<Response> => {
  const response = await makeRequest('/tags', 'GET', {});

  return response;
};
