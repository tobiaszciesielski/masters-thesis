import { Request, Response } from 'express';
import { prisma } from '../../prisma/client';
import { ArticlePayload } from '../models/article';
import { readTokenData } from '../utils/auth';
import { createArticleSlug } from '../utils/helpers';
import { ARTICLE_INCLUDE } from '../utils/select';

export const createArticle = async (
  req: Request<any, any, ArticlePayload>,
  res: Response
) => {
  const tokenData = readTokenData(res);
  if (!tokenData) return res.sendStatus(403);

  const payload = req.body.article;
  if (!payload || !payload.title || !payload.description || !payload.body)
    return res.sendStatus(400);

  const { body, title, description, tagList } = payload;

  const slug = createArticleSlug(title, tokenData.userId);

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
      include: ARTICLE_INCLUDE,
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

export const getArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) return res.sendStatus(400);

  const tokenData = readTokenData(res);

  const article = await prisma.article.findUnique({
    where: { slug },
    include: ARTICLE_INCLUDE,
  });

  if (!article) return res.sendStatus(404);

  const { authorId, id, tagList, favoritedBy, _count, ...reducedArticle } =
    article;

  return res.send({
    article: {
      ...reducedArticle,
      tagList: tagList.map(({ name }) => name),
      favoritesCount: _count.favoritedBy,
      favorited: favoritedBy.some((user) => user.id === tokenData?.userId),
    },
  });
};

export const updateArticle = async (
  req: Request<any, any, ArticlePayload>,
  res: Response
) => {
  const tokenData = readTokenData(res);
  if (!tokenData) return res.sendStatus(403);

  const payload = req.body.article;
  if (!payload) return res.sendStatus(400);

  const { body, title, description } = payload;

  const { slug } = req.params;
  if (!slug) return res.sendStatus(400);

  const article = await prisma.article.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!article) return res.status(400).send('Article not exists');

  let newSlug: string | undefined;
  if (title) {
    newSlug = createArticleSlug(title, tokenData.userId);

    const existingTitle = await prisma.article.findMany({
      where: { NOT: { id: article.id }, AND: { slug: newSlug } },
      select: { slug: true },
    });

    if (existingTitle.length) {
      return res.status(400).send('Title must be unique');
    }
  }

  const { authorId, id, tagList, _count, favoritedBy, ...updatedArticle } =
    await prisma.article.update({
      where: {
        id: article.id,
      },
      data: {
        title,
        description,
        body,
        slug: newSlug,
        updatedAt: new Date(),
      },
      include: ARTICLE_INCLUDE,
    });

  return res.status(200).send({
    article: {
      ...updatedArticle,
      tagList: tagList.map(({ name }) => name),
      favoritesCount: _count.favoritedBy,
      favorited: favoritedBy.some((user) => user.id === tokenData?.userId),
    },
  });
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (!slug) return res.sendStatus(400);

  const articleToDelete = await prisma.article.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!articleToDelete) return res.sendStatus(404);

  await prisma.article.delete({
    where: { id: articleToDelete?.id },
    select: { id: true },
  });

  return res.sendStatus(200);
};
