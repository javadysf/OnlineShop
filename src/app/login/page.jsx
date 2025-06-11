'use client';

import AuthForm from '@/components/auth/AuthForm';
import { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <AuthForm />
    </div>
  );
} 