"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-100 to-yellow-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-8">تماس با ما</h1>

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
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <input
              placeholder="ایمیل شما"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <textarea
              placeholder="پیام شما"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-xl w-full">
              ارسال پیام
            </button>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <Phone className="text-sky-500" />
              <span>۰۹۱۲-۱۲۳-۴۵۶۷</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-sky-500" />
              <span>info@yourshop.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-sky-500" />
              <span>تهران، خیابان آزادی، پلاک ۴۲</span>
            </div>

            <img
              src="/contact-illustration.svg"
              alt="تماس با ما"
              className="w-full rounded-xl shadow-md mt-6"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
