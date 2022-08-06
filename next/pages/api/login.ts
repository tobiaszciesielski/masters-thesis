import { User } from '../../models/User';
import { makeRequest } from '../../services/api';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../services/session';

export default withIronSessionApiRoute(async (req, res) => {
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

  req.session.user = user;
  await req.session.save();

  res.json({ user });
  res.end();
}, sessionOptions);
