import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RotateCw } from "lucide-react";
import { Link} from "react-router-dom";


const INITIAL_ORDERS = [
  {
    id: "order-14-apr",
    dateLines: ["14", "апреля"],
    date: "14 апреля",
    total: 2345,
    isOpen: true,
    items: [
      { id: "sok-1", name: "Сок", price: 1000, quantity: 1 },
      { id: "sok-2", name: "Сок 2", price: 1005, quantity: 1 },
      { id: "batonchik-1", name: "Батончик", price: 340, quantity: 1 },
    ],
  },
  {
    id: "order-3-apr",
    dateLines: ["3", "апреля"],
    date: "3 апреля",
    total: 1500,
    isOpen: false,
    items: [
      { id: "sok-3", name: "Сок", price: 900, quantity: 1 },
      { id: "batonchik-2", name: "Батончик", price: 600, quantity: 1 },
    ],
  },
  {
    id: "order-6-mar",
    dateLines: ["6", "марта"],
    date: "6 марта",
    total: 3000,
    isOpen: false,
    items: [
      { id: "sok-4", name: "Сок", price: 1800, quantity: 1 },
      { id: "sok-5", name: "Сок 2", price: 1200, quantity: 1 },
    ],
  },
  {
    id: "order-25-feb",
    dateLines: ["25", "февраля"],
    date: "25 февраля",
    total: 2500,
    isOpen: false,
    items: [
      { id: "sok-6", name: "Сок", price: 1500, quantity: 1 },
      { id: "batonchik-3", name: "Батончик", price: 1000, quantity: 1 },
    ],
  },
  {
    id: "order-16-feb",
    dateLines: ["16", "февраля"],
    date: "16 февраля",
    total: 2340,
    isOpen: false,
    items: [
      { id: "sok-7", name: "Сок", price: 1200, quantity: 1 },
      { id: "batonchik-4", name: "Батончик", price: 1140, quantity: 1 },
    ],
  },
];

