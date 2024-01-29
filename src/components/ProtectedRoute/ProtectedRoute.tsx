import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckTokenHook } from '@/core/hooks/useCheckTokenHook';
import { Spinner } from '@/components/Spinner';

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, isValid } = useCheckTokenHook();

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  if (isValid) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
