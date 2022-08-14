import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby';
import { getApiRouteUser, getUser } from '../../lib/session';
import { User } from '../../models/User';
import { makeRequest } from '../../services/api';
import { updateUser } from '../../services/user';

interface UserData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const authUser = await getApiRouteUser(req);
  if (!authUser) {
    return {
      status: 301,
      headers: {
        Location: '/login',
      },
    };
  }
  let formData = await req.body;

  const response = await updateUser(authUser.token, formData);
  if (response.status !== 200) {
    res.json({ error: 'Please try again' });
    res.end();
    return;
  }

  const { user } = await response.json();
  res.status(200);
  res.json(user);
  res.end();
}
