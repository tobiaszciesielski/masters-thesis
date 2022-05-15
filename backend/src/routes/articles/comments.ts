import { Router } from 'express';
import { addComment } from '../../controllers/comments';

import { requiredAuth } from '../../utils/auth';

const commentsRouter = Router({ mergeParams: true });

commentsRouter.post('/', requiredAuth, addComment);

export { commentsRouter };
