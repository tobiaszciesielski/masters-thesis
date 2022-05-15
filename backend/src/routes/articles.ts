import { Router } from 'express';
import {
  createArticle,
  deleteArticle,
  feedArticles,
  getArticle,
  getArticles,
  updateArticle,
} from '../controllers/articles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const articlesRouter = Router();

articlesRouter.get('/feed', requiredAuth, feedArticles);
articlesRouter.get('/:slug', optionalAuth, getArticle);
articlesRouter.put('/:slug', requiredAuth, updateArticle);
articlesRouter.delete('/:slug', requiredAuth, deleteArticle);
articlesRouter.post('/', requiredAuth, createArticle);
articlesRouter.get('/', optionalAuth, getArticles);

export { articlesRouter };
