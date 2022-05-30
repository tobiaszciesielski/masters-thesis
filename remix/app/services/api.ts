const API_BASE = 'http://localhost:4000/api';

export default API_BASE;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const makeRequest = (
  url: string,
  method: Method,
  body: Object,
  token?: string
): Promise<Response> =>
  fetch(`${API_BASE}${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
