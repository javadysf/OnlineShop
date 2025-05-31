'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-100 to-sky-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* لوگو */}
        <Link href="/" className="text-2xl font-bold text-sky-700">🛍️ فروشگاه من</Link>

        {/* دکمه منو موبایل */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* منو دسکتاپ */}
        <ul className="hidden md:flex space-x-6 text-gray-700 text-lg font-medium rtl:space-x-reverse">
          <li className="hover:text-sky-600 transition"><Link href="/">خانه</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/contact">تماس با ما</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/about">درباره ما</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/products">خرید</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/login">ثبت نام / ورود</Link></li>
        </ul>

        {/* آیکون سبد خرید */}
        <div className="relative hidden md:block">
          <Link href="/cart" className="text-2xl">🛒</Link>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-96 py-4 px-6' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col space-y-4 text-gray-700 text-base font-medium">
          <li><Link href="/" onClick={() => setMenuOpen(false)}>خانه</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>تماس با ما</Link></li>
          <li><Link href="/about" onClick={() => setMenuOpen(false)}>درباره ما</Link></li>
          <li><Link href="/products" onClick={() => setMenuOpen(false)}>خرید</Link></li>
          <li><Link href="/login" onClick={() => setMenuOpen(false)}>ثبت نام / ورود</Link></li>
          <li className="flex items-center space-x-2 rtl:space-x-reverse">
            <Link href="/cart" className="text-xl">🛒</Link>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">2</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}