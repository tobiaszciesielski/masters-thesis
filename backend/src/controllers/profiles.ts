import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

import { peelProfile } from '../utils/response';

export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) res.status(400).send('Params not provided');

  const profile = await prisma.user.findUnique({ where: { username } });
  if (!profile) res.status(404).send('Profile not provided');

  const reducedProfile = peelProfile(profile!);

  const { id } = res.locals.tokenData;
  if (id) {
    // TODO: Check if I follow this profile
    // const currentUser = await prisma.user.findUnique({ where: { id }, include: {following: {where: } });
    // if (!currentUser) {
    // }

    // console.log(currentUser);
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
