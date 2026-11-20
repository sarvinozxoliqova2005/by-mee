import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Coins } from "lucide-react";

const BONUS_RATE = 0.1;
const DEFAULT_BONUS_POINTS = 165;

export default function SuccessfulPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  let savedOrder = null;
  try {
    const raw = localStorage.getItem("vita_juice_last_order");
    if (raw) {
      savedOrder = JSON.parse(raw);
    }
  } catch {
  }

  const paidAmount = Number(state.totalToPay ?? savedOrder?.totalToPay ?? 0);
  const earnedBonus =
    state.earnedBonus ??
    savedOrder?.earnedBonus ??
    (paidAmount > 0
      ? Math.max(1, Math.round(paidAmount * BONUS_RATE))
      : DEFAULT_BONUS_POINTS);

  return (
    <div className="w-full bg-white text-[#1E1E1E]">
      <div className="w-full bg-[#6FA352] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-5 sm:py-5 flex items-center justify-center sm:justify-between gap-4 sm:gap-6 font-['Bahnschrift'] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold opacity-60 hover:opacity-85 transition-opacity cursor-pointer"
          >
            КОРЗИНА
          </button>

          <button
            type="button"
            onClick={() => navigate("/registration")}
            className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold opacity-60 hover:opacity-85 transition-opacity cursor-pointer"
          >
            ОФОРМЛЕНИЕ
          </button>

          <span className="text-3xl sm:text-3xl md:text-4xl font-bold opacity-100">
            ОПЛАТА
          </span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-5 sm:pt-6 pb-3 sm:pb-4">
        <div className="pb-5 sm:pb-5 border-b-[3px] border-dashed border-[#1E1E1E] space-y-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <h1 className="font-['Bahnschrift'] font-bold text-xl sm:text-3xl md:text-[32px] uppercase tracking-wide text-[#1E1E1E] leading-tight">
              УСПЕШНЫЙ ЗАКАЗ
            </h1>

            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#6FA352] text-white inline-flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#1E1E1E] leading-snug max-w-[260px] sm:max-w-none">
            Ваш заказ успешно оформлен и будет доставлен
          </p>
        </div>

        <div className="py-5 sm:py-5 border-b-[3px] border-dashed border-[#1E1E1E] flex items-center justify-between gap-3 sm:gap-4">
          <span className="font-['Bahnschrift'] font-bold text-base sm:text-2xl uppercase tracking-wide text-[#1E1E1E] leading-snug max-w-[210px] sm:max-w-none">
            ЗА ЭТОТ ЗАКАЗ БУДЕТ НАЧИСЛЕНО
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <Coins className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1E1E] stroke-[1.75]" />
            <span className="font-['Bahnschrift'] font-normal text-lg sm:text-2xl text-[#1E1E1E] leading-none">
              {earnedBonus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}