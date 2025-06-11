import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { toast } from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

const MostSells = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products/best-sellers");
        setBestSellers(data);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
        toast.error("خطا در دریافت محصولات پرفروش");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      // افزودن به سبد خرید
      addToCart({
        id: product._id,
        title: product.title,
        price: product.finalPrice,
        image: product.images[0],
        quantity: 1
      });

      // به‌روزرسانی تعداد فروش
      await axios.put(`http://localhost:5000/api/products/${product._id}/sales`, {
        quantity: 1
      });

      toast.success("محصول به سبد خرید اضافه شد");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("خطا در افزودن به سبد خرید");
    }
  };

  if (isLoading) {
    return (
      <section className="bg-white dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            پرفروش‌ترینا! 🔥
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">محصولات محبوب مردم 😍</p>
        </div>
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          پرفروش‌ترینا! 🔥
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">محصولات محبوب مردم 😍</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {bestSellers.map((product) => (
          <Card
            key={product._id}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-gray-700 transition-shadow duration-300"
          >
            <img
              src={product.image ? product.image : '/default-image.png'}
              alt={product.title}
              className="h-40 w-full object-contain p-4 rounded-t-2xl bg-gray-50 dark:bg-gray-700"
            />
            <CardContent className="p-4 space-y-2 text-center">
              <h3 className="font-bold text-md text-gray-900 dark:text-white line-clamp-2">{product.title}</h3>
              <p className="text-primary font-bold text-lg">
                {product.finalPrice.toLocaleString()} تومان
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{product.description}</p>
              <p className="text-sm text-yellow-500 dark:text-yellow-400">
                ⭐ {product.rating.rate} ({product.rating.count})
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                تعداد فروش: {product.salesCount}
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full mt-2 w-full"
                onClick={() => handleAddToCart(product)}
              >
                افزودن به سبد خرید 🛒
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MostSells;

