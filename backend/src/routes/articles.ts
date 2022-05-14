import { Router } from 'express';
import { createArticle, updateArticle } from '../controllers/articles';
import { requiredAuth } from '../utils/auth';

const articlesRouter = Router();

articlesRouter.post('/', requiredAuth, createArticle);
articlesRouter.put('/:slug', requiredAuth, updateArticle);

export { articlesRouter };
