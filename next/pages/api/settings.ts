import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import { updateUser } from '../../services/user';

interface UserData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export default withIronSessionApiRoute(async (req, res) => {
  if (!req.session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  let formData = req.body as UserData;
  console.log(formData);

  const response = await updateUser(req.session.user.token, formData);
  if (response.status !== 200) {
    res.json({ error: 'Please try again' });
    res.end();
    return;
  }

  const { user } = await response.json();
  res.status(200);
  res.json(user);
  res.end();
}, sessionOptions);
