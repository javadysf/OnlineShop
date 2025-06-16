'use client';

import { Toaster } from 'react-hot-toast';
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar/Navbar';

export default function ClientLayout({ children }) {
  const { initializeAuth } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // اجرای initializeAuth فقط یک بار در زمان بارگذاری اولیه
  useEffect(() => {
    const init = async () => {
      console.log('ClientLayout: Initializing auth...');
      await initializeAuth();
      setIsInitialized(true);
    };
    init();
  }, []);

  // نمایش loading تا زمانی که initializeAuth تمام شود
  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-4">
        <Toaster position="top-center" />
        {children}
      </main>
    </>
  );
} 