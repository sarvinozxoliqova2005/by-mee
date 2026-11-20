import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { Trash2, Info, Gift, Minus, Plus, RotateCcw } from "lucide-react";

const defaultItems = [
  {
    id: "pomegranate-300",
    name: "ГРАНАТОВЫЙ СОК",
    volume: "300 мл",
    ingredients: "гранат, лед",
    price: 575,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "green-500",
    name: "ГРИН",
    volume: "500 мл",
    ingredients: "сельдерей, яблоко, шпинат, спирулина, лед",
    price: 425,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=300&q=80",
  },
];

const BOTTLE_PRICE = 0; // Xohlasangiz, masalan 150 qilib qo'ysangiz, summaga qo'shiladi
const PROMO_CODE = "35L8K1";
const MIN_PROMO_SUM = 1500;
const PROMO_DISCOUNT = 0.15;

export default function CartPage() {
  const outletContext = useOutletContext() || {};
  const { cartItems, setCartItems } = outletContext;

  const [localItems, setLocalItems] = useState(defaultItems);
  const [hasBottle, setHasBottle] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoInfoOpen, setIsPromoInfoOpen] = useState(false);
  const [isPromoUsed, setIsPromoUsed] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [activeStep, setActiveStep] = useState("cart");

  const items = Array.isArray(cartItems) ? cartItems : localItems;

  const updateItems = (updater) => {
    if (typeof setCartItems === "function") {
      setCartItems(updater);
    } else {
      setLocalItems(updater);
    }
  };

  const handleQuantityChange = (id, delta) => {
    updateItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, (item.quantity || 1) + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    updateItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleBottle = () => {
    setHasBottle((prev) => !prev);
  };

  const itemsSubtotal = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleaned = promoCode.trim().toUpperCase();

    if (!cleaned) {
      setPromoMessage("Введите промокод");
      return;
    }

    if (cleaned !== PROMO_CODE) {
      setDiscount(0);
      setPromoMessage("Промокод не найден");
      return;
    }

    if (isPromoUsed) {
      setPromoMessage("Промокод уже был использован");
      return;
    }

    if (itemsSubtotal < MIN_PROMO_SUM) {
      setDiscount(0);
      setPromoMessage(
        `Промокод действует при заказе от ${MIN_PROMO_SUM} рублей`
      );
      return;
    }

    setDiscount(PROMO_DISCOUNT);
    setIsPromoUsed(true);
    setPromoMessage("Скидка 15% применена");
  };

  const bottleCost = hasBottle ? BOTTLE_PRICE : 0;
  const totalAmount = Math.max(
    0,
    Math.round(itemsSubtotal * (1 - discount)) + bottleCost
  );

  return (
    <div className="w-full bg-white text-[#1E1E1E]">
      {/* Bosqichlar paneli */}
      <div className="w-full bg-[#6FA352] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-center sm:justify-between gap-4 sm:gap-6 font-['Bahnschrift'] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveStep("cart")}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-opacity cursor-pointer ${
              activeStep === "cart" ? "opacity-100" : "opacity-65 hover:opacity-90"
            }`}
          >
            КОРЗИНА
          </button>

          <button
            type="button"
            onClick={() => setActiveStep("checkout")}
            className={`hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold transition-opacity cursor-pointer ${
              activeStep === "checkout"
                ? "opacity-100"
                : "opacity-65 hover:opacity-90"
            }`}
          >
            ОФОРМЛЕНИЕ
          </button>

          <button
            type="button"
            onClick={() => setActiveStep("payment")}
            className={`hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold transition-opacity cursor-pointer ${
              activeStep === "payment"
                ? "opacity-100"
                : "opacity-65 hover:opacity-90"
            }`}
          >
            ОПЛАТА
          </button>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {items.length === 0 ? (
          <div className="py-16 text-center space-y-5">
            <p className="font-['Bahnschrift'] text-xl sm:text-2xl uppercase text-gray-700">
              Ваша корзина пока пуста
            </p>
            <Link
              to="/"
              className="inline-block bg-[#FFD600] hover:bg-[#f5cc00] text-[#1E1E1E] font-['Bahnschrift'] font-bold text-sm px-8 py-3 rounded-full uppercase tracking-wider transition-colors"
            >
              Перейти в меню
            </Link>
          </div>
        ) : (
          <>
            {/* Mahsulotlar ro'yxati */}
            <div className="divide-y divide-dashed divide-[#1E1E1E] border-b border-dashed border-[#1E1E1E]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-5 sm:py-8 flex items-start sm:items-center justify-between gap-3 sm:gap-6"
                >
                  {/* Rasm + tafsilotlar + miqdor */}
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-8 flex-1 min-w-0">
                    <div className="w-20 h-24 sm:w-32 sm:h-36 shrink-0 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-1.5 min-w-0 flex-1">
                      <h2 className="font-['Bahnschrift'] font-bold text-base sm:text-xl uppercase tracking-wide text-[#1E1E1E] leading-snug">
                        {item.name}
                      </h2>
                      {item.volume && (
                        <p className="text-xs sm:text-sm text-[#1E1E1E] font-medium">
                          {item.volume}
                        </p>
                      )}
                      {item.ingredients && (
                        <p className="text-[11px] sm:text-sm text-gray-600 leading-snug">
                          {item.ingredients}
                        </p>
                      )}

                      {/* Miqdor boshqaruvi */}
                      <div className="pt-2">
                        <div className="inline-flex items-center justify-between bg-[#FFD600] rounded-full px-3 sm:px-3.5 py-1 gap-3 sm:gap-4 min-w-[88px] sm:min-w-[96px]">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            aria-label="Уменьшить количество"
                            className="text-[#1E1E1E] hover:opacity-75 transition-opacity cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <span className="font-['Bahnschrift'] font-bold text-xs sm:text-sm text-[#1E1E1E]">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            aria-label="Увеличить количество"
                            className="text-[#1E1E1E] hover:opacity-75 transition-opacity cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* O'ng ustun: o'chirish va narx */}
                  <div className="flex flex-col items-end justify-between self-stretch min-h-[96px] sm:min-h-[136px] shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Удалить товар"
                      className="p-1 text-[#1E1E1E] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                    </button>

                    <span className="font-['Bahnschrift'] font-bold text-base sm:text-2xl text-[#1E1E1E]">
                      {Number(item.price || 0) * Number(item.quantity || 1)}₽
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Promokod va ma'lumot bloki */}
            <form
              onSubmit={handleApplyPromo}
              className="py-6 sm:py-7 border-b border-dashed border-[#1E1E1E] flex flex-col items-center justify-center gap-3"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-2xl">
                <div className="relative w-full sm:w-[220px] border-b border-dashed border-[#1E1E1E] pb-1.5 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Промокод"
                    className="w-full bg-transparent text-center sm:text-left text-sm font-medium text-[#1E1E1E] placeholder:text-gray-400 focus:outline-none pr-2"
                  />

                  <button
                    type="button"
                    onClick={() => setIsPromoInfoOpen((prev) => !prev)}
                    aria-label="Информация о промокоде"
                    className="text-[#1E1E1E] hover:opacity-75 transition-opacity shrink-0 cursor-pointer"
                  >
                    <Info className="w-5 h-5 stroke-[1.8]" />
                  </button>
                </div>

                {isPromoInfoOpen && (
                  <p className="text-[11px] sm:text-xs text-[#1E1E1E] leading-snug max-w-xs text-center sm:text-left">
                    Введите промокод при оформлении заказа на сумму от 1500 рублей
                    и получите скидку 15%. Промокод можно использовать только 1 раз
                    во время проведения акции.
                  </p>
                )}

                <button
                  type="submit"
                  className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm w-full max-w-[210px] sm:w-auto px-6 py-2.5 sm:py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer shrink-0"
                >
                  ПРИМЕНИТЬ
                </button>
              </div>

              {promoMessage && (
                <p className="text-xs text-gray-600 text-center">
                  {promoMessage}
                </p>
              )}
            </form>

            {/* Ishlaydigan Butylochka qatori */}
            <div className="py-5 sm:py-6 border-b border-dashed border-[#1E1E1E] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-10 flex-wrap">
                <button
                  type="button"
                  onClick={handleToggleBottle}
                  className={`font-['Bahnschrift'] font-bold text-sm sm:text-lg uppercase tracking-wide cursor-pointer transition-colors ${
                    hasBottle
                      ? "text-[#1E1E1E] hover:opacity-75"
                      : "line-through text-gray-400 hover:text-gray-600"
                  }`}
                >
                  БУТЫЛОЧКА
                </button>

                <button
                  type="button"
                  onClick={handleToggleBottle}
                  aria-label="Переключить бутылочку"
                  title={hasBottle ? "Убрать бутылочку" : "Добавить бутылочку"}
                  className="p-1 text-[#1E1E1E] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  <Gift
                    className={`w-5 h-5 stroke-[1.8] ${
                      hasBottle ? "text-[#1E1E1E]" : "text-gray-300"
                    }`}
                  />
                </button>

                {!hasBottle && (
                  <button
                    type="button"
                    onClick={() => setHasBottle(true)}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-['Bahnschrift'] font-bold uppercase bg-[#FFD600] hover:bg-[#f5cc00] px-2.5 py-1 rounded-full text-[#1E1E1E] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Вернуть
                  </button>
                )}
              </div>

              <span
                className={`font-['Bahnschrift'] font-bold text-base sm:text-xl shrink-0 ${
                  hasBottle ? "text-[#1E1E1E]" : "text-gray-400"
                }`}
              >
                {bottleCost}₽
              </span>
            </div>

            {/* Buyurtma summasi va tugma */}
            <div className="pt-6 pb-2 space-y-7 sm:space-y-8">
              <div className="flex items-center justify-between gap-3">
                <span className="font-['Bahnschrift'] font-bold text-base sm:text-xl uppercase tracking-wide">
                  СУММА ЗАКАЗА
                </span>
                <span className="font-['Bahnschrift'] font-bold text-lg sm:text-2xl text-[#1E1E1E] shrink-0">
                  {totalAmount}₽
                </span>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setActiveStep("checkout")}
                  className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm w-full max-w-[210px] sm:w-auto px-9 py-2.5 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  ОФОРМИТЬ
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Huquqiy ma'lumotlar */}
      <div className="border-t border-dashed border-[#1E1E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-[#1E1E1E]">
          <div className="space-y-1">
            <p className="font-['Bahnschrift'] font-bold uppercase text-sm sm:text-base mb-2">
              ПРАВОВАЯ ИНФОРМАЦИЯ
            </p>
            <p>Все права принадлежат</p>
            <p>ООО «Компания Вита Джус»</p>
            <p>ИНН 12456789/ОГРН123456789833</p>
          </div>

          <div className="space-y-2 sm:pt-7">
            <Link to="/offer" className="block hover:underline">
              Публичная оферта
            </Link>
            <Link to="/privacy" className="block hover:underline">
              Политика конфиденциальности
            </Link>
          </div>

          <div className="space-y-2 sm:pt-7">
            <Link to="/agreement" className="block hover:underline">
              Пользовательское соглашение
            </Link>
            <Link to="/loyalty" className="block hover:underline">
              Бонусная программа
            </Link>
          </div>
        </div>
      </div>

      {/* Yashil footer banneri */}
      <div className="w-full bg-[#6FA352] text-white border-t border-dashed border-[#1E1E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Bahnschrift'] font-bold text-xl sm:text-3xl uppercase tracking-wide text-center sm:text-left">
            ПРИСОЕДИНЯЙТЕСЬ К VITA JUICE
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://vk.com"
              target="_blank"
              rel="noreferrer"
              aria-label="VK"
              className="w-9 h-9 rounded-lg bg-white text-[#6FA352] font-black text-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              VK
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-lg bg-white text-[#6FA352] font-black text-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              IG
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-lg bg-white text-[#6FA352] font-black text-sm flex items-center justify-center hover:scale-105 transition-transform"
            >
              f
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}