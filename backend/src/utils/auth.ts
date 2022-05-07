import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const tokenSecret = process.env.TOKEN_SECRET as string;

  jwt.verify(token, tokenSecret, (err) => {
    if (err) return res.sendStatus(403);

    next();
  });
};

export const generateToken = (username: string) => {
  const tokenSecret = process.env.TOKEN_SECRET as string;

  return jwt.sign(username, tokenSecret);
};
