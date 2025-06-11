'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ItemsCard from './ItemsCard/ItemsCard';

export default function ProductPage({ products }) {
  const [filtered, setFiltered] = useState(products);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    setCategories(cats);
  }, [products]);

  useEffect(() => {
    let list = [...products];

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOption === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => Number(b.id) - Number(a.id));
    }
    setFiltered(list);
  }, [searchTerm, selectedCategory, sortOption, products]);

  return (
    <main className="max-w-7xl mx-auto p-4 space-y-6 rtl bg-white dark:bg-gray-900 min-h-screen">
      {/* فیلتر و جستجو */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <Input
          placeholder="جستجو در محصولات..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 text-right bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
        />

        <select
          className="px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-right"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">جدیدترین</option>
          <option value="price_low">ارزان‌ترین</option>
          <option value="price_high">گران‌ترین</option>
        </select>
      </div>

      {/* دسته‌بندی‌ها */}
      <div className="flex flex-wrap gap-2 justify-start md:justify-end">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            className={selectedCategory === cat ? 'bg-primary hover:bg-primary/90' : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* نمایش محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product, index) => (
          <ItemsCard product={product} key={index} />
        ))}
      </div>
    </main>
  );
}