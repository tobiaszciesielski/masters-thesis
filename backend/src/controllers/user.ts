import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { TokenData } from '../models/auth';
import { peelUser } from '../utils/response';

export const getCurrentUser = async (req: Request, res: Response) => {
  const { id } = res.locals.tokenData as TokenData;

  const currentUser = await prisma.user.findUnique({ where: { id } });
  if (!currentUser) res.send(404).send('User not found');

  const reducedUser = peelUser(currentUser!);

  res.status(200).send({ user: reducedUser });
};

export const updateUser = async (req: Request, res: Response) => {};
