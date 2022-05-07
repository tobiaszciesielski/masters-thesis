import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body.user;

  if (!password || !email) {
    return res.status(400).send('Bad request');
  }

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return res.status(400).send('User not exists');
  }

  return res.status(200).send({ user });
};

export const register = async (req: Request, res: Response) => {
  const { password, email, username } = req.body.user;

  if (!password || !email || !username) {
    return res.status(400).send('bad request');
  }

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

  if (users.length) {
    return res.status(400).send('User already exists');
  }

  const user = await prisma.user.create({ data: { email, username } });

  return res.status(200).send({ user });
};
