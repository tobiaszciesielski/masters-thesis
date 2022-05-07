import { Router } from 'express';
import { userRouter } from './user';
import { authRouter } from './users';
const apiRouter = Router();

apiRouter.use('/users', authRouter);
apiRouter.use('/user', userRouter);

export { apiRouter };
