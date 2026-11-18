import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartDropdown({ isOpen, onClose, cartItems = [], setCartItems }) {
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

  if (!isOpen) return null;

  return (
    <>
      {/* Orqa fon blur effekti 100% ishlashi uchun style ishlatildi */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      <div className="absolute right-0 sm:right-4 md:right-12 top-full mt-3 w-[340px] sm:w-[380px] bg-white rounded-[24px] shadow-2xl border border-gray-100 z-50 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
        
        <div className="max-h-[360px] overflow-y-auto px-5 py-4 flex flex-col divide-y divide-gray-100">
          {cartItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500 font-['Bahnschrift']">ВАША КОРЗИНА ПУСТА</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3">
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

                  <p className="text-[11px] text-gray-500 mt-0.5">{item.volume}</p>
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
  );
}