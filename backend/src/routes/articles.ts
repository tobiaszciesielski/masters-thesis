import { Router } from 'express';
import {
  createArticle,
  getArticle,
  updateArticle,
} from '../controllers/articles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const articlesRouter = Router();

articlesRouter.post('/', requiredAuth, createArticle);
articlesRouter.put('/:slug', requiredAuth, updateArticle);
articlesRouter.get('/:slug', optionalAuth, getArticle);

export { articlesRouter };
