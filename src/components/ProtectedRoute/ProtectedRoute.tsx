import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckTokenHook } from '@/core/hooks/useCheckTokenHook';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const isTokenValid = useCheckTokenHook();

  if (isTokenValid) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
