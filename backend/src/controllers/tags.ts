// @ts-nocheck

import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

export const getTagList = async (req: Request, res: Response) => {
  const tags = await prisma.tag.findMany({});
  res.send({ tags: tags.map(({ name }) => name) });
};
