"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Award, Heart, ShoppingBag } from "lucide-react";

export default function AboutUs() {
  const details = {"id":2,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
  const CreateQuestions = async ( details) => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/products",
        details,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary dark:text-primary mb-8">درباره ما</h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose dark:prose-invert max-w-none"
        >
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            فروشگاه ما با بیش از ۱۰ سال تجربه در زمینه فروش محصولات با کیفیت، همواره تلاش کرده است تا بهترین خدمات را به مشتریان خود ارائه دهد. ما معتقدیم که رضایت مشتری، کلید موفقیت ماست.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <Users className="w-12 h-12 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">۱۰۰۰+ مشتری</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">مشتریان راضی</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <Award className="w-12 h-12 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">۱۰ سال تجربه</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">در صنعت فروش</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <Heart className="w-12 h-12 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">رضایت ۹۸٪</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">از خدمات ما</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
            >
              <ShoppingBag className="w-12 h-12 text-primary mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">۵۰۰+ محصول</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">با کیفیت بالا</p>
            </motion.div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ماموریت ما</h2>
            <p className="text-gray-700 dark:text-gray-300">
              ما متعهد به ارائه بهترین محصولات با قیمت‌های مناسب و خدمات پس از فروش عالی هستیم. هدف ما ایجاد تجربه خرید لذت‌بخش برای همه مشتریان است.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">چشم‌انداز ما</h2>
            <p className="text-gray-700 dark:text-gray-300">
              ما در تلاش هستیم تا به یکی از معتبرترین فروشگاه‌های آنلاین در کشور تبدیل شویم و استانداردهای جدیدی را در صنعت خرده‌فروشی تعریف کنیم.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}