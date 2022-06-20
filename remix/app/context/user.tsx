import { createContext, useContext } from 'react';
import type { FC } from 'react';

import type { User } from '~/models/User';

const UserContext = createContext<User | null>(null);

export const UserProvider: FC<{ user: User | null }> = ({ children, user }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
