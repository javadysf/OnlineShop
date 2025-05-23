'use client';
import useCartStore from '@/lib/store';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-xl  mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">🛍️ سبد خرید</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">سبد خرید شما خالی است.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-green-600 font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6 border-t pt-4">
            <p className="font-bold">مجموع:</p>
            <p className="text-xl text-green-600 font-bold">${total.toFixed(2)}</p>
          </div>

          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            پاک‌کردن سبد خرید
          </button>
        </div>
      )}
    </div>
  );
}