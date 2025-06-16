'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, Trash2, Plus, Minus } from 'lucide-react';
import useCartStore from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const CartButton = () => {
  const { items: cart, removeItem: removeFromCart, updateItemQuantity: updateQuantity } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900 dark:to-amber-800 text-amber-900 dark:text-amber-100 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isAnimating ? 1.2 : 1 }}
            className="absolute -top-2 -right-2 bg-amber-500 dark:bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md"
          >
            {totalItems}
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
            style={{
              transform: 'translateX(-100%)',
              marginLeft: '-0.5rem'
            }}
          >
            <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Package className="w-5 h-5" />
                سبد خرید شما
              </h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {cart.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                  <p>سبد خرید شما خالی است</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                            {item.price.toLocaleString()} تومان
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 dark:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-700 dark:text-gray-300">جمع کل:</span>
                  <span className="text-lg font-bold text-amber-900 dark:text-amber-100">
                    {totalPrice.toLocaleString()} تومان
                  </span>
                </div>
                <Link href={"/cart"}>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  تکمیل خرید
                </motion.button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartButton;