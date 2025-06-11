'use client';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import useCartStore from '@/store/cartStore';

export default function CartButton() {
  const cart = useCartStore((state) => state.items);
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="w-6 h-6 text-gray-900 dark:text-white" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}