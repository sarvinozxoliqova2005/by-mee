import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductPage from "../components/ProductPage";
import Bestsellers from "../components/Bestsellers";
import DeliveryAndPayment from "../components/DeliveryAndPayment";
import LoyaltySystem from "../components/LoyaltySystem";

const slides = [
  {
    id: 1,
    titleLine1: "Арбузные",
    titleLine2: "дольки",
    weight: "200 гр.",
    price: "99р.",
    bgTop: "#E2000F",
    bgBottom: "#F24B36",
  },
  {
    id: 2,
    titleLine1: "Свежий",
    titleLine2: "манго",
    weight: "250 гр.",
    price: "149р.",
    bgTop: "#FF8C00",
    bgBottom: "#FFA726",
  },
  {
    id: 3,
    titleLine1: "Ягодный",
    titleLine2: "смузи",
    weight: "300 мл.",
    price: "189р.",
    bgTop: "#C2185B",
    bgBottom: "#E91E63",
  },
];

export default function HeroSlider({ cartItems, setCartItems, onAddToCart }) {
  const [current, setCurrent] = useState(0);
  

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = slides[current];

  return (
    <main>
      <section className="relative w-full overflow-hidden select-none">
        <div
          className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[520px] h-full flex items-center transition-colors duration-500"
          style={{ backgroundColor: activeSlide.bgBottom }}
        >
          <svg
            className="absolute top-0 left-0 w-full h-28 sm:h-36 md:h-48 pointer-events-none"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
          >
            <path
              fill={activeSlide.bgTop}
              d="M0,0 L1440,0 L1440,140 C1300,190 1180,70 1020,120 C860,170 720,60 540,110 C360,160 180,80 0,130 Z"
            />
          </svg>

          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, #ffffff 2px, transparent 15px), radial-gradient(circle at 70% 30%, #000000 1px, transparent 25px)",
              backgroundSize: "90px 90px",
            }}
          />

          <div className="absolute top-10 left-[35%] w-5 h-10 sm:w-6 sm:h-12 bg-[#1A1A1A] rounded-full rotate-[-25deg] pointer-events-none" />
          <div className="absolute top-28 left-[8%] sm:left-[14%] w-6 h-12 sm:w-7 sm:h-14 bg-[#1A1A1A] rounded-full rotate-[35deg] opacity-90 pointer-events-none" />
          <div className="absolute bottom-12 left-[12%] sm:left-[16%] w-10 h-5 sm:w-12 sm:h-6 bg-[#1A1A1A] rounded-full rotate-[15deg] pointer-events-none" />
          <div className="absolute top-12 right-[10%] sm:right-[14%] w-12 h-6 sm:w-14 sm:h-7 bg-[#1A1A1A] rounded-full rotate-[-15deg] pointer-events-none" />
          <div className="absolute bottom-8 right-[4%] sm:right-[6%] w-14 h-7 sm:w-16 sm:h-8 bg-[#1A1A1A] rounded-full rotate-[40deg] pointer-events-none" />

          <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-16 py-10 flex flex-row items-center justify-between gap-4">
            <div className="text-left flex-1 min-w-0 pr-2">
              <h1 className="font-handwriting text-white text-[48px] sm:text-7xl md:text-[135px] font-bold leading-[0.85] sm:leading-[0.80] -rotate-3 drop-shadow-md">
                <span className="block truncate">{activeSlide.titleLine1}</span>
                <span className="block pl-2 sm:pl-4 md:pl-8 truncate">
                  {activeSlide.titleLine2}
                </span>
              </h1>
            </div>

            <div className="relative flex items-center justify-center shrink-0 md:mr-12">
              <span className="absolute -top-5 right-2 sm:-top-7 sm:right-3 md:-top-4 md:right-4 text-white font-price font-extrabold text-sm sm:text-xl md:text-3xl rotate-[24deg] tracking-tight drop-shadow-sm">
                {activeSlide.weight}
              </span>

              <div className="w-36 h-36 sm:w-52 sm:h-52 md:w-72 md:h-72 rounded-full bg-white flex items-center justify-center shadow-xl">
                <span className="font-price text-[#1E1E1E] font-black text-4xl sm:text-6xl md:text-[86px] tracking-tighter">
                  {activeSlide.price}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 sm:gap-4 text-white">
            <button
              onClick={prevSlide}
              aria-label="Oldingi slayd"
              className="p-1 hover:scale-125 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrent(index)}
                  aria-label={`Slayd ${index + 1}`}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
                    current === index
                      ? "bg-[#FFD600] scale-125"
                      : "bg-white/80 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Keyingi slayd"
              className="p-1 hover:scale-125 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>

        <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E]" />
      </section>

      <section>
        <ProductPage />
      </section>

      <div>
        <Bestsellers cartItems={cartItems} setCartItems={setCartItems} />
      </div>

      <section>
        <DeliveryAndPayment />
      </section>

      <section>
        <LoyaltySystem />
      </section>

      
    </main>
  );
}