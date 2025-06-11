import './globals.css';
import './fonts.css';
import { metadata } from './metadata';
import ClientLayout from './ClientLayout';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-bnazanin">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 