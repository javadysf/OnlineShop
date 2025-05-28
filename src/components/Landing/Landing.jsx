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
      <h1 className="font-black text-6xl">فروشگاه پخش و پلا</h1>
      <section
      ref={targetRef}
      className="relative bg-gradient-to-br from-[#ffdde1] via-[#ee9ca7] to-[#ffdde1] overflow-hidden"
    >
      {/* پارالاکس بک‌گراند */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[url('/assets/pics/bg-pattern.png')] bg-cover bg-no-repeat opacity-10"
      />

      <div className="relative z-10 max-w-6xl mx-auto py-24 px-4 md:px-8 grid md:grid-cols-2 items-center gap-12">
        {/* متن سمت راست */}
        <div className="space-y-6 text-right">
          <motion.h1
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight"
          >
            فروشگاه رنگی‌رنگی 😍
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-xl text-gray-700"
          >
            دنیایی از طعم‌ها و رنگ‌ها، آماده‌ی کشف توسط تو!
          </motion.p>
<Link href={"/shop"} >
          <motion.button
          
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            بیا بگردیم 🛍️
          </motion.button>
</Link>
        </div>

        {/* اسلایدر محصولات */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full relative"
            opts={{ loop: true }}
          >
            <CarouselContent>
              {images.map((img, idx) => (
                <CarouselItem key={idx} className="flex justify-center items-center h-72">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={300}
                    height={300}
                    className="rounded-2xl shadow-2xl object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </motion.div>
      </div>

      {/* دکوراتیو آبجکت‌های شناور */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-30 blur-2xl"
      />

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-30 blur-2xl"
      />
    </section>
    </div>
  )
}
export default Landing
