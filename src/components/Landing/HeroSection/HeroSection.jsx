"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";

const HeroSection = () => {
    
    const carouselImages = [
        "/assets/pics/juice.jpg",
        "/assets/pics/ice.jpg",
        "/assets/pics/gum.jpg",
      ];
      const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-gradient-to-r from-sky-200 via-yellow-100 to-sky-100 py-6 px-6 md:px-16">
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row max-lg:flex-col items-center gap-12">
      
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
      <div className="flex-1 max-lg:w-full ">
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
  )
}

export default HeroSection