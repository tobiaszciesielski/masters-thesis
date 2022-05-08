import { Router } from 'express';
import { follow, getProfile } from '../controllers/profiles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const profilesRouter = Router();

profilesRouter.get('/:username', optionalAuth, getProfile);
profilesRouter.post('/:username/follow', requiredAuth, follow);

export { profilesRouter };
