import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/user';

import { authenticateToken } from '../utils/auth';

const userRouter = Router();

userRouter.get('/', authenticateToken, getCurrentUser);
userRouter.put('/', authenticateToken, updateUser);

export { userRouter };
