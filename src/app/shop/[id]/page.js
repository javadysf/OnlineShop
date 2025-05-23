'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import useCartStore from '@/lib/store';
import React, { useEffect, useState } from 'react';

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default function ProductDetailPage({ params }) {
  const { id } = use(params); // ✅ unwrap کردن params به سبک جدید Next.js
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then(setProduct);
    }
  }, [id]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen w-full text-center py-20 text-gray-500">در حال بارگذاری...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl w-full bg-white shadow-xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* تصویر */}
        <div className="bg-gray-100 flex items-center justify-center p-6">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-96 h-96 object-contain"
            whileHover={{ scale: 1.05 }}
          />
        </div>

        {/* جزئیات */}
        <div className="p-8 flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h2>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mb-3">
              {product.category}
            </span>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-green-600 text-xl font-bold">${product.price}</p>
              <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                <span>⭐ {product.rating.rate}</span>
                <span className="text-gray-400">({product.rating.count} نظر)</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 rounded-xl shadow hover:scale-105 transition-transform"
              onClick={() => useCartStore.getState().addToCart(product)}
            >
              🛒 افزودن به سبد خرید
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}