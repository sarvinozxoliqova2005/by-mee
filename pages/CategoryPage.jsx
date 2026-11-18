import React, { useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { Heart, Plus, Minus } from "lucide-react";

const categoryTitles = {
  soki: "СОКИ",
  miksy: "МИКСЫ",
  smuzi: "СМУЗИ",
  lassi: "ЛАССИ",
  detoks: "ДЕТОКС",
  bouly: "БОУЛЫ",
  salaty: "САЛАТЫ",
  "zdorovaya-eda": "ЗДОРОВАЯ ЕДА",
};

const productsData = [
  { id: 1, name: "ЛАССИ", volume: "500 мл", price: 375, image: "/lassi.png", bonus: null },
  { id: 2, name: "МИКС", volume: "500 мл", price: 400, image: "/miks.png", bonus: "+20 б" },
  { id: 3, name: "БОУЛ", volume: "500 мл", price: 450, image: "/bouli.png", bonus: null },
  { id: 4, name: "АПЕЛЬСИНОВЫЙ СОК", volume: "500 мл", price: 400, image: "/apelsin.png", bonus: null },
  { id: 5, name: "СМУЗИ", volume: "500 мл", price: 385, image: "/smuzi.png", bonus: null },
  { id: 6, name: "ДЕТОКС", volume: "500 мл", price: 500, image: "/detox.png", bonus: "+50 б" },
  { id: 7, name: "ДОКТОР", volume: "500 мл", price: 375, image: "/doktor.png", bonus: null },
  { id: 8, name: "ГРАНАТОВЫЙ СОК", volume: "500 мл", price: 500, image: "/anor.png", bonus: "+20 б" },
  { id: 9, name: "ГРИН", volume: "500 мл", price: 450, image: "/grin.png", bonus: null },
  { id: 10, name: "ЛАССИ", volume: "500 мл", price: 375, image: "/lassi.png", bonus: null },
  { id: 1, name: "МИКС", volume: "500 мл", price: 400, image: "/miks.png", bonus: "+20 б" },
  { id: 12, name: "БОУЛ", volume: "500 мл", price: 450, image: "/bouli.png", bonus: null },
];

export default function CategoryPage({ onAddToCart: propAddToCart }) {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [likedIds, setLikedIds] = useState([]);
  
  const outletContext = useOutletContext() || {};
  const { cartItems = [], setCartItems } = outletContext;
  const onAddToCart = propAddToCart || outletContext.onAddToCart;

  const title = categoryTitles[categorySlug] || "СОКИ";

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const updateQuantity = (id, delta) => {
    if (!setCartItems) return;
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  return (
    <main className="w-full bg-white text-[#1E1E1E] select-none">
      <div className="w-full bg-[#779A4B] py-5 sm:py-7 md:py-8 text-center">
        <h1 className="font-['Bahnschrift'] font-normal text-3xl sm:text-4xl md:text-[52px] text-white uppercase tracking-wider leading-none">
          {title}
        </h1>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 sm:gap-y-16">
          {productsData.map((product) => {
            const isLiked = likedIds.includes(product.id);
            const cartItem = cartItems.find((ci) => ci.id === product.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            const displayPrice = quantity > 0 ? product.price * quantity : product.price;

            return (
              <div
                key={product.id}
                className="flex flex-col items-center text-center group"
              >
                {/* Rasmga bosganda ProductPage sahifasiga o'tadi */}
                <div 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center mb-3 cursor-pointer"
                >
                  {product.bonus && (
                    <div className="absolute top-1 right-4 sm:right-6 z-10 w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#FFD600] flex flex-col items-center justify-center shadow-sm rotate-6">
                      <span className="font-['Bahnschrift'] font-bold text-xs sm:text-[13px] text-[#1E1E1E] leading-none">
                        {product.bonus}
                      </span>
                      <span className="text-[8px] font-bold text-[#1E1E1E]/80 mt-0.5">
                        бонус
                      </span>
                    </div>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Nomiga bosganda ham ProductPage sahifasiga o'tadi */}
                <h3 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="font-['Bahnschrift'] text-lg sm:text-[21px] uppercase tracking-wide text-[#1E1E1E] leading-tight cursor-pointer hover:text-[#779A4B] transition-colors"
                >
                  {product.name}
                </h3>

                <span className="text-xs sm:text-[13px] text-gray-500 mt-0.5 mb-2">
                  {product.volume}
                </span>

                <div className="flex items-center justify-center gap-2.5 mb-3">
                  <span className="font-['Bahnschrift'] font-bold text-lg sm:text-[20px] text-[#1E1E1E]">
                    {displayPrice}₽
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleLike(product.id)}
                    aria-label="В избранное"
                    className="cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.8] transition-colors ${
                        isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-[#1E1E1E] hover:text-red-500"
                      }`}
                    />
                  </button>
                </div>

                {quantity > 0 ? (
                  <div className="flex items-center justify-center bg-gray-100 rounded-full px-4 py-2 gap-4 w-full max-w-[170px]">
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
                    className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-[13px] px-7 py-2 rounded-full uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                  >
                    В КОРЗИНУ
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E]" />
    </main>
  );
}