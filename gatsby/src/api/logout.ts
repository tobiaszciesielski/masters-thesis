import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { destroySessionCookie } from '../../lib/session';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  destroySessionCookie(res);
  res.status(200);
  res.end();
}
