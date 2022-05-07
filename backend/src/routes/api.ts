import { Router } from 'express';
import { authRouter } from './users';
const apiRouter = Router();

apiRouter.use('/users', authRouter);

export { apiRouter };
