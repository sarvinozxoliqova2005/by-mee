import React, { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { Heart, Plus, Minus, ArrowLeft } from "lucide-react";

const productsData = [
  { 
    id: 1, 
    name: "ЛАССИ", 
    volume: "500 мл", 
    price: 375, 
    image: "/lassi.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "йогурт, манго, мед, лед",
    proteins: "4.2г",
    fats: "2.1г",
    carbs: "18.5г",
    shelfLife: "24 часа",
    storage: "в холодильнике"
  },
  { 
    id: 2, 
    name: "МИКС", 
    volume: "500 мл", 
    price: 400, 
    image: "/miks.png", 
    bonus: "+20 б",
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "яблоко, апельсин, морковь",
    proteins: "1.1г",
    fats: "0.3г",
    carbs: "22.0г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 3, 
    name: "БОУЛ", 
    volume: "500 мл", 
    price: 450, 
    image: "/bouli.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "авокадо, шпинат, банан, киви",
    proteins: "5.0г",
    fats: "6.2г",
    carbs: "25.4г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 4, 
    name: "АПЕЛЬСИНОВЫЙ СОК", 
    volume: "500 мл", 
    price: 400, 
    image: "/apelsin.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "свежевыжатый апельсин 100%",
    proteins: "0.7г",
    fats: "0.2г",
    carbs: "11.5г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 5, 
    name: "СМУЗИ", 
    volume: "500 мл", 
    price: 385, 
    image: "/smuzi.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "клубника, банан, яблочный сок",
    proteins: "1.5г",
    fats: "0.4г",
    carbs: "21.0г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 6, 
    name: "ДЕТОКС", 
    volume: "500 мл", 
    price: 500, 
    image: "/detox.png", 
    bonus: "+50 б",
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "сельдерей, огурец, зеленые яблоки, лимон",
    proteins: "1.8г",
    fats: "0.2г",
    carbs: "9.5г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 7, 
    name: "ДОКТОР", 
    volume: "500 мл", 
    price: 375, 
    image: "/doktor.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "морковь, имбирь, яблоко",
    proteins: "1.0г",
    fats: "0.3г",
    carbs: "16.2г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 8, 
    name: "ГРАНАТОВЫЙ СОК", 
    volume: "500 мл", 
    price: 500, 
    image: "/anor.png", 
    bonus: "+20 б",
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "гранат 100%",
    proteins: "0.8г",
    fats: "0.1г",
    carbs: "14.2г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
  { 
    id: 9, 
    name: "ГРИН", 
    volume: "500 мл", 
    price: 450, 
    image: "/grin.png", 
    bonus: null,
    volumes: ["300 мл", "500 мл", "1 л"],
    ingredients: "сельдерей, яблоко, шпинат, спирулина, лед",
    proteins: "2.5г",
    fats: "0.4г",
    carbs: "12.0г",
    shelfLife: "12 часов",
    storage: "в холодильнике"
  },
];

export default function ProductPage({ onAddToCart: propAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVolume, setSelectedVolume] = useState("500 мл");
  const [isLiked, setIsLiked] = useState(false);

  const outletContext = useOutletContext() || {};
  const { cartItems = [], setCartItems } = outletContext;
  const onAddToCart = propAddToCart || outletContext.onAddToCart;

  const product = productsData.find((p) => p.id === Number(id)) || productsData[8];

  const cartItem = cartItems.find((ci) => ci.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const displayPrice = quantity > 0 ? product.price * quantity : product.price;

  const updateQuantity = (productId, delta) => {
    if (!setCartItems) return;
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  return (
    <main className="w-full bg-white text-[#1E1E1E] select-none pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex items-center justify-center  rounded-[28px] p-6 sm:p-10 relative min-h-[320px] sm:min-h-[380px]">
            {product.bonus && (
              <div className="absolute top-4 left-4 bg-[#FFD600] text-[#1E1E1E] font-bold text-xs px-3 py-1.5 rounded-full shadow-sm">
                {product.bonus}
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[280px] sm:max-h-[330px] object-contain"
            />
          </div>

          <div className="flex flex-col text-left">
            <h1 className="font-['Bahnschrift'] text-2xl sm:text-3xl md:text-[38px] uppercase tracking-wide font-normal mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-5 mb-5 text-sm sm:text-base font-semibold">
              {product.volumes?.map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  className={`cursor-pointer transition-colors pb-0.5 border-b-2 ${
                    selectedVolume === vol
                      ? "border-[#1E1E1E] text-[#1E1E1E]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {vol}
                </button>
              ))}
            </div>

            <div className="mb-3.5 text-xs sm:text-sm">
              <p className="font-bold text-[#1E1E1E]">Ингридиенты</p>
              <p className="text-gray-500 mt-0.5">{product.ingredients}</p>
            </div>

            <div className="mb-3.5 text-xs sm:text-sm">
              <p className="font-bold text-[#1E1E1E]">Пищевая ценность на 100г</p>
              <div className="text-gray-500 mt-0.5 flex flex-wrap gap-3">
                <span>Белки: {product.proteins}</span>
                <span>Жиры: {product.fats}</span>
                <span>Углеводы: {product.carbs}</span>
              </div>
            </div>

            <div className="mb-6 text-xs sm:text-sm">
              <p className="font-bold text-[#1E1E1E]">Срок хранения</p>
              <p className="text-gray-500 mt-0.5">{product.shelfLife}</p>
              <p className="font-bold text-[#1E1E1E] mt-2">Условия хранения</p>
              <p className="text-gray-500 mt-0.5">{product.storage}</p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center justify-between md:justify-start gap-4 w-full md:w-auto">
                <span className="font-['Bahnschrift'] font-bold text-2xl sm:text-3xl text-[#1E1E1E]">
                  {displayPrice}₽
                </span>

                <button
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  aria-label="В избранное"
                  className="p-2 sm:p-2.5 rounded-full border border-gray-200 hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-5 h-5 sm:w-5 sm:h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : "stroke-[1.8]"
                    }`}
                  />
                </button>
              </div>

              {quantity > 0 ? (
                <div className="flex items-center justify-center bg-gray-100 rounded-full px-5 py-2.5 gap-6 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, -1)}
                    className="text-gray-600 hover:text-black font-bold text-sm cursor-pointer"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="font-['Bahnschrift'] font-bold text-sm text-[#1E1E1E]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 1)}
                    className="text-gray-600 hover:text-black font-bold text-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart(product);
                    }
                  }}
                  className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm w-full max-w-[180px] py-2.5 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer text-center"
                >
                  В КОРЗИНУ
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E] mt-12" />
    </main>
  );
}