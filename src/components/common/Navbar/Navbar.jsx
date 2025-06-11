'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import CartButton from '../CartButton/CartButton';
import { ThemeToggle } from '@/components/theme-toggle';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('خروج موفقیت‌آمیز');
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 bg-gradient-to-r from-amber-100/70 dark:from-amber-900/70 via-amber-50/30 dark:via-gray-900 to-amber-100/70 dark:to-amber-900/70">
      <div className="container flex h-16 items-center justify-between">
        {/* لوگو */}
        <Link href="/" className="text-2xl font-bold text-primary">🛍️ فروشگاه من</Link>

        {/* دکمه منو موبایل */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* منو دسکتاپ */}
        <ul className="hidden md:flex space-x-6 text-foreground text-lg font-medium rtl:space-x-reverse">
          <li className="hover:text-primary transition"><Link href="/">خانه</Link></li>
          <li className="hover:text-primary transition"><Link href="/ContactUs">تماس با ما</Link></li>
          <li className="hover:text-primary transition"><Link href="/AboutUs">درباره ما</Link></li>
          <li className="hover:text-primary transition"><Link href="/shop">خرید</Link></li>
          {user ? (
            <>
              <li className="hover:text-primary transition">
                <Link href="/profile" className="flex items-center gap-1">
                  <User size={20} />
                  {user.name}
                </Link>
              </li>
              <li className="hover:text-primary transition">
                <button onClick={handleLogout} className="flex items-center gap-1">
                  <LogOut size={20} />
                  خروج
                </button>
              </li>
            </>
          ) : (
            <li className="hover:text-primary transition">
              <Link href="/login">ورود / ثبت نام</Link>
            </li>
          )}
        </ul>

        {/* آیکون‌های سمت راست */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-96 py-4 px-6' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col space-y-4 text-foreground text-base font-medium">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>خانه</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>تماس با ما</Link></li>
          <li><Link href="/about" onClick={() => setMenuOpen(false)}>درباره ما</Link></li>
          <li><Link href="/products" onClick={() => setMenuOpen(false)}>خرید</Link></li>
          {user ? (
            <>
              <li>
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-1">
                  <User size={20} />
                  {user.name}
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-1">
                  <LogOut size={20} />
                  خروج
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" onClick={() => setMenuOpen(false)}>ورود / ثبت نام</Link></li>
          )}
          <li className="flex items-center gap-4">
            <ThemeToggle />
            <CartButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}