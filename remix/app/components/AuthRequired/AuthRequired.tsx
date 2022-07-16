import type { FC } from 'react';
import { useUser } from '~/context/user';

const AuthRequired: FC = function AuthRequired({ children }) {
  const user = useUser();

  return user ? <>{children}</> : null;
};

export default AuthRequired;
