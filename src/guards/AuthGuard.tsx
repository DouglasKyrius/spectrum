'use client';
import { PropsWithChildren, FC } from 'react';
// components
import { LoadingScreen } from '@/components/LoadingScreen';
// hooks
import useAuth from '@/hooks/useAuth';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isInitialized } = useAuth();

  if (!isInitialized) return <LoadingScreen />;

  return <>{children}</>;
};
