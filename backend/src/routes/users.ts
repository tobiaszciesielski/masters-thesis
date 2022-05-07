import { Router } from 'express';
import { login, register } from '../controllers/users';
import { authenticateToken } from '../utils/auth';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/', authenticateToken, register);

export { authRouter };
