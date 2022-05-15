import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';

import { readTokenData } from '../utils/auth';

export const addComment = async (req: Request, res: Response) => {
  const tokenData = readTokenData(res);
  if (!tokenData) return res.sendStatus(403);

  const { slug } = req.params;

  const payload = req.body.comment;
  if (!payload || !payload.body || !slug) return res.sendStatus(400);

  const article = await prisma.article.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!article) return res.status(404).send('Article not found');

  const { articleId, authorId, author, ...comment } =
    await prisma.comment.create({
      data: {
        body: payload.body,
        author: { connect: { id: tokenData.userId } },
        article: { connect: { id: article.id } },
      },
      include: {
        author: {
          select: { username: true, bio: true, image: true, followedBy: true },
        },
      },
    });

  const { followedBy, ...reducedAuthor } = author;

  res.status(200).send({
    comment: {
      ...comment,
      author: {
        ...reducedAuthor,
        following: followedBy.some(({ id }) => id === tokenData.userId),
      },
    },
  });
};
