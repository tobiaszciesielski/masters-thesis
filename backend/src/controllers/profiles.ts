import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { PROFILE_SELECT } from '../utils/select';


export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) res.status(400).send('Params not provided');

  const profile = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });
  if (!profile) res.status(404).send('Profile not provided');

  const { id } = res.locals.tokenData;
  if (id) {
    // TODO: Check if I follow this profile
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (!currentUser) {
    }
    console.log(currentUser);
  }

  res.status(200).send(profile);

  // {
  //   "profile": {
  //     "username": "jake",
  //     "bio": "I work at statefarm",
  //     "image": "https://api.realworld.io/images/smiley-cyrus.jpg",
  //     "following": false
  //   }
  // }
};
