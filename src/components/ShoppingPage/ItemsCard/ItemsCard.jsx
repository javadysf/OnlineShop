import Image from 'next/image'
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cartStore";
import { toast } from "react-hot-toast";
import { useState } from "react";

const ItemsCard = ({product}) => {
  const [imageError, setImageError] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    try {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.finalPrice,
        image: product.images[0],
        quantity: 1
      });
      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("خطا در افزودن به سبد خرید");
    }
  };

  // برای دیباگ
  console.log('Product data:', {
    id: product._id,
    title: product.title,
    images: product.images
  });

  return (
    <div className="h-[480px] w-[350px] max-lg:w-[280px] group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl dark:shadow-gray-700 border border-gray-100 dark:border-gray-700 transition duration-300 overflow-hidden relative">
      {/* تصویر */}
      <div className="overflow-hidden rounded-t-2xl relative">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={250}
            className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              console.error('Image load error:', product.images[0]);
              setImageError(true);
              e.target.src = '/default-image.png';
            }}
            unoptimized // اضافه کردن این گزینه برای تست
          />
        ) : (
          <div className="w-full h-60 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500">تصویر موجود نیست</span>
          </div>
        )}
      </div>

      {/* محتوا */}
      <div className="p-4 flex flex-col justify-between h-[210px]">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-primary font-semibold text-lg">
            {product.finalPrice.toLocaleString()} تومان
          </span>
          <Link
            href={`/shop/${product._id}`}
            className="text-primary text-sm hover:underline transition"
          >
            مشاهده جزئیات
          </Link>
        </div>

        {/* دکمه */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 rounded-xl transition-all duration-200"
        >
          <ShoppingCart size={18} />
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}

export default ItemsCard;