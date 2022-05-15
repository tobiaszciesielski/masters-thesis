import { Router } from 'express';
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from '../controllers/articles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const articlesRouter = Router();

articlesRouter.get('/', optionalAuth, getArticles);
articlesRouter.post('/', requiredAuth, createArticle);
articlesRouter.get('/:slug', optionalAuth, getArticle);
articlesRouter.put('/:slug', requiredAuth, updateArticle);
articlesRouter.delete('/:slug', requiredAuth, deleteArticle);

export { articlesRouter };
