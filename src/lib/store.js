import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
    console.log(cart);
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((item) => item.id !== id);
    set({ cart: updatedCart });
  },

  clearCart: () => set({ cart: [] }),
}));
export default useCartStore;