export default function HistoryPage({ onSelectTab, onLogout, onSave }) {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const setCartItems = outletContext.setCartItems;

  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [statusMessage, setStatusMessage] = useState("");

  const toggleComposition = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, isOpen: !order.isOpen } : order
      )
    );
  };

  const handleRepeatOrder = (order) => {
    if (typeof setCartItems === "function") {
      setCartItems((prevItems) => {
        const currentList = Array.isArray(prevItems) ? [...prevItems] : [];
        order.items.forEach((newItem) => {
          const existingIndex = currentList.findIndex(
            (item) => item.name === newItem.name && item.price === newItem.price
          );
          if (existingIndex > -1) {
            currentList[existingIndex] = {
              ...currentList[existingIndex],
              quantity:
                Number(currentList[existingIndex].quantity || 1) +
                Number(newItem.quantity || 1),
            };
          } else {
            currentList.push({ ...newItem });
          }
        });
        return currentList;
      });
    }
    navigate("/cart");
  };

  const handleTabClick = (tab) => {
    if (typeof onSelectTab === "function") {
      onSelectTab(tab);
      return;
    }
    if (tab === "profile") {
      navigate("/personal-area");
    } else if (tab === "balance") {
      navigate("/personal-area", { state: { tab: "balance" } });
    }
  };

  const handleSaveClick = () => {
    if (typeof onSave === "function") {
      onSave();
    }
    setStatusMessage("Изменения сохранены");
  };

  const handleLogoutClick = () => {
    if (typeof onLogout === "function") {
      onLogout();
      return;
    }
    try {
      localStorage.setItem("vita_juice_is_logged_in", "false");
    } catch {
      // ignore storage errors
    }
    navigate("/personal-area");
  };

  return (
    <div className="w-full bg-white text-[#1E1E1E]">
      {/* Yashil tablar paneli */}
      <div className="w-full bg-[#6FA352] text-white">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-10 py-3.5 sm:py-5 grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-between gap-2 sm:gap-8 font-['Bahnschrift'] uppercase tracking-wide sm:tracking-wider text-center sm:text-left">
          <button
            type="button"
            onClick={() => handleTabClick("profile")}
            className="text-sm sm:text-3xl md:text-[34px] font-bold leading-tight opacity-65 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="block sm:inline">ЛИЧНЫЙ</span>{" "}
            <span className="block sm:inline">КАБИНЕТ</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick("orders")}
            className="text-sm sm:text-3xl md:text-[34px] font-bold leading-tight opacity-100 cursor-pointer"
          >
            <span className="block sm:inline">ИСТОРИЯ</span>{" "}
            <span className="block sm:inline">ЗАКАЗОВ</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick("balance")}
            className="text-sm sm:text-3xl md:text-[34px] font-bold leading-tight opacity-65 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span className="block sm:inline">БАЛАНС</span>{" "}
            <span className="block sm:inline">300</span>
          </button>
        </div>
      </div>

      {/* Buyurtmalar ro'yxati */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-10">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b-[3px] border-dashed border-[#2B2B2B]"
          >
            {/* Asosiy buyurtma qatori */}
            <div className="py-3.5 sm:py-5 grid grid-cols-4 sm:grid-cols-12 items-center gap-1.5 sm:gap-4">
              {/* Sana */}
              <div className="col-span-1 sm:col-span-3 text-center sm:text-left font-['Bahnschrift'] text-xs sm:text-2xl leading-tight text-[#1E1E1E]">
                <span className="sm:hidden">
                  <span className="block">{order.dateLines[0]}</span>
                  <span className="block">{order.dateLines[1]}</span>
                </span>
                <span className="hidden sm:inline">{order.date}</span>
              </div>

              {/* Umumiy summa */}
              <div className="col-span-1 sm:col-span-3 text-center sm:text-left font-['Bahnschrift'] text-xs sm:text-2xl text-[#1E1E1E]">
                {order.total}₽
              </div>

              {/* "состав" tugmasi */}
              <div className="col-span-1 sm:col-span-3 flex items-center justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => toggleComposition(order.id)}
                  className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 font-['Bahnschrift'] text-xs sm:text-xl leading-tight text-[#1E1E1E] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  <span>состав</span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-200 ${
                      order.isOpen ? "rotate-0" : "rotate-180"
                    }`}
                    fill="none"
                    stroke="#1E1E1E"
                    strokeWidth="2.2"
                  >
                    <path
                      d="M10.3 4.5L3.2 16.8C2.5 18 3.4 19.5 4.8 19.5H19.2C20.6 19.5 21.5 18 20.8 16.8L13.7 4.5C13 3.3 11 3.3 10.3 4.5Z"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* "повтор" / "повторить" tugmasi */}
              <div className="col-span-1 sm:col-span-3 flex items-center justify-center sm:justify-end">
                <button
                  type="button"
                  onClick={() => handleRepeatOrder(order)}
                  className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 font-['Bahnschrift'] text-xs sm:text-xl leading-tight text-[#1E1E1E] hover:opacity-75 transition-opacity cursor-pointer"
                >
                  <span className="sm:hidden">повтор</span>
                  <span className="hidden sm:inline">повторить</span>
                  <RotateCw className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.2] text-[#1E1E1E]" />
                </button>
              </div>
            </div>

            {/* Ochiladigan mahsulotlar tarkibi */}
            {order.isOpen && (
              <div className="pb-3.5 sm:pb-5 grid grid-cols-4 sm:grid-cols-12 gap-1.5 sm:gap-4 font-['Bahnschrift'] text-xs sm:text-xl text-[#A8A8A8]">
                <div className="hidden sm:block sm:col-span-3" />

                <div className="col-start-2 col-span-1 sm:col-span-3 flex flex-col items-center sm:items-start gap-1">
                  {order.items.map((item) => (
                    <span key={`${order.id}-${item.id}-price`}>
                      {item.price}₽
                    </span>
                  ))}
                </div>

                <div className="col-span-2 sm:col-span-6 flex flex-col items-start gap-1 pl-2 sm:pl-0">
                  {order.items.map((item) => (
                    <span key={`${order.id}-${item.id}-name`}>
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Pastki СОХРАНИТЬ va ВЫЙТИ tugmalari */}
        <div className="py-7 sm:py-9 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-24 sm:pl-[25%]">
          <button
            type="button"
            onClick={handleSaveClick}
            className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm w-40 sm:w-auto px-8 py-2.5 sm:py-2 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            СОХРАНИТЬ
          </button>

          <button
            type="button"
            onClick={handleLogoutClick}
            className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm w-40 sm:w-auto px-9 py-2.5 sm:py-2 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer"
          >
            ВЫЙТИ
          </button>
        </div>

        {statusMessage && (
          <p className="pb-6 text-xs sm:text-sm font-medium text-[#6FA352] text-center sm:text-left sm:pl-[25%]">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}