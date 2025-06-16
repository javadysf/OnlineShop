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
          console.log('Attempting login...');
          const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
          const { token, ...user } = response.data;
          console.log('Login successful, token received');
          set({ 
            user,
            token,
            isLoading: false 
          });
          // تنظیم توکن در هدرهای پیش‌فرض axios و کوکی
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          Cookies.set('auth-token', token, { expires: 30 }); // ذخیره در کوکی برای 30 روز
          console.log('Token stored in cookies and state');
          return response.data;
        } catch (error) {
          console.error('Login failed:', error);
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
      initializeAuth: async () => {
        try {
          console.log('Checking auth state...');
          // اول از کوکی بخوان
          const cookieToken = Cookies.get('auth-token');
          console.log('Cookie token:', cookieToken);
          
          if (cookieToken) {
            console.log('Using cookie token');
            set({ token: cookieToken });
            axios.defaults.headers.common['Authorization'] = `Bearer ${cookieToken}`;
            try {
              const response = await axios.get('http://localhost:5000/api/auth/profile');
              console.log('Token is valid, user data:', response.data);
              set({ user: response.data });
              return;
            } catch (error) {
              console.error('Token validation failed:', error);
              throw error;
            }
          }

          // اگر در کوکی نبود، از localStorage بخوان
          const storedState = localStorage.getItem('auth-storage');
          console.log('Stored state:', storedState);
          
          if (storedState) {
            const { state } = JSON.parse(storedState);
            console.log('Parsed state:', state);
            
            if (state?.token) {
              console.log('Using stored token');
              set({ token: state.token });
              axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
              try {
                const response = await axios.get('http://localhost:5000/api/auth/profile');
                console.log('Token is valid, user data:', response.data);
                set({ user: response.data });
                return;
              } catch (error) {
                console.error('Token validation failed:', error);
                throw error;
              }
            }
          }

          // اگر به اینجا رسیدیم، یعنی توکن معتبری نداریم
          console.log('No valid token found');
          set({ user: null, token: null });
          delete axios.defaults.headers.common['Authorization'];
          Cookies.remove('auth-token');
          localStorage.removeItem('auth-storage');
        } catch (error) {
          console.error('Error initializing auth:', error);
          // در صورت خطا، همه چیز را پاک کن
          set({ user: null, token: null });
          delete axios.defaults.headers.common['Authorization'];
          Cookies.remove('auth-token');
          localStorage.removeItem('auth-storage');
          throw error;
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