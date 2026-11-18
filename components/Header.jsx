import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MapPin, ChevronDown, ShoppingCart, Sun, Menu, X, Trash2, Plus, Minus } from "lucide-react";

const categories = [
  { name: "СОКИ", path: "/soki" },
  { name: "МИКСЫ", path: "/miksy" },
  { name: "СМУЗИ", path: "/smuzi" },
  { name: "ЛАССИ", path: "/lassi" },
  { name: "ДЕТОКС", path: "/detoks" },
  { name: "БОУЛЫ", path: "/bouly" },
  { name: "САЛАТЫ", path: "/salaty" },
  { name: "ЗДОРОВАЯ ЕДА", path: "/zdorovaya-eda" },
];

const infoLinks = [
  { name: "О НАС", path: "/about" },
  { name: "ФРАНШИЗА", path: "/franchise" },
  { name: "КОНТАКТЫ", path: "/contacts" },
  { name: "РАБОТА", path: "/jobs" },
];

const regions = [
  "Волгоград",
  "Воронеж",
  "Екатеринбург",
  "Казань",
  "Красноярск",
  "Москва",
  "Нижний Новгород",
  "Новосибирск",
  "Пенза",
  "Самара",
  "Санкт-Петербург",
  "Уфа",
];

export default function Header({ cartItems = [], setCartItems }) {
  const [selectedRegion, setSelectedRegion] = useState("ВАШ РЕГИОН");
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

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

  const removeItem = (id) => {
    if (!setCartItems) return;
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (isRegionModalOpen || isLoginModalOpen || isCartOpen) {
        setIsHeaderVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY <= 80) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
        setActiveMobileMenu(null);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isRegionModalOpen, isLoginModalOpen, isCartOpen]);

  const handleSelectRegion = (region) => {
    setSelectedRegion(region.toUpperCase());
    setIsRegionModalOpen(false);
  };

  const toggleMobileMenu = (menuType) => {
    setActiveMobileMenu((prev) => (prev === menuType ? null : menuType));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;
    setIsLoginModalOpen(false);
    setUserName("");
    setUserPhone("");
  };

  return (
    <>
      <header
        className={`sticky top-0 w-full bg-white text-[#1E1E1E] select-none z-40 transition-all duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "shadow-md" : ""}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-3 md:pt-4 pb-3 flex items-center lg:items-start justify-between gap-3 sm:gap-6">
          <div className="relative z-20 shrink-0 lg:-mb-10 flex items-center">
            <Link
              to="/"
              className="hidden lg:flex w-28 h-28 rounded-full bg-white border-2 border-[#1E1E1E] flex-col items-center justify-center p-2 shadow-sm hover:scale-105 transition-transform"
            >
              <span className="text-[9px] font-medium tracking-tight text-gray-700 -mb-1">
                since 2007
              </span>
              <div className="text-center leading-none font-black tracking-tighter text-2xl">
                <span className="block">vita</span>
                <span className="block">Juice</span>
              </div>
            </Link>

            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => toggleMobileMenu("burger")}
                className="p-1 cursor-pointer hover:opacity-75 transition-opacity"
                aria-label="Навигация"
              >
                {activeMobileMenu === "burger" ? (
                  <X className="w-7 h-7 stroke-[2.2] text-[#1E1E1E]" />
                ) : (
                  <Menu className="w-7 h-7 stroke-[2.2] text-[#1E1E1E]" />
                )}
              </button>

              <button
                onClick={() => toggleMobileMenu("catalog")}
                className={`font-['Bahnschrift'] font-bold text-xl tracking-wide cursor-pointer py-1 transition-colors ${
                  activeMobileMenu === "catalog"
                    ? "text-orange-600"
                    : "text-[#1E1E1E]"
                }`}
              >
                МЕНЮ
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2.5 md:gap-4">
            <div className="flex items-center justify-between text-xs md:text-sm font-semibold tracking-wide relative gap-2">
              <div className="relative min-w-0">
                <button
                  onClick={() => setIsRegionModalOpen(true)}
                  className="flex items-center gap-1 sm:gap-1.5 hover:opacity-75 transition-opacity cursor-pointer py-1"
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8] text-[#1E1E1E] shrink-0" />
                  <span className="max-w-[110px] sm:max-w-[180px] truncate text-xs md:text-sm uppercase">
                    {selectedRegion}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 stroke-[1.8] shrink-0 transition-transform duration-300 ${isRegionModalOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 md:gap-10 shrink-0">
                {/* RESPONSIVE KORZINA VA DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    <span className="hidden sm:inline">
                      КОРЗИНА ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </span>
                    <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
                  </button>

                  {isCartOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/30"
                        style={{ backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}
                        onClick={() => setIsCartOpen(false)}
                      />
                      {/* Mobil qurilmalarda ekranni to'ldirib, planshet/kompyuterda o'ng tomonga joylashadigan responsive dizayn */}
                      <div className="absolute right-[-30px] sm:right-0 top-full mt-3 w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px] bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-[360px] overflow-y-auto px-4 sm:px-5 py-4 flex flex-col divide-y divide-gray-100">
                          {cartItems.length === 0 ? (
                            <p className="py-8 text-center text-sm text-gray-500 font-['Bahnschrift']">
                              ВАША КОРЗИНА ПУСТА
                            </p>
                          ) : (
                            cartItems.map((item) => (
                              <div
                                key={item.id}
                                className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-14 object-contain shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-1">
                                    <h4 className="font-['Bahnschrift'] font-bold text-sm uppercase text-[#1E1E1E] truncate">
                                      {item.name}
                                    </h4>
                                    <button
                                      onClick={() => removeItem(item.id)}
                                      className="text-gray-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                                      title="Удалить"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <p className="text-[11px] text-gray-500 mt-0.5">
                                    {item.volume}
                                  </p>
                                  {item.description && (
                                    <p className="text-[10px] text-gray-400 leading-tight line-clamp-1 mt-0.5">
                                      {item.description}
                                    </p>
                                  )}

                                  <div className="flex items-center justify-between mt-2.5">
                                    <div className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 gap-2.5">
                                      <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        className="text-gray-600 hover:text-black font-bold text-xs cursor-pointer"
                                      >
                                        <Minus className="w-3 h-3 stroke-[2.5]" />
                                      </button>
                                      <span className="font-['Bahnschrift'] font-bold text-xs text-[#1E1E1E]">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        className="text-gray-600 hover:text-black font-bold text-xs cursor-pointer"
                                      >
                                        <Plus className="w-3 h-3 stroke-[2.5]" />
                                      </button>
                                    </div>

                                    <span className="font-['Bahnschrift'] font-bold text-sm text-[#1E1E1E]">
                                      {item.price * item.quantity}₽
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}

                          <div className="py-3 flex items-center justify-between text-xs font-['Bahnschrift'] font-medium text-[#1E1E1E]">
                            <div className="flex items-center gap-2">
                              <span>БУТЫЛОЧКА</span>
                              <Trash2 className="w-3 h-3 text-gray-400 cursor-pointer hover:text-red-500" />
                            </div>
                            <span>0₽</span>
                          </div>
                        </div>

                        <div className="bg-[#FFD600] px-5 py-3.5 flex items-center justify-between">
                          <span className="font-['Bahnschrift'] font-bold text-sm sm:text-base uppercase tracking-wide text-[#1E1E1E]">
                            СУММА ЗАКАЗА
                          </span>
                          <span className="font-['Bahnschrift'] font-bold text-base sm:text-lg text-[#1E1E1E]">
                            {totalPrice}₽
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 sm:gap-2 hover:opacity-75 transition-opacity cursor-pointer uppercase"
                >
                  <span className="hidden sm:inline">ВОЙТИ</span>
                  <Sun className="w-5 h-5 stroke-[1.8]" />
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-y-3 pt-1">
              <nav className="flex items-center gap-5 md:gap-7 overflow-x-auto no-scrollbar pb-1">
                {categories.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `group shrink-0 flex flex-col items-center gap-1.5 text-xs md:text-[13px] font-bold tracking-wide transition-colors ${
                        isActive
                          ? "text-[#FFD600]"
                          : "text-[#1E1E1E] hover:text-orange-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="whitespace-nowrap">{item.name}</span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full transition-colors ${
                            isActive
                              ? "bg-[#FFD600]"
                              : "bg-[#D9D9D9] group-hover:bg-orange-500"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              <nav className="flex items-center gap-6 text-xs md:text-[13px] font-bold tracking-wide pb-5 shrink-0">
                {infoLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive
                          ? "text-orange-600"
                          : "text-[#1E1E1E] hover:text-orange-600"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden bg-white transition-all duration-300 ease-in-out ${
            activeMobileMenu === "burger"
              ? "max-h-72 border-t border-gray-100 py-5 px-4 shadow-xl opacity-100"
              : "max-h-0 py-0 px-4 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2.5">
            {infoLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setActiveMobileMenu(null)}
                className={({ isActive }) =>
                  `py-2.5 px-4 rounded-xl font-bold text-sm transition-colors ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "bg-gray-50 hover:bg-orange-50 hover:text-orange-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden bg-white transition-all duration-300 ease-in-out ${
            activeMobileMenu === "catalog"
              ? "max-h-96 border-t border-gray-100 py-5 px-4 shadow-xl opacity-100"
              : "max-h-0 py-0 px-4 opacity-0"
          }`}
        >
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setActiveMobileMenu(null)}
                className={({ isActive }) =>
                  `py-2.5 px-3.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[#FFD600]/20 text-[#1E1E1E]"
                      : "bg-gray-50 hover:bg-orange-50 hover:text-orange-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? "bg-[#FFD600]" : "bg-[#D9D9D9]"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E]" />
      </header>

      {/* RESPONSIVE REGION MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-[1px] px-4 select-none transition-all duration-300 ease-out ${
          isRegionModalOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        onClick={() => setIsRegionModalOpen(false)}
      >
        <div
          className={`w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl text-[#1E1E1E] transition-all duration-300 ease-out ${
            isRegionModalOpen
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-95 translate-y-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#FFD600] px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-10">
            <h3 className="font-['Bahnschrift'] font-normal text-xl sm:text-2xl uppercase tracking-wide">
              ВАШ РЕГИОН
            </h3>
            <button
              onClick={() => setIsRegionModalOpen(false)}
              aria-label="Закрыть"
              className="p-1 hover:rotate-90 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          <div className="px-6 sm:px-8 py-6 sm:py-7">
            <p className="font-['Bahnschrift'] text-lg sm:text-xl uppercase tracking-wide mb-3">
              ВАШ ГОРОД КРАСНОЯРСК?
            </p>

            <button
              onClick={() => handleSelectRegion("Красноярск")}
              className="bg-[#FFD600] hover:bg-[#f5cc00] text-[#1E1E1E] font-['Bahnschrift'] font-bold text-sm sm:text-base px-8 py-1.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer mb-6"
            >
              ДА
            </button>

            <p className="font-['Bahnschrift'] text-base sm:text-lg uppercase tracking-wide mb-4">
              НЕТ ВЫБРАТЬ ИЗ СПИСКА
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-sm sm:text-base font-medium">
              {regions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSelectRegion(city)}
                  className={`text-left hover:text-[#779A4B] transition-colors cursor-pointer ${
                    selectedRegion === city.toUpperCase()
                      ? "font-bold text-[#779A4B]"
                      : "text-[#1E1E1E]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE LOGIN MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-[1px] px-4 select-none transition-all duration-300 ease-out ${
          isLoginModalOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        onClick={() => setIsLoginModalOpen(false)}
      >
        <div
          className={`w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-2xl text-[#1E1E1E] transition-all duration-300 ease-out ${
            isLoginModalOpen
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-95 translate-y-4 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#FFD600] px-6 sm:px-9 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-10">
            <h3 className="font-['Bahnschrift'] font-normal text-xl sm:text-2xl uppercase tracking-wide">
              ВХОД НА САЙТ
            </h3>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              aria-label="Закрыть"
              className="p-1 hover:rotate-90 hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2]" />
            </button>
          </div>

          <form
            onSubmit={handleLoginSubmit}
            className="px-6 sm:px-9 py-7 sm:py-8 flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-6">
              <label className="font-['Bahnschrift'] text-lg sm:text-xl text-[#1E1E1E] shrink-0 sm:w-[130px]">
                Имя
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full bg-transparent border-b-[4px] border-dashed border-[#1E1E1E] focus:outline-none focus:border-[#779A4B] py-1 text-base sm:text-lg font-medium transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-6">
              <label className="font-['Bahnschrift'] text-lg sm:text-xl text-[#1E1E1E] shrink-0 sm:w-[130px]">
                Телефон
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                required
                className="w-full bg-transparent border-b-[4px] border-dashed border-[#1E1E1E] focus:outline-none focus:border-[#779A4B] py-1 text-base sm:text-lg font-medium transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6 mt-1">
              <span className="font-['Bahnschrift'] text-lg sm:text-xl text-[#1E1E1E] shrink-0 sm:w-[130px]">
                Выслать код
              </span>

              <div className="w-full flex flex-col items-start gap-4">
                <p className="text-[10px] sm:text-[11px] text-[#1E1E1E]/85 leading-snug">
                  Продолжая Вы соглашаетесь с пользовательским соглашением и
                  политикой обработки персональных данных
                </p>

                <button
                  type="submit"
                  aria-label="Отправить код"
                  className="bg-[#FFD600] hover:bg-[#f5cc00] text-[#1E1E1E] w-24 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-all cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-current ml-0.5"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}