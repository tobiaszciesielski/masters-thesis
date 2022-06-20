const API_BASE = 'http://localhost:4000/api';

export default API_BASE;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const makeRequest = async (
  url: string,
  method: Method,
  body: Object,
  token?: string
): Promise<Response> => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  return fetch(`${API_BASE}${url}`, {
    method: method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
    headers,
  });
};
