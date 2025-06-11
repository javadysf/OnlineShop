'use client';
import useCartStore from '@/store/cartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🛍️ سبد خرید</h1>

      {items.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">سبد خرید شما خالی است.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
            >
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-green-600 dark:text-green-400 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 dark:text-red-400 text-sm hover:text-red-600 dark:hover:text-red-300 transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="font-bold text-gray-900 dark:text-white">مجموع:</p>
            <p className="text-xl text-green-600 dark:text-green-400 font-bold">${total.toFixed(2)}</p>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            پاک‌کردن سبد خرید
          </button>
        </div>
      )}
    </div>
  );
}