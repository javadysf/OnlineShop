'use client';

import { useEffect, useState } from 'react';
import ShoppingPage from '@/components/ShoppingPage/ShoppingPage';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("خطا در دریافت محصولات");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 gap-6">
        <div className="relative w-20 h-20 animate-spin-slow">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-primary"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-primary/70"></div>
          <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-primary/40"></div>
        </div>
        <span className="ml-4 text-gray-900 dark:text-white font-semibold text-2xl animate-pulse">در حال بارگذاری...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ShoppingPage products={products} />
    </div>
  );
}
