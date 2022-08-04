import React, { createContext, useContext } from 'react';
import type { FC } from 'react';
import { User } from '../models/User';

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
