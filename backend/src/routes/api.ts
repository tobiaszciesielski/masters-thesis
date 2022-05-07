import { Router } from 'express';
import { profilesRouter } from './profiles';
import { userRouter } from './user';
import { authRouter } from './users';
const apiRouter = Router();

apiRouter.use('/users', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/profiles', profilesRouter);

export { apiRouter };
