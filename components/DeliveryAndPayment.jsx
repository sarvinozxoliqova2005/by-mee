import React from "react";
import { Wallet, CreditCard, Globe, Bike, Store } from "lucide-react";

export default function DeliveryAndPayment() {
  return (
    <section className="w-full bg-white select-none overflow-hidden">
      <div className="w-full py-5 md:py-7 text-center px-4">
        <h2 className="font-['Bahnschrift'] text-[30px] sm:text-[42px] md:text-[48px] lg:text-[56px] leading-none uppercase text-[#1E1E1E] tracking-wide">
          ДОСТАВКА И ОПЛАТА
        </h2>
      </div>

      <div className="border-t-[3px] border-dashed border-[#1E1E1E]" />

      <div className="relative w-full bg-gradient-to-b lg:bg-gradient-to-r from-[#779F58] via-[#8BA84B] to-[#F1D52F]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[49%_51%]">
          <div className="relative z-20 px-5 sm:px-8 md:px-10 lg:px-[38px] py-8 lg:py-6 flex flex-col gap-8 lg:gap-6">
            <div>
              <h3 className="font-['Bahnschrift'] text-white text-[22px] md:text-[25px] uppercase tracking-wide mb-4 sm:mb-3 text-center sm:text-left">
                ЗОНА ДОСТАВКИ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-3 mb-5 sm:mb-3">
                <div className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-[#FECF3D] shrink-0" />
                  <p className="text-white text-xs sm:text-[10px] md:text-[11px] text-center leading-tight">
                    Минимальная сумма
                    <br /> заказа 500 руб.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-[#FF8C00] shrink-0" />
                  <p className="text-white text-xs sm:text-[10px] md:text-[11px] text-center leading-tight">
                    Минимальная сумма
                    <br /> заказа 750 руб.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-[#FF69B4] shrink-0" />
                  <p className="text-white text-xs sm:text-[10px] md:text-[11px] text-center leading-tight">
                    Минимальная сумма
                    <br /> заказа 1000 руб.
                  </p>
                </div>
              </div>

              <div className="w-full h-[220px] sm:h-[205px] md:h-[230px] rounded-[25px] overflow-hidden bg-gray-200 shadow-sm">
                <iframe
                  title="Зона доставки"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143588.54298751508!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3b44d9f932b04c10!2sMoscow%2C%20Russia!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            <div>
              <h3 className="font-['Bahnschrift'] text-white text-[22px] md:text-[23px] uppercase tracking-wide mb-4 sm:mb-3 text-center sm:text-left">
                ВАРИАНТЫ ОПЛАТЫ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3">
                {[
                  {
                    icon: Wallet,
                    title: "НАЛИЧНЫМИ",
                    description: (
                      <>
                        Оплата наличными
                        <br />
                        курьеру или при
                        <br />
                        получении заказа
                      </>
                    ),
                  },
                  {
                    icon: CreditCard,
                    title: "КАРТОЙ",
                    description: (
                      <>
                        Оплата банковской картой
                        <br />
                        курьеру при получении
                        <br />
                        заказа
                      </>
                    ),
                  },
                  {
                    icon: Globe,
                    title: "ОНЛАЙН-ОПЛАТА",
                    description: (
                      <>
                        Безопасная и удобная
                        <br />
                        оплата заказа на сайте
                      </>
                    ),
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#779A4B] mb-2 shadow-sm">
                        <Icon className="w-5 h-5 stroke-[1.6]" />
                      </div>

                      <h4 className="font-['Bahnschrift'] text-white text-sm sm:text-[12px] md:text-[13px] uppercase mb-1">
                        {item.title}
                      </h4>

                      <p className="text-white/95 text-xs sm:text-[10px] leading-tight">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-['Bahnschrift'] text-white text-[22px] md:text-[23px] uppercase tracking-wide mb-4 sm:mb-3 text-center sm:text-left">
                СПОСОБЫ ДОСТАВКИ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:max-w-[340px]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#779A4B] mb-2 shadow-sm">
                    <Bike className="w-5 h-5 stroke-[1.6]" />
                  </div>

                  <h4 className="font-['Bahnschrift'] text-white text-sm sm:text-[12px] uppercase mb-1">
                    КУРЬЕРОМ
                  </h4>

                  <p className="text-white/95 text-xs sm:text-[10px] leading-tight">
                    Вы оплачиваете только
                    <br /> заказ, доставка —
                    <br /> бесплатно
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#779A4B] mb-2 shadow-sm">
                    <Store className="w-5 h-5 stroke-[1.6]" />
                  </div>

                  <h4 className="font-['Bahnschrift'] text-white text-sm sm:text-[12px] uppercase mb-1">
                    САМОВЫВОЗ
                  </h4>

                  <p className="text-white/95 text-xs sm:text-[10px] leading-tight">
                    Можете сами забрать
                    <br /> заказ, указав это при
                    <br /> оформлении заказа.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative min-h-full overflow-hidden">
            <div className="absolute top-[5%] left-[8%] z-20 w-[230px] -rotate-[35deg]">
              <div className="relative">
                <svg
                  viewBox="0 0 280 170"
                  className="w-full h-auto fill-white drop-shadow-sm"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M55 125 C25 125, 10 100, 25 75 C15 50, 40 20, 75 28 C95 10, 145 10, 165 28 C200 18, 240 35, 245 65 C270 80, 265 115, 235 125 C245 135, 255 148, 265 155 C245 152, 225 142, 212 132 C180 148, 90 148, 55 125 Z" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-center pb-2">
                  <span className="font-['Bahnschrift'] font-bold text-[#779A4B] text-[24px] uppercase leading-tight">
                    БЫСТРО И
                    <br />
                    БЕСПЛАТНО!
                  </span>
                </div>
              </div>
            </div>

            <img
              src="/akaxon.png"
              alt="Курьер с коробками"
              className="
                absolute
                bottom-0
                -right-[120px]
                w-[160%]
                max-w-none
                h-full
                object-contain
                object-bottom
              "
            />
          </div>
        </div>
      </div>

      <div className="border-b-[3px] border-dashed border-[#1E1E1E]" />
    </section>
  );
}
