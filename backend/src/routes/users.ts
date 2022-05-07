import { Router } from 'express';
import { login, register } from '../controllers/users';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/', register);

export { authRouter };
