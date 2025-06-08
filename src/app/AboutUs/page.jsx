"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-sky-100 to-yellow-50 min-h-screen py-16 px-6 md:px-20 text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold text-center text-yellow-500 mb-10"
      >
        درباره ما
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white/80 shadow-xl rounded-3xl p-6 md:p-10 backdrop-blur-md"
      >
        <h2 className="text-2xl font-semibold text-sky-600 mb-4">ما که هستیم؟</h2>
        <p className="text-md leading-7 text-gray-700 mb-6">
          ما یک تیم پرانرژی و عاشق نوآوری هستیم که با هدف ارائه تجربه‌ای بی‌نظیر از خرید آنلاین این فروشگاه
          رو راه انداختیم. از طراحی‌های خاصمون گرفته تا انتخاب محصولات با کیفیت، همه چیز رو با عشق انجام
          می‌دیم تا شما با لبخند خرید کنید.
        </p>

        <h2 className="text-2xl font-semibold text-sky-600 mb-4">مأموریت ما</h2>
        <p className="text-md leading-7 text-gray-700 mb-6">
          ما تلاش می‌کنیم تا خرید آنلاین رو نه‌تنها ساده، بلکه لذت‌بخش کنیم. پشتیبانی سریع، ارسال به‌موقع و
          محصولات با کیفیت از ارزش‌های اصلی ماست.
        </p>

        <h2 className="text-2xl font-semibold text-sky-600 mb-4">ارزش‌های ما</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>اعتماد و صداقت با مشتری</li>
          <li>نوآوری و طراحی خلاق</li>
          <li>تمرکز روی تجربه کاربری</li>
          <li>پاسخگویی و پشتیبانی سریع</li>
        </ul>

        <div className="mt-10 text-center">
          <motion.img
            src="/team-illustration.png"
            alt="تیم ما"
            className="mx-auto w-60 md:w-80 drop-shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
          <p className="text-sm text-gray-500 mt-3">ما عاشق کاری هستیم که انجام می‌دیم 💙</p>
        </div>
      </motion.div>
    </div>
  );
}