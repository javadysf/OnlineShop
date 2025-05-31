"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Card, CardContent } from "@/components/ui/card";
  
  
  
const carouselImages = [
  "/assets/pics/juice.jpg",
  "/assets/pics/ice.jpg",
  "/assets/pics/gum.jpg",
];
  
  const Landing = ({products}) => {
    const bestSellers = [...products]
  .sort((a, b) => b.rating.count - a.rating.count)
  .slice(0, 4); // فقط ۴ تا پرفروش
    const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-full h-screen flex-col">
        <section className="bg-gradient-to-r from-sky-200 via-yellow-100 to-sky-100 py-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        
        {/* Left Side: Image + Text */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <Image
            src="/assets/pics/Hero.png" // تصویر اصلی که تولید کردیم
            alt="Happy grandfather and child"
            width={400}
            height={400}
            className="mx-auto md:mx-0 rounded-xl shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900">
            خریدی شاد با عزیزانت!
          </h1>
          <p className="text-lg text-gray-800">
            فروشگاه ما جاییه برای لبخند، کیفیت و حس خوب خرید خانوادگی.
          </p>
          <Button className="bg-yellow-400 text-sky-900 text-2xl hover:bg-yellow-500 font-semibold px-6 py-8 rounded-xl shadow">
            شروع خرید
          </Button>
        </div>

        {/* Right Side: Carousel */}
        <div className="flex-1">
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={carouselImages[activeIndex]}
              alt={`Slide ${activeIndex}`}
              layout="fill"
              objectFit="cover"
              className="transition-all duration-500"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={clsx(
                  "w-4 h-4 rounded-full border-2 border-sky-400 transition-all",
                  activeIndex === index
                    ? "bg-yellow-400 scale-110"
                    : "bg-white hover:bg-yellow-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    <div className="relative w-full overflow-hidden leading-none">
      <svg
        className="relative block w-full h-24"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path
          d="M0,0 C300,100 900,0 1200,100 L1200,120 L0,120 Z"
          fill="#38bdf8" // آبی آسمونی
        />
        <path
          d="M0,0 C200,80 1000,20 1200,90 L1200,120 L0,120 Z"
          fill="#fde047" // زرد روشن
          fillOpacity="0.5"
        />
      </svg>
    </div>
    <section className="bg-gradient-to-br from-sky-100 via-yellow-50 to-sky-50 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-sky-700">
          پرفروش‌ترینا! 🔥
        </h2>
        <p className="text-sky-600 mt-2">محبوب‌ترین محصولات فروشگاه ما</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {bestSellers.map((product) => (
          <Card key={product.id} className="hover:scale-[1.02] transition-transform duration-200">
            <img
              src={product.image}
              alt={product.title}
              className="h-44 w-full object-contain p-4"
            />
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
              <p className="text-orange-600 font-bold">${product.price}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
              <p className="text-xs text-yellow-500">⭐ {product.rating.rate} ({product.rating.count})</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
    </div>
  )
}
export default Landing
