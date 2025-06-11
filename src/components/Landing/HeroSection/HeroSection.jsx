"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    
    const carouselImages = [
        "/assets/pics/juice.jpg",
        "/assets/pics/ice.jpg",
        "/assets/pics/gum.jpg",
      ];
      const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-white dark:bg-gray-900 py-6 px-6 md:px-16">
    <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row max-lg:flex-col items-center gap-10">
      
      {/* Left Side: Image + Text */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <Image
          src="/assets/pics/Hero.jpg" // تصویر اصلی که تولید کردیم
          alt="Happy grandfather and child"
          width={500}
          height={30}
          className="mx-auto md:mx-0 rounded-xl shadow-lg dark:shadow-gray-800"
        />
        <div className="flex w-full justify-evenly items-center">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-500 dark:text-white">
با لذت خرید کن!        </h1>
      
        <Link href={"/shop"}>
        <Button className="bg-orange-400 hover:bg-orange-300/90 text-white text-2xl font-semibold px-6 py-8 rounded-xl shadow dark:shadow-gray-800">
          شروع خرید
        </Button>
        </Link>
        </div>
      </div>

      {/* Right Side: Carousel */}
      <div className="flex-1 max-lg:w-full ">
        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800">
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
                "w-4 h-4 rounded-full border-2 transition-all",
                activeIndex === index
                  ? "bg-primary border-primary scale-110"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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