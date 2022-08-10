import cookie from 'cookie';
import { getUserWithToken } from '../services/auth';
import { User } from '../models/User';
import { GatsbyFunctionResponse, GetServerDataProps } from 'gatsby';

const AUTH_TOKEN_KEY = 'auth_token';

export async function getUser(
  request: GetServerDataProps
): Promise<User | null> {
  const headerCookie = request.headers.get('cookie') as string;
  const parsedCookie = cookie.parse(headerCookie);
  const token = parsedCookie[AUTH_TOKEN_KEY];

  const user = await getUserWithToken(token);

  return user;
}

export function createSessionCookie(
  res: GatsbyFunctionResponse,
  token: string
): void {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_TOKEN_KEY, token, { path: '/' })
  );
}
