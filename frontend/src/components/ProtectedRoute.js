import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user, token } = useAuth();

  console.log('🔍 ProtectedRoute check:', { 
    isAuthenticated, 
    isLoading, 
    hasUser: !!user, 
    hasToken: !!token 
  });

  if (isLoading) {
    console.log('⏳ ProtectedRoute: Still loading...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🚫 ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/" replace />;
  }

  console.log('✅ ProtectedRoute: Authenticated, rendering children');
  return children;
};

export default ProtectedRoute;