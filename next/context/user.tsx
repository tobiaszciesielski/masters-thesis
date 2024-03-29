import { createContext, useContext } from 'react';
import type { FC } from 'react';
import { User } from '../models/User';

interface UserProviderProps {
  children: React.ReactNode;
  user: User | null;
}

const UserContext = createContext<User | null>(null);

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
