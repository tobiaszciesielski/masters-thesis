import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { createSessionCookie } from '../../lib/session';
import { User } from '../../models/User';
import { makeRequest } from '../../services/api';

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  let formData = await req.body;

  const response = await makeRequest('/users', 'POST', {
    user: formData,
  });

  if (response.status !== 200) {
    res.status(400);
    res.json({ error: 'Please try again' });
    res.end();

    return;
  }

  const { user }: { user: User } = await response.json();

  createSessionCookie(res, user.token);

  res.status(200);
  res.json({ user });
  res.end();
}
