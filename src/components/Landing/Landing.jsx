"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

  
  
  
  
  
  const Landing = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const images = [
    { src: "/assets/pics/gum.jpg", alt: "آدامس" },
    { src: "/assets/pics/juice.jpg", alt: "نوشیدنی" },
    { src: "/assets/pics/ice.jpg", alt: "لیوان یخی" },
  ];
  return (
    <div className="w-full h-screen flex-col justify-center content-center">
   <section className="w-full min-h-screen bg-gradient-to-br from-orange-100 via-amber-200 to-yellow-100 relative overflow-hidden">
      {/* گرادینت بک‌گراند */}
      <motion.div
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute inset-0 bg-[url('/assets/pics/bg-pattern.png')] bg-cover bg-no-repeat opacity-10 mix-blend-soft-light"
      />

      {/* محتوای اصلی */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* بخش متن */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-right max-w-lg space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-black leading-tight text-orange-700">
            مزه‌های متفاوت، حال و هوای جدید 😋
          </h1>
          <p className="text-lg text-gray-700">
            رنگارنگ‌ترین خوراکی‌ها رو همین حالا کشف کن. با کلی هیجان و طعم جدید.
          </p>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-full shadow-xl font-semibold"
            >
              شروع خرید 🛍️
            </motion.button>
          </Link>
        </motion.div>

        {/* اسلایدر مدرن با کاروسل دایره‌ای */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-md h-[20rem] flex items-center justify-center"
        >
          <div className="relative w-full h-full rounded-full border-[10px] border-orange-200 shadow-2xl overflow-hidden">
            <Carousel
              plugins={[Autoplay({ delay: 2500 })]}
              opts={{ loop: true }}
              className="w-full h-full"
            >
              <CarouselContent className="flex items-center h-full">
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="w-full flex justify-center items-center h-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={240}
                      height={240}
                      className="object-contain rounded-full border-4 border-white shadow-xl"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md" />
            </Carousel>
          </div>
        </motion.div>
      </div>

      {/* دکوراتیو افکت‌ها */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-14 left-12 w-32 h-32 bg-amber-300 rounded-full opacity-20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-20 right-10 w-28 h-28 bg-orange-400 rounded-full opacity-30 blur-2xl"
      />
    </section>
    </div>
  )
}
export default Landing
