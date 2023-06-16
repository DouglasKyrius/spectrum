'use client';
import { PropsWithChildren, FC } from 'react';
// components
import { Navigate } from '@/components/Navigate';
import { LoadingScreen } from '@/components/LoadingScreen';
// hooks
import useAuth from '@/hooks/useAuth';

export const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isInitialized, user } = useAuth();

  if (!isInitialized) return <LoadingScreen />;

  if (isAuthenticated) return <Navigate to={'/' + user.username} />;

  return <>{children}</>;
};
