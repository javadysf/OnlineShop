'use client';

import './globals.css';
import './fonts.css';
import ClientLayout from './ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-bnazanin">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 