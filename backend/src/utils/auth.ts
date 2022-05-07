import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenData } from '../models/auth';
import bcrypt from 'bcrypt';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Token not provided');

  const tokenSecret = process.env.TOKEN_SECRET as string;

  jwt.verify(token, tokenSecret, (err, tokenData) => {
    if (err) return res.status(403).send('Invalid token');

    res.locals.tokenData = tokenData;

    next();
  });
};

export const generateToken = (tokenData: TokenData) => {
  const tokenSecret = process.env.TOKEN_SECRET as string;

  return jwt.sign(tokenData, tokenSecret);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
