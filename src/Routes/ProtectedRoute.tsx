import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const { user } = useAuth();
  const { children } = props;
  if (!user) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
}
