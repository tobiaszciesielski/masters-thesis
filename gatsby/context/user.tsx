import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FC } from 'react';
import { User } from '../models/User';
import { getAuthTokenFromCookies, getUser } from '../lib/session';
import { getUserWithToken } from '../services/auth';

type AuthUser = User | null;

interface UserProviderProps {
  children: React.ReactNode;
  user: AuthUser;
}

const UserContext = createContext<{
  user: AuthUser;
  logout: () => void;
  login: (user: AuthUser) => void;
}>({
  user: null,
  logout: () => {},
  login: (user: AuthUser) => {},
});

export const UserProvider: FC<UserProviderProps> = ({ children, user }) => {
  const [authUser, setAuthUser] = useState(user);

  useEffect(() => {
    if (typeof window !== undefined) {
      const token = getAuthTokenFromCookies(document.cookie);
      if (token) {
        getUserWithToken(token).then((user) => {
          setAuthUser(user);
        });
      }
    }
  }, []);
  console.log(authUser);

  return (
    <UserContext.Provider
      value={{
        user: authUser,
        logout: () => setAuthUser(null),
        login: (user: AuthUser) => setAuthUser(user),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useLogout = () => {
  const { logout } = useContext(UserContext);
  return logout;
};

export const useLogin = () => {
  const { login } = useContext(UserContext);
  return login;
};
