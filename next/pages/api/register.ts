import { User } from '../../models/User';
import { makeRequest } from '../../services/api';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';

interface RegisterData {
  username?: string;
  password?: string;
  email?: string;
}

export default withIronSessionApiRoute(async (req, res) => {
  let formData = (await req.body) as RegisterData;

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

  req.session.user = user;
  await req.session.save();

  res.status(200);
  res.json({ user });
  res.end();
}, sessionOptions);
