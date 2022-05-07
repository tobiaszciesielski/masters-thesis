import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenData } from '../models/auth';
import bcrypt from 'bcrypt';
import { IncomingHttpHeaders } from 'http';
import { TOKEN_SECRET } from './config';

export const verifyToken = async (
  headers: IncomingHttpHeaders
): Promise<TokenData | undefined> => {
  const authHeader = headers.authorization;

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return undefined;
  }

  return jwt.verify(token, TOKEN_SECRET) as Promise<TokenData>;
};

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = await verifyToken(req.headers);

  res.locals.tokenData = tokenData;
  next();
};

export const requiredAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokenData = await verifyToken(req.headers);
  if (!tokenData) return res.status(403).send('Forbidden');

  res.locals.tokenData = tokenData;
  next();
};

export const generateToken = (tokenData: TokenData) => {
  return jwt.sign(tokenData, TOKEN_SECRET);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
