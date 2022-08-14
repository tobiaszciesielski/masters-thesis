import cookie from 'cookie';
import { getUserWithToken } from '../services/auth';
import { User } from '../models/User';
import {
  GatsbyFunctionRequest,
  GatsbyFunctionResponse,
  GetServerDataProps,
} from 'gatsby';

const AUTH_TOKEN_KEY = 'gatsby_auth_token';

export const getAuthTokenFromCookies = (
  cookies: string
): string | undefined => {
  if (!cookies) return undefined;
  const parsedCookie = cookie.parse(cookies);
  return parsedCookie[AUTH_TOKEN_KEY];
};

export async function getApiRouteUser(
  request: GatsbyFunctionRequest
): Promise<User | null> {
  const token = request.cookies[AUTH_TOKEN_KEY];
  if (!token) return null;

  const user = await getUserWithToken(token);
  return user;
}

export async function getUser(
  request: GetServerDataProps
): Promise<User | null> {
  const token = getAuthTokenFromCookies(
    request.headers.get('cookie') as string
  );
  if (!token) return null;

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

export function destroySessionCookie(res: GatsbyFunctionResponse): void {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_TOKEN_KEY, 'destroyed', {
      path: '/',
      maxAge: 0,
      expires: new Date(),
    })
  );
}
