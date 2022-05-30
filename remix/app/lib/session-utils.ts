import { redirect } from '@remix-run/node';
import type { User } from '~/models/User';
import { makeRequest } from '~/services/api';
import { commitSession, getSession } from '~/session';

const AUTH_TOKEN_KEY = 'auth_token';

export async function requireUserSession(
  request: Request
): Promise<User | null> {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get(AUTH_TOKEN_KEY);

  if (!session.has(AUTH_TOKEN_KEY)) {
    throw redirect('/login');
  }

  const response = await makeRequest('/user', 'POST', {}, token);
  if (response.status !== 200) {
    return null;
  }

  const { user } = await response.json();

  return user;
}

export async function createSessionCookie(
  request: Request,
  token: string
): Promise<string> {
  const session = await getSession(request.headers.get('Cookie'));
  session.set(AUTH_TOKEN_KEY, token);

  return await commitSession(session);
}
