import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full select-none">
      <div className="w-full bg-white text-[#1E1E1E] pt-8 md:pt-10 pb-6 md:pb-8">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12">
          <h2 className="font-['Bahnschrift'] font-normal text-[32px] sm:text-4xl md:text-[36px] uppercase tracking-wide mb-5 md:mb-6 text-center md:text-left leading-tight">
            ПРАВОВАЯ ИНФОРМАЦИЯ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-sm sm:text-base font-medium leading-relaxed text-center md:text-left">
            <div className="flex flex-col items-center md:items-start space-y-1">
              <p>Все права пренадлежат</p>
              <p>ООО «Компания Вита Джус»</p>
              <p>ИНН 12456789/ОГРН123456789833</p>
            </div>

            <div className="flex flex-col items-center md:items-start justify-between space-y-3 md:space-y-4">
              <Link
                to="/offer"
                className="hover:text-[#779A4B] transition-colors w-fit"
              >
                Публичная оферта
              </Link>
              <Link
                to="/privacy"
                className="hover:text-[#779A4B] transition-colors w-fit"
              >
                Политика конфиденциальности
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start justify-between space-y-3 md:space-y-4">
              <Link
                to="/terms"
                className="hover:text-[#779A4B] transition-colors w-fit"
              >
                Пользовательское соглашение
              </Link>
              <Link
                to="/bonus-program"
                className="hover:text-[#779A4B] transition-colors w-fit"
              >
                Бонусная программа
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t-[4px] border-dashed border-[#1E1E1E] mt-5" />

      <div className="w-full bg-[#779A4B] text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 py-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-5">
          <h3 className="font-['Bahnschrift'] font-normal text-[28px] sm:text-3xl md:text-[42px] uppercase tracking-wide text-center md:text-left leading-tight">
            ПРИСОЕДИНЯЙТЕСЬ <br className="block sm:hidden" /> К VITA JUICE
          </h3>

          <div className="flex items-center justify-center gap-5 sm:gap-4 shrink-0">
            <a
              href="https://vk.com"
              target="_blank"
              rel="noreferrer"
              aria-label="VKontakte"
              className="w-12 h-12 sm:w-12 sm:h-12 bg-white rounded-2xl sm:rounded-xl flex items-center justify-center text-[#779A4B] hover:scale-105 transition-transform shadow-sm"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z" />
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 sm:w-12 sm:h-12 bg-white rounded-2xl sm:rounded-xl flex items-center justify-center text-[#779A4B] hover:scale-105 transition-transform shadow-sm"
            >
              <svg
                className="w-7 h-7 stroke-current"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 sm:w-12 sm:h-12 bg-white rounded-2xl sm:rounded-xl flex items-center justify-center text-[#779A4B] hover:scale-105 transition-transform shadow-sm"
            >
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
