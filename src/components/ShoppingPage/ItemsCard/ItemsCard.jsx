import Image from 'next/image'
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const ItemsCard = ({product}) => {
      return (
        <div className="h-[480px] w-[350px] max-lg:w-[280px] group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition duration-300 overflow-hidden relative">
        {/* تصویر */}
        <div className="overflow-hidden rounded-t-2xl">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={250}
            className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
  
        {/* محتوا */}
        <div className="p-4 flex flex-col justify-between h-[210px]">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-1">{product.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          </div>
  
          <div className="mt-4 flex items-center justify-between">
            <span className="text-green-600 font-semibold text-lg">{product.price} تومان</span>
            <Link
              href={`/shop/${product.id}`}
              className="text-blue-600 text-sm hover:underline transition"
            >
              مشاهده جزئیات
            </Link>
          </div>
  
          {/* دکمه */}
          <button
            // onClick={onAddToCart}
            className=" w-1/2 mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium  py-2 rounded-xl transition-all duration-200"
          >
            <ShoppingCart size={18} />
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    );
  }

export default ItemsCard