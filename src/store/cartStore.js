import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را افزایش می‌دهیم
          const updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
          set({ items: updatedItems });
        } else {
          // اگر محصول جدید است، آن را به سبد خرید اضافه می‌کنیم
          set({ items: [...items, product] });
        }

        // محاسبه مجدد مجموع اقلام و قیمت کل
        const newItems = get().items;
        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ totalItems, totalPrice });
      },

      removeFromCart: (productId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.id !== productId);

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: "cart-storage", // نام کلید ذخیره‌سازی در localStorage
    }
  )
);

export default useCartStore; 