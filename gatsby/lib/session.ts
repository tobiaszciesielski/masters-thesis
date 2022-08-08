import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import cookie from 'cookie';
import { User } from '../models/User';
import { getUserWithToken } from '../services/auth';

const AUTH_TOKEN_KEY = 'auth_token';

export async function getUser(
  request: GatsbyFunctionRequest
): Promise<User | null> {
  const token = request.cookies[AUTH_TOKEN_KEY];

  const user = await getUserWithToken(token);

  return user;
}

// export async function requireUserSession(
//   request: Request
// ): Promise<User | null> {
//   const session = await getSession(request.headers.get('Cookie'));
//   const token = session.get(AUTH_TOKEN_KEY) as string;

//   if (!session.has(AUTH_TOKEN_KEY)) {
//     throw redirect('/login');
//   }

//   return getUserWithToken(token);
// }

export function createSessionCookie(
  res: GatsbyFunctionResponse,
  token: string
): void {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(AUTH_TOKEN_KEY, token, { path: '/' })
  );
}
