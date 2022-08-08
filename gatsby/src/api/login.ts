import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { User } from '../../models/User';
import { makeRequest } from '../../services/api';
import { createSessionCookie, getUser } from '../../lib/session';


interface ContactBody {
  message: string;
}

export default async function handler(
  req: GatsbyFunctionRequest<ContactBody>,
  res: GatsbyFunctionResponse
) {
  let formData = await req.body;

  const response = await makeRequest('/users/login', 'POST', {
    user: formData,
  });

  if (response.status !== 200) {
    res.json({ error: 'Please try again' });
    res.end();

    return;
  }

  const { user }: { user: User } = await response.json();
  getUser(req);
  createSessionCookie(res, user.token);

  res.status(200);
  res.json({ user });
  res.end();
}
