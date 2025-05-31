import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MostSells = ({products}) => {
    const bestSellers = [...products]
    .sort((a, b) => b.rating.count - a.rating.count)
    .slice(0, 4); // فقط ۴ تا پرفروش
  return (
    <section className="bg-gradient-to-br from-sky-100 via-yellow-50 to-sky-100 py-16 px-6">
    <div className="max-w-6xl mx-auto text-center mb-10">
      <h2 className="text-4xl md:text-5xl font-extrabold text-sky-700 drop-shadow">
        پرفروش‌ترینا! 🔥
      </h2>
      <p className="text-sky-600 mt-2 text-lg">محصولات محبوب مردم 😍</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
      {bestSellers.map((product) => (
        <Card
          key={product.id}
          className="rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 w-full object-contain p-4 rounded-t-2xl bg-yellow-50"
          />
          <CardContent className="p-4 space-y-2 text-center">
            <h3 className="font-bold text-md text-sky-700 line-clamp-2">{product.title}</h3>
            <p className="text-orange-500 font-bold text-lg">${product.price}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <p className="text-sm text-yellow-500">
              ⭐ {product.rating.rate} ({product.rating.count})
            </p>
            <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full mt-2">
              افزودن به سبد خرید 🛒
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
  )
}

export default MostSells

