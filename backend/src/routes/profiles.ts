import { Router } from 'express';
import { optionalAuth } from '../utils/auth';

// import { authenticateToken } from '../utils/auth';

const profilesRouter = Router();

profilesRouter.get('/:username', optionalAuth);
profilesRouter.put('/', optionalAuth);

export { profilesRouter };
