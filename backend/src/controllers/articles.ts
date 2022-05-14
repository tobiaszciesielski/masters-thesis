import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { readTokenData } from '../utils/auth';
import { USER_SELECT } from '../utils/select';

interface CreateArticlePayload {
  article?: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}

export const createArticle = async (
  req: Request<{}, {}, CreateArticlePayload>,
  res: Response
) => {
  const tokenData = readTokenData(res);
  if (!tokenData) res.sendStatus(403);

  const payload = req.body.article;
  if (!payload || !payload.title || !payload.description || !payload.body)
    return res.sendStatus(400);

  const { body, title, description, tagList } = payload;

  const slug =
    title.toLocaleLowerCase().replaceAll(' ', '-') + `-${tokenData?.userId}`;

  const existingTitle = await prisma.article.findUnique({
    where: { slug },
    select: { slug: true },
  });

  if (existingTitle) {
    return res.status(400).send('Title must be unique');
  }

  const { authorId, id, favoritedBy, _count, ...article } =
    await prisma.article.create({
      data: {
        title,
        description,
        body,
        slug,
        tagList: {
          connectOrCreate: tagList?.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },

        author: { connect: { id: tokenData?.userId } },
      },
      include: {
        author: {
          select: USER_SELECT,
        },
        _count: {
          select: {
            favoritedBy: true,
          },
        },
        tagList: { select: { name: true } },
        favoritedBy: true,
      },
    });

  return res.status(200).send({
    article: {
      ...article,
      tagList: article.tagList.map(({ name }) => name),
      favoritesCount: _count.favoritedBy,
      favorited: favoritedBy.some((user) => user.id === tokenData?.userId),
    },
  });
};
