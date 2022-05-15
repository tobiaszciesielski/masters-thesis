import { Router } from 'express';
import { addComment, getComments } from '../../controllers/comments';

import { optionalAuth, requiredAuth } from '../../utils/auth';

const commentsRouter = Router({ mergeParams: true });

commentsRouter.get('/', optionalAuth, getComments);
commentsRouter.post('/', requiredAuth, addComment);

export { commentsRouter };
