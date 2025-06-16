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
    <nav className="sticky top-0 z-50 w-full border-b border-orange-300 dark:border-orange-900 bg-orange-100/90 dark:bg-orange-900/90 backdrop-blur-lg shadow-md">
      <div className="container flex h-16 items-center justify-between px-2 md:px-0">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-2 text-3xl font-black text-sky-400 hover:text-sky-500 transition">
          <span className="rounded-full bg-amber-100 p-2 text-3xl text-white shadow-md">🛍️</span>
          <span className="hidden sm:inline text-orange-500  dark:text-sky-300">پخش و پلا</span>
        </Link>

        {/* منو دسکتاپ */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-6 text-amber-800 dark:text-sky-200 text-xl font-medium">
          <li><Link href="/" className="px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">خانه</Link></li>
          <li><Link href="/shop" className="px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">خرید</Link></li>
          <li><Link href="/ContactUs" className="px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">تماس با ما</Link></li>
          <li><Link href="/AboutUs" className="px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">درباره ما</Link></li>
          {user ? (
            <>
              <li>
                <Link href="/profile" className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                  <User size={20} />
                  <span className="font-bold">{user.name}</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 text-red-600 transition">
                  <LogOut size={20} />
                  خروج
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" className="px-3 py-2 rounded-lg bg-sky-400 text-white hover:bg-sky-500 transition shadow">ورود / ثبت نام</Link></li>
          )}
        </ul>

        {/* آیکون‌های سمت راست */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <ThemeToggle />
          <CartButton />
        </div>

        {/* دکمه منو موبایل */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-sky-100 dark:hover:bg-gray-800 transition">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* منوی کشویی موبایل */}
      <div
        className={`md:hidden fixed top-0 right-0 left-0 z-40 bg-orange-50/95 dark:bg-orange-900/95 shadow-lg transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-[400px] py-6 px-6' : 'max-h-0 py-0 px-0 overflow-hidden'}`}
        style={{ borderBottomLeftRadius: '1.5rem', borderBottomRightRadius: '1.5rem' }}
      >
        <ul className="flex flex-col gap-4 text-sky-700 dark:text-sky-200 text-base font-medium">
          <li><Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">خانه</Link></li>
          <li><Link href="/shop" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">خرید</Link></li>
          <li><Link href="/ContactUs" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">تماس با ما</Link></li>
          <li><Link href="/AboutUs" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">درباره ما</Link></li>
          {user ? (
            <>
              <li>
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                  <User size={20} />
                  <span className="font-bold">{user.name}</span>
                </Link>
              </li>
              <li>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 text-red-600 transition">
                  <LogOut size={20} />
                  خروج
                </button>
              </li>
            </>
          ) : (
            <li><Link href="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg bg-sky-400 text-white hover:bg-sky-500 transition shadow">ورود / ثبت نام</Link></li>
          )}
          <li className="flex items-center gap-4 mt-2">
            <ThemeToggle />
            <CartButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}