import type { FC } from 'react';
import { useUser } from '~/context/user';

export const AuthRequired: FC = function AuthRequired({ children }) {
  const user = useUser();

  return user ? <>{children}</> : null;
};
