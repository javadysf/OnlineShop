"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "@/components/Profile/UserProfile";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('auth-token');
    if (!token) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
      return;
    }

    // بررسی اعتبار توکن
    const checkToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          // اگر توکن نامعتبر است، کاربر را به صفحه لاگین هدایت می‌کنیم
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("لطفا مجددا وارد حساب کاربری خود شوید");
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.error("خطا در بررسی اعتبار حساب کاربری");
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <UserProfile />
    </div>
  );
} 