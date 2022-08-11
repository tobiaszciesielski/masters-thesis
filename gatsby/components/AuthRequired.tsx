import React from 'react';
import { useUser } from '../context/user';

interface AuthRequiredProps {
  children: React.ReactNode;
}

export const AuthRequired = ({ children }: AuthRequiredProps) => {
  const user = useUser();

  return user ? <>{children}</> : null;
};


