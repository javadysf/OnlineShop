'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    birthDate: null
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, register, isLoading, error } = useAuthStore();
  const router = useRouter();

  const validateForm = () => {
    const errors = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) {
        errors.name = 'نام و نام خانوادگی الزامی است';
      }
      if (!formData.phone.trim()) {
        errors.phone = 'شماره موبایل الزامی است';
      } else if (!/^09[0-9]{9}$/.test(formData.phone)) {
        errors.phone = 'شماره موبایل معتبر نیست';
      }
      if (!formData.address.trim()) {
        errors.address = 'آدرس الزامی است';
      }
      if (!formData.birthDate) {
        errors.birthDate = 'تاریخ تولد الزامی است';
      } else {
        // بررسی سن کاربر (حداقل 13 سال)
        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
          errors.birthDate = 'سن شما باید حداقل 13 سال باشد';
        }
      }
    }

    if (!formData.email.trim()) {
      errors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'ایمیل معتبر نیست';
    }

    if (!formData.password) {
      errors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      errors.password = 'رمز عبور باید حداقل 6 کاراکتر باشد';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // پاک کردن خطای فیلد وقتی کاربر شروع به تایپ می‌کند
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      // تبدیل تاریخ شمسی به میلادی برای ذخیره در دیتابیس
      const gregorianDate = date.convert('gregorian').format('YYYY-MM-DD');
      setFormData(prev => ({ ...prev, birthDate: gregorianDate }));
    } else {
      setFormData(prev => ({ ...prev, birthDate: null }));
    }
    if (formErrors.birthDate) {
      setFormErrors(prev => ({ ...prev, birthDate: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login({ email: formData.email, password: formData.password });
        toast.success('ورود موفقیت‌آمیز');
        router.push('/');
      } else {
        await register(formData);
        toast.success('ثبت نام موفقیت‌آمیز');
        router.push('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'خطا در عملیات';
      toast.error(errorMessage);
      console.error('Auth Error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {isLogin ? 'ورود به حساب کاربری' : 'ثبت نام'}
        </h2>
        <p className="text-gray-600 mt-2">
          {isLogin ? 'خوش آمدید! لطفاً وارد شوید' : 'به جمع ما بپیوندید'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <div>
              <Input
                name="name"
                placeholder="نام و نام خانوادگی"
                value={formData.name}
                onChange={handleChange}
                className={`w-full ${formErrors.name ? 'border-red-500' : ''}`}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <Input
                name="phone"
                placeholder="شماره موبایل"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full ${formErrors.phone ? 'border-red-500' : ''}`}
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <Input
                name="address"
                placeholder="آدرس"
                value={formData.address}
                onChange={handleChange}
                className={`w-full ${formErrors.address ? 'border-red-500' : ''}`}
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
              )}
            </div>

            <div>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                onChange={handleDateChange}
                value={formData.birthDate}
                inputClass={`w-full p-2 border rounded-md ${formErrors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="تاریخ تولد"
                format="YYYY/MM/DD"
                maxDate={new Date()}
              />
              {formErrors.birthDate && (
                <p className="text-red-500 text-sm mt-1">{formErrors.birthDate}</p>
              )}
            </div>
          </>
        )}

        <div>
          <Input
            name="email"
            type="email"
            placeholder="ایمیل"
            value={formData.email}
            onChange={handleChange}
            className={`w-full ${formErrors.email ? 'border-red-500' : ''}`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="relative">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pr-10 ${formErrors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              در حال پردازش...
            </span>
          ) : (
            isLogin ? 'ورود' : 'ثبت نام'
          )}
        </Button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setFormErrors({});
            }}
            className="text-sky-600 hover:text-sky-700"
          >
            {isLogin ? 'حساب کاربری ندارید؟ ثبت نام کنید' : 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AuthForm; 