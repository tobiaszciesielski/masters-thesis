import { NextApiHandler } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../services/session';

const handler: NextApiHandler = async (req, res) => {
  req.session.destroy();
  res.statusCode = 200;
  res.end();
};

export default withIronSessionApiRoute(handler, sessionOptions);
