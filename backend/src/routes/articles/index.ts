import { Router } from 'express';
import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  feedArticles,
  getArticle,
  getArticles,
  unfavoriteArticle,
  updateArticle,
} from '../../controllers/articles';
import { optionalAuth, requiredAuth } from '../../utils/auth';
import { commentsRouter } from './comments';

const articlesRouter = Router();

articlesRouter.use('/:slug/comments', commentsRouter);

articlesRouter.post('/:slug/favorite', requiredAuth, favoriteArticle);
articlesRouter.delete('/:slug/favorite', requiredAuth, unfavoriteArticle);

articlesRouter.put('/:slug', requiredAuth, updateArticle);
articlesRouter.delete('/:slug', requiredAuth, deleteArticle);
articlesRouter.get('/:slug', optionalAuth, getArticle);

articlesRouter.get('/feed', requiredAuth, feedArticles);

articlesRouter.post('/', requiredAuth, createArticle);
articlesRouter.get('/', optionalAuth, getArticles);

export { articlesRouter };
