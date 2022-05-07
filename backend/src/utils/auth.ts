import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send('Token not provided');

  const tokenSecret = process.env.TOKEN_SECRET as string;

  jwt.verify(token, tokenSecret, (err) => {
    if (err) return res.status(403).send('Invalid token');

    next();
  });
};

export const generateToken = (username: string) => {
  const tokenSecret = process.env.TOKEN_SECRET as string;

  return jwt.sign(username, tokenSecret);
};
