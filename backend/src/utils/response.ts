import { User } from '@prisma/client';
import _ from 'lodash';

export const peelUser = (user: User): Partial<User> => {
  return _.pick(user, ['email', 'username', 'bio', 'image']);
};
