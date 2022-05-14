import { Router } from 'express';
import { createArticle } from '../controllers/articles';
import { requiredAuth } from '../utils/auth';

const articlesRouter = Router();

articlesRouter.post('/', requiredAuth, createArticle);

export { articlesRouter };
