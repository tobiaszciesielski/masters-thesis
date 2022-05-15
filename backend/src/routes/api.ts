import { Router } from 'express';
import { articlesRouter } from './articles';
import { profilesRouter } from './profiles';
import { tagsRouter } from './tags';
import { userRouter } from './user';
import { authRouter } from './users';
const apiRouter = Router();

apiRouter.use('/users', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/profiles', profilesRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/tags', tagsRouter);

export { apiRouter };
