import React from "react";
import { Smartphone, Gift, Coffee } from "lucide-react";
import { Link } from 'react-router-dom';

export default function LoyaltySystem() {
  return (
    <section className="w-full bg-white py-10 md:py-12 select-none overflow-hidden">
      {/* Sarlavha */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-5 text-center mb-6 md:mb-8">
        <h2 className="font-['Bahnschrift'] font-normal text-[36px] sm:text-[52px] md:text-[80px] leading-[1.05] uppercase text-[#1E1E1E] tracking-wide">
          НАША СИСТЕМА ЛОЯЛЬНОСТИ
        </h2>
      </div>

      <div className="w-full border-t-[4px] border-dashed border-[#1E1E1E] mb-10 md:mb-16" />

      {/* Asosiy kontent */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Chap tomon: Sodiqlik kartasi */}
        <div className="w-full lg:w-[45%] flex justify-center">
          <div className="w-full max-w-[360px] sm:max-w-[400px] min-h-[520px] sm:h-[600px] bg-[#779A4B] rounded-[32px] p-5 sm:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between border border-white/10">
            
            <div>
              {/* Karta yuqori qismi (Logo va Balans) */}
              <div className="flex items-start justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative z-20 shrink-0">
                    <Link
                      to="/"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-[#1E1E1E] flex flex-col items-center justify-center p-1.5 shadow-sm hover:scale-105 transition-transform"
                    >
                      <span className="text-[6px] sm:text-[7px] font-medium tracking-tight text-gray-700 -mb-0.5">
                        since 2007
                      </span>
                      <div className="text-center leading-none font-black tracking-tighter text-sm sm:text-base">
                        <span className="block">vita</span>
                        <span className="block">Juice</span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-white/70 text-[10px] sm:text-xs uppercase tracking-wider block">
                    БАЛАНС
                  </span>
                  <span className="text-white font-['Bahnschrift'] text-xl sm:text-2xl font-bold">
                    500
                  </span>
                </div>
              </div>

              {/* Ichidagi rasm (rasm1.jpg) */}
              <div className="bg-white rounded-xl relative overflow-hidden h-36 sm:h-44">
                <img
                  className="w-full h-full object-cover"
                  src="rasm1.jpg"
                  alt="Напитки Вита Джус"
                />
              </div>

              {/* Karta egasi */}
              <div className="mt-3 sm:mt-4">
                <span className="text-white/70 text-[10px] uppercase tracking-wider block">
                  ВЛАДЕЛЕЦ
                </span>
                <span className="text-white font-medium text-sm sm:text-base">
                  Имя Фамилия
                </span>
              </div>
            </div>

            {/* Shtrix-kod qismi */}
            <div className="mt-6 sm:mt-8 bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-inner">
              <div className="w-full h-[65px] sm:h-[80px] flex items-center justify-center overflow-hidden select-none">
                <img
                  src="cod.png"
                  alt="Штрих-код"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>

        {/* O'ng tomon: Afzalliklar va Tugma */}
        <div className="w-full lg:w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left gap-8 sm:gap-10">
          <h3 className="font-['Bahnschrift'] text-[#1E1E1E] text-2xl sm:text-3xl md:text-[40px] uppercase tracking-wide leading-tight">
            С КАРТОЙ ВЫ ПОЛУЧАЕТЕ
          </h3>

          <div className="flex flex-col gap-6 sm:gap-7 w-full max-w-[450px] lg:max-w-none">
            {/* 1-band */}
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5">
              <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-[#779A4B] flex items-center justify-center text-white shrink-0 shadow-md">
                <Smartphone className="w-8 h-8 lg:w-7 lg:h-7 stroke-[1.8]" />
              </div>
              <span className="text-[#1E1E1E] text-base sm:text-lg md:text-xl font-medium max-w-[260px] lg:max-w-none">
                Всегда рядом в вашем телефоне
              </span>
            </div>

            {/* 2-band */}
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5">
              <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-[#779A4B] flex items-center justify-center text-white shrink-0 shadow-md">
                <Gift className="w-8 h-8 lg:w-7 lg:h-7 stroke-[1.8]" />
              </div>
              <span className="text-[#1E1E1E] text-base sm:text-lg md:text-xl font-medium max-w-[260px] lg:max-w-none">
                Участвуй в акциях и получай подарки
              </span>
            </div>

            {/* 3-band */}
            <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5">
              <div className="w-16 h-16 lg:w-14 lg:h-14 rounded-full bg-[#779A4B] flex items-center justify-center text-white shrink-0 shadow-md">
                <Coffee className="w-8 h-8 lg:w-7 lg:h-7 stroke-[1.8]" />
              </div>
              <span className="text-[#1E1E1E] text-base sm:text-lg md:text-xl font-medium max-w-[260px] lg:max-w-none">
                Каждый 5-й напиток бесплатно
              </span>
            </div>
          </div>

          {/* Tugma qismi */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <span className="font-['Bahnschrift'] text-[#1E1E1E] text-2xl md:text-3xl uppercase tracking-wide">
              ХОТИТЕ ОФОРМИТЬ?
            </span>
            <button className="bg-[#FFD600] hover:bg-[#ffcc00] text-[#1E1E1E] font-['Bahnschrift'] font-bold text-base sm:text-lg px-10 sm:px-8 py-3.5 rounded-full shadow-md tracking-wider uppercase transition-all cursor-pointer">
              получить
            </button>
          </div>

        </div>

      </div>

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E] mt-12 md:mt-16" />
    </section>
  );
}