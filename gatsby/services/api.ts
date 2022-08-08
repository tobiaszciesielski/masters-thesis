const API_BASE = 'http://localhost:4000/api';
const SSR_SERVER_API_BASE = '/api';
import fetch from 'node-fetch';

export default API_BASE;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const makeRequest = async (
  url: string,
  method: Method,
  body: Object,
  token?: string,
  toSSRServer: boolean = false
): Promise<Response> => {
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const params =
    method === 'GET' && Object.keys(body).length
      ? // @ts-ignore
        '?' + new URLSearchParams(body)
      : '';

  const api = toSSRServer ? SSR_SERVER_API_BASE : API_BASE;

  // @ts-ignore
  return fetch(`${api}${url}${params}`, {
    method: method,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
    headers,
  });
};
