import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { TokenData } from '../models/auth';
import { hashPassword, readTokenData } from '../utils/auth';
import { USER_SELECT } from '../utils/select';

export const getCurrentUser = async (req: Request, res: Response) => {
  const tokenData = readTokenData(res);

  const currentUser = await prisma.user.findUnique({
    where: { id: tokenData?.id },
    select: USER_SELECT,
  });
  if (!currentUser) res.send(404).send('User not found');

  res.status(200).send({ user: currentUser });
};

export const updateUser = async (req: Request, res: Response) => {
  // available fields to change
  let { email, username, password, image, bio } = req.body.user;

  if (password) {
    password = await hashPassword(password);
  }

  const tokenData = readTokenData(res);

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          email,
        },
        { username },
      ],
      NOT: [{ id: tokenData?.id }],
    },
  });

  if (users.length)
    return res.status(400).send('Email or username must be unique');

  const user = await prisma.user.update({
    where: { id: tokenData?.id },
    data: { email, username, password, image, bio },
    select: USER_SELECT,
  });
  if (!user) return res.status(400).send("Couldn't update user");

  return res.status(200).send({ user });
};
