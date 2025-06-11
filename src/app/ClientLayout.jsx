'use client';

import Navbar from '@/components/common/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';

export default function ClientLayout({ children }) {
  const initializeAuth = useAuthStore(state => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Toaster position="top-center" />
    </>
  );
} 