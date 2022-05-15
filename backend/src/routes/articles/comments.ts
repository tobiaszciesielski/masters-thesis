import { Router } from 'express';
import {
  addComment,
  deleteComment,
  getAllArticleComments,
} from '../../controllers/comments';

import { optionalAuth, requiredAuth } from '../../utils/auth';

const commentsRouter = Router({ mergeParams: true });

commentsRouter.delete('/:id', requiredAuth, deleteComment);
commentsRouter.post('/', requiredAuth, addComment);
commentsRouter.get('/', optionalAuth, getAllArticleComments);

export { commentsRouter };
