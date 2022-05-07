import { Request, Response } from 'express';
import { generateToken } from '../utils/auth';
import bcrypt from 'bcrypt';
import { prisma } from '../../prisma/client';
import { peelUser } from '../utils/response';

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body.user;
  if (!password || !email) return res.status(400).send('Bad request');

  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) return res.status(400).send('User not exists');

  const passwordCorrect = await bcrypt.compare(password, user.password!);
  if (!passwordCorrect) return res.status(401).send('Invalid credentials');

  const token = generateToken({ username: user.username, id: user.id });
  const reducedUser = peelUser(user);

  return res.status(200).send({ user: { ...reducedUser, token } });
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

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, username, password: hash },
  });

  return res.status(200).send({ user });
};
