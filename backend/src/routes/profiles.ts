import { Router } from 'express';
import { follow, getProfile, unfollow } from '../controllers/profiles';
import { optionalAuth, requiredAuth } from '../utils/auth';

const profilesRouter = Router();

profilesRouter.delete('/:username/follow', requiredAuth, unfollow);
profilesRouter.post('/:username/follow', requiredAuth, follow);
profilesRouter.get('/:username', optionalAuth, getProfile);

export { profilesRouter };
