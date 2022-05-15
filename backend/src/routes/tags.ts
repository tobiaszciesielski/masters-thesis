import { Router } from 'express';
import { getTagList } from '../controllers/tags';
import { optionalAuth } from '../utils/auth';

const tagsRouter = Router();

tagsRouter.get('/', optionalAuth, getTagList);

export { tagsRouter };
