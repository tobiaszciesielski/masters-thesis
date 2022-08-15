import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { readTokenData } from '../utils/auth';
import { PROFILE_SELECT } from '../utils/select';

export const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  if (!username) return res.sendStatus(400);

  const profile = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });
  if (!profile) return res.status(404).send('Profile not found');

  const { id: profileId, ...reducedProfile } = profile!;

  let following = false;

  const tokenData = readTokenData(res);
  if (tokenData?.userId) {
    const userFollowingProfle = await prisma.user.findMany({
      where: {
        AND: [
          { id: profileId },
          {
            followedBy: { some: { id: tokenData.userId } },
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
  if (!username) return res.sendStatus(400);

  const userToFollow = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });
  if (!userToFollow) return res.status(404).send('User not found');

  const tokenData = readTokenData(res);
  if (!tokenData) return res.sendStatus(403);

  await prisma.user.update({
    where: { id: tokenData?.userId },
    data: {
      following: {
        connect: { id: userToFollow.id },
      },
    },
  });

  const { id, ...profile } = userToFollow;

  return res.status(200).send({ following: true, ...profile });
};

export const unfollow = async (req: Request, res: Response) => {
  const { username } = req.params;

  if (!username) return res.sendStatus(400);

  const userToUnfollow = await prisma.user.findUnique({
    where: { username },
    select: PROFILE_SELECT,
  });
  if (!userToUnfollow) return res.status(404).send('User not found');

  const tokenData = readTokenData(res);
  if (!tokenData) return res.sendStatus(403);

  await prisma.user.update({
    where: { id: tokenData.userId },
    data: { following: { disconnect: { id: userToUnfollow.id } } },
  });

  const { id, ...profile } = userToUnfollow;

  return res.status(200).send({ following: false, ...profile });
};
