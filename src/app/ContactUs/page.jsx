"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary dark:text-primary mb-8">تماس با ما</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <input
              placeholder="نام شما"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
            />
            <input
              placeholder="ایمیل شما"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
            />
            <textarea
              placeholder="پیام شما"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
            />
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-xl w-full transition-colors">
              ارسال پیام
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-gray-700 dark:text-gray-300"
          >
            <div className="flex items-center gap-3">
              <Phone className="text-primary" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-primary" />
              <span>info@yourshop.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-primary" />
              <span>تهران، خیابان آزادی، پلاک ۴۲</span>
            </div>

            <img
              src="/contact-illustration.svg"
              alt="تماس با ما"
              className="w-full rounded-xl shadow-md mt-6 dark:opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
