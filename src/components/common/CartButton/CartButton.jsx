'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import useCartStore from '@/lib/store';

export default function CartButton() {
  const cart = useCartStore((state) => state.cart);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="w-6 h-6 text-gray-800" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}