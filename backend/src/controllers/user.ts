import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { TokenData } from '../models/auth';
import { hashPassword } from '../utils/auth';
import { peelUser } from '../utils/response';

export const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = res.locals.tokenData as TokenData;

  const currentUser = await prisma.user.findUnique({ where: { id } });
  if (!currentUser) res.send(404).send('User not found');

  const reducedUser = peelUser(currentUser!);

  res.status(200).send({ user: reducedUser });
};

export const updateUser = async (req: Request, res: Response) => {
  // available fields to change
  let { email, username, password, image, bio } = req.body.user;

  if (password) {
    password = await hashPassword(password);
  }

  const { id } = res.locals.tokenData;

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          email,
        },
        { username },
      ],
      NOT: [{ id }],
    },
  });

  if (users.length)
    return res.status(400).send('Email or username must be unique');

  const user = await prisma.user.update({
    where: { id },
    data: { email, username, password, image, bio },
  });
  if (!user) return res.status(400).send("Couldn't update user");

  return res.status(200).send({ user });
};
