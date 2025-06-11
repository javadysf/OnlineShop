import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // ثبت نام کاربر
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', userData);
          const { token, ...user } = response.data;
          set({ 
            user,
            token,
            isLoading: false 
          });
          // تنظیم توکن در هدرهای پیش‌فرض axios و کوکی
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          Cookies.set('auth-token', token, { expires: 30 }); // ذخیره در کوکی برای 30 روز
          return response.data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'خطا در ثبت نام',
            isLoading: false 
          });
          throw error;
        }
      },

      // ورود کاربر
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
          const { token, ...user } = response.data;
          set({ 
            user,
            token,
            isLoading: false 
          });
          // تنظیم توکن در هدرهای پیش‌فرض axios و کوکی
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          Cookies.set('auth-token', token, { expires: 30 }); // ذخیره در کوکی برای 30 روز
          return response.data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'خطا در ورود',
            isLoading: false 
          });
          throw error;
        }
      },

      // خروج کاربر
      logout: () => {
        set({ user: null, token: null });
        // حذف توکن از هدرهای پیش‌فرض axios و کوکی
        delete axios.defaults.headers.common['Authorization'];
        Cookies.remove('auth-token');
      },

      // دریافت اطلاعات کاربر
      getProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile');
          set({ 
            user: response.data,
            isLoading: false 
          });
          return response.data;
        } catch (error) {
          set({ 
            error: error.response?.data?.message || 'خطا در دریافت اطلاعات',
            isLoading: false 
          });
          throw error;
        }
      },

      // به‌روزرسانی اطلاعات کاربر
      updateUser: (updatedUser) => {
        set((state) => ({
          user: { ...state.user, ...updatedUser }
        }));
      },

      // بازیابی وضعیت احراز هویت
      initializeAuth: () => {
        const token = Cookies.get('auth-token');
        if (token) {
          set({ token });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token 
      })
    }
  )
);

export default useAuthStore; 