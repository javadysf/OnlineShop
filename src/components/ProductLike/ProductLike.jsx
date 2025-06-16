"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faHeart as faHeartRegular } from "@fortawesome/free-solid-svg-icons";

const ProductLike = ({ productId }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLikeStatus();
  }, [productId]);

  const checkLikeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/likes/check/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error("Error checking like status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("لطفا ابتدا وارد حساب کاربری خود شوید");
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        `http://localhost:5000/api/likes/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsLiked(!isLiked);
      toast.success(isLiked ? "محصول از علاقه‌مندی‌ها حذف شد" : "محصول به علاقه‌مندی‌ها اضافه شد");
    } catch (error) {
      toast.error("خطا در ثبت علاقه‌مندی");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="text-gray-400 cursor-not-allowed p-2 rounded-full hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faHeartRegular} className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleLike}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        isLiked ? "text-red-500" : "text-gray-400"
      }`}
      title={isLiked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
    >
      <FontAwesomeIcon
        icon={isLiked ? faHeartSolid : faHeartRegular}
        className="w-5 h-5"
      />
    </button>
  );
};

export default ProductLike; 