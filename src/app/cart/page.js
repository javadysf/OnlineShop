'use client';
import useCartStore from '@/store/cartStore';
import { useRouter } from 'next/navigation';

// ... existing code ...
import Image from 'next/image';
import Link from 'next/link';
// ... existing code ...
export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const router = useRouter();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow mt-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="text-3xl">🛒</span> سبد خرید شما
      </h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <span className="text-6xl mb-4">🛍️</span>
          <p className="text-gray-500 dark:text-gray-400 mb-4">سبد خرید شما خالی است.</p>
          <Link href="/shop" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">رفتن به فروشگاه</Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4">
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} width={80} height={80} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-900 dark:text-white text-base mb-1 line-clamp-1">{item.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>قیمت واحد:</span>
                    <span className="font-bold text-sky-700 dark:text-sky-400">{item.price.toLocaleString()} تومان</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700 text-lg font-bold flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">-</button>
                    <span className="mx-2 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700 text-lg font-bold flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">{(item.price * item.quantity).toLocaleString()} تومان</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 dark:text-red-400 text-xs hover:text-red-600 dark:hover:text-red-300 transition-colors">حذف</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-gray-900 dark:text-white">تعداد اقلام:</span>
              <span className="text-sky-700 dark:text-sky-400 font-bold">{totalItems}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold text-gray-900 dark:text-white">مبلغ کل:</span>
              <span className="text-green-600 dark:text-green-400 font-bold text-xl">{total.toLocaleString()} تومان</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full md:w-auto"
            >
              پاک‌کردن سبد خرید
            </button>
            <button
              onClick={() => router.push('/cart/checkout')}
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-bold transition-colors w-full md:w-auto"
            >
              ادامه و ثبت سفارش
            </button>
            <Link href="/shop" className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-bold transition-colors w-full md:w-auto text-center">بازگشت به فروشگاه</Link>
          </div>
        </>
      )}
    </div>
  );
}
// ... existing code ...