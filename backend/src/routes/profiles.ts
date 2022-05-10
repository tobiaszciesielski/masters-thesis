import { Router } from 'express';
import { follow, getProfile, unfollow } from '../controllers/profiles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const profilesRouter = Router();

profilesRouter.get('/:username', optionalAuth, getProfile);
profilesRouter.post('/:username/follow', requiredAuth, follow);
profilesRouter.delete('/:username/follow', requiredAuth, unfollow);

export { profilesRouter };
