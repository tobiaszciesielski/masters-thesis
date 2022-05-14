import { Router } from 'express';
import { getCurrentUser, updateUser } from '../controllers/user';

import { requiredAuth } from '../utils/auth';

const userRouter = Router();

userRouter.get('/', requiredAuth, getCurrentUser);
userRouter.put('/', requiredAuth, updateUser);

export { userRouter };
