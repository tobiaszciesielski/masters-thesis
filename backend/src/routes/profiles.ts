import { Router } from 'express';
import { getProfile } from '../controllers/profiles';
import { optionalAuth } from '../utils/auth';

const profilesRouter = Router();

profilesRouter.get('/:username', optionalAuth, getProfile);
profilesRouter.put('/', optionalAuth);

export { profilesRouter };
