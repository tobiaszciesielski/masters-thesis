import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { createSessionCookie, destroySessionCookie } from '../../lib/session';
import { User } from '../../models/User';
import { makeRequest } from '../../services/api';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  destroySessionCookie(res);
  res.status(200);
  res.end();
}
