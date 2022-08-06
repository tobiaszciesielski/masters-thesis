import { NextApiHandler } from 'next';
import { User } from '../../models/User';
import { makeRequest } from '../../services/api';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../services/session';

const handler: NextApiHandler = async (req, res) => {
  req.session.destroy();
  res.status(200);
};

export default withIronSessionApiRoute(handler, sessionOptions);
