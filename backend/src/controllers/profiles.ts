import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { TokenData } from '../models/auth';
import { PROFILE_SELECT } from '../utils/select';

export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) res.status(400).send('Params not provided');

  const profile = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });
  if (!profile) res.status(404).send('Profile not found');

  const { id: profileId, ...reducedProfile } = profile!;
  const { id: userId } = res.locals.tokenData;

  let following = false;
  if (userId) {
    const userFollowingProfle = await prisma.user.findMany({
      where: {
        AND: [
          { id: profileId },
          {
            followedBy: { some: { id: userId } },
          },
        ],
      },
    });
    following = !!userFollowingProfle?.length;
  }

  res.status(200).send({ following, ...reducedProfile });
};

export const follow = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) res.status(400).send('Params not provided');

  const { id: userId } = res.locals.tokenData as TokenData;

  const userToFollow = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });

  if (!userToFollow) return res.status(404).send('User not found');

  await prisma.user.update({
    where: { id: userId },
    data: {
      following: {
        connect: { id: userToFollow?.id },
      },
    },
  });

  const { id, ...profile } = userToFollow;

  return res.status(200).send({ following: true, ...profile });
};
