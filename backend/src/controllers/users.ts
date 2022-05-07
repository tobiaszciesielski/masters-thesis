import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';
const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body.user;
  if (!password || !email) return res.status(400).send('Bad request');

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) return res.status(400).send('User not exists');

  const token = generateToken(user.username);

  return res.status(200).send({ user: { ...user, token } });
};

export const register = async (req: Request, res: Response) => {
  const { password, email, username } = req.body.user;
  if (!password || !email || !username)
    return res.status(400).send('Bad request');

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          email,
        },
        { username },
      ],
    },
  });
  if (users.length) return res.status(400).send('User already exists');

  const user = await prisma.user.create({ data: { email, username } });

  return res.status(200).send({ user });
};
