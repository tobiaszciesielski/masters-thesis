import { redirect } from '@remix-run/node';
import type { User } from '~/models/User';
import { getUserWithToken } from '~/services/auth';
import { commitSession, getSession } from '~/session';

const AUTH_TOKEN_KEY = 'auth_token';

export async function getUser(request: Request): Promise<User | null> {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get(AUTH_TOKEN_KEY) as string;

  const user = await getUserWithToken(token);
  return user;
}

export async function requireUserSession(
  request: Request
): Promise<User | null> {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get(AUTH_TOKEN_KEY) as string;

  if (!session.has(AUTH_TOKEN_KEY)) {
    throw redirect('/login');
  }

  return getUserWithToken(token);
}

export async function createSessionCookie(
  request: Request,
  token: string
): Promise<string> {
  const session = await getSession(request.headers.get('Cookie'));
  session.set(AUTH_TOKEN_KEY, token);

  return await commitSession(session);
}
