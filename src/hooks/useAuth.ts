'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const ADMIN_EMAIL = 'admin@nist.csf';
export const ADMIN_PASSWORD = 'admin-csf';

const AUTH_KEY = 'nist_auth';

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return { isAuthenticated, isLoading, login, logout };
};
