import { Request, Response } from 'express';
import { generateToken, hashPassword } from '../utils/auth';
import bcrypt from 'bcrypt';
import { prisma } from '../../prisma/client';
import { DETAILED_USER_SELECT } from '../utils/select';

export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body.user;
  if (!password || !email) return res.status(400).send('Bad request');

  const user = await prisma.user.findUnique({
    where: { email: email },
    select: DETAILED_USER_SELECT,
  });
  if (!user) return res.status(400).send('User not exists');

  const { id, password: userPassword, ...reducedUser } = user;

  const passwordCorrect = await bcrypt.compare(password, userPassword!);
  if (!passwordCorrect) return res.status(401).send('Invalid credentials');

  const token = generateToken({ username: user.username, id });
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

  const hash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username, password: hash },
    select: DETAILED_USER_SELECT,
  });

  const { id, password: userPassword, ...reducedUser } = user;

  const token = generateToken({ username: user.username, id });

  return res.status(200).send({ user: { ...reducedUser, token } });
};
