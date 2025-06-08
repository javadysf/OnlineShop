'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CartButton from '../CartButton/CartButton';

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
          <li className="hover:text-sky-600 transition"><Link href="/ContactUs">تماس با ما</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/AboutUs">درباره ما</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/shop">خرید</Link></li>
          <li className="hover:text-sky-600 transition"><Link href="/login">ثبت نام / ورود</Link></li>
        </ul>

        {/* آیکون سبد خرید */}
        <div className="relative hidden md:block">
          <CartButton/>
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
          
            <CartButton/>
        
          </li>
        </ul>
      </div>
    </nav>
  );
}