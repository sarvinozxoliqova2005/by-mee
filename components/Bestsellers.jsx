import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'ЛАССИ',
    volume: '500 мл',
    price: '375₽',
    image: 'lassi.png',
  },
  {
    id: 2,
    title: 'МИКС',
    volume: '500 мл',
    price: '400₽',
    image: 'miks.png',
    bonus: '+20 б',
  },
  {
    id: 3,
    title: 'БОУЛ',
    volume: '500 мл',
    price: '450₽',
    image: 'bouli.png',
  },
  {
    id: 4,
    title: 'АПЕЛЬСИНОВЫЙ СОК',
    volume: '500 мл',
    price: '400₽',
    image: 'apelsin.png',
  },
  {
    id: 5,
    title: 'СМУЗИ',
    volume: '500 мл',
    price: '385₽',
    image: 'smuzi.png',
  },
  {
    id: 6,
    title: 'ДЕТОКС',
    volume: '500 мл',
    price: '500₽',
    image: 'detox.png',
    bonus: '+50 б',
  },
  {
    id: 7,
    title: 'ДОКТОР',
    volume: '500 мл',
    price: '375₽',
    image: 'doktor.png',
  },
  {
    id: 8,
    title: 'ГРАНАТОВЫЙ СОК',
    volume: '500 мл',
    price: '500₽',
    image: 'anor.png',
    bonus: '+20 б',
  },
  {
    id: 9,
    title: 'ГРИН',
    volume: '500 мл',
    price: '450₽',
    image: 'grin.png',
  },
];

export default function Bestsellers() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [favorites, setFavorites] = useState({});

  // Ekran o'lchamiga qarab nechta mahsulot ko'rinishini aniqlash
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Telefonlarda 1 ta
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Planshetlarda 2 ta
      } else {
        setItemsPerPage(3); // Kompyuterda 3 ta
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const extendedProducts = [...products, ...products.slice(0, itemsPerPage)];

  const nextSlide = () => {
    if (currentIndex >= products.length) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(products.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(products.length - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= products.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full bg-white py-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 text-center mb-10">
        <h2 className="font-['Bahnschrift'] font-normal text-[40px] sm:text-[60px] leading-none uppercase text-[#1E1E1E] tracking-wide">
          ХИТЫ ПРОДАЖ
        </h2>
      </div>

      <div className="w-full border-t-[4px] border-dashed border-[#1E1E1E] mb-12" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative flex items-center justify-between">
        <button 
          onClick={prevSlide}
          aria-label="Oldingi"
          className="absolute left-0 sm:left-2 md:left-6 z-10 text-gray-400 hover:text-[#1E1E1E] transition-colors cursor-pointer p-2 bg-white/80 rounded-full shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
        </button>

        <div className="w-full overflow-hidden mx-8 sm:mx-10">
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex ${
              isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''
            }`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {extendedProducts.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2 sm:px-4 flex flex-col items-center text-center bg-white py-4 relative group"
              >
                {item.bonus && (
                  <div className="absolute top-2 right-4 sm:right-6 bg-[#FFD600] text-[#1E1E1E] font-bold text-xs px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    <span>{item.bonus}</span>
                  </div>
                )}

                <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center mb-4 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-['Bahnschrift'] text-lg sm:text-xl font-normal text-[#1E1E1E] uppercase tracking-wide">
                  {item.title}
                </h3>

                <span className="text-gray-400 text-xs mt-0.5 mb-3 font-medium">
                  {item.volume}
                </span>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="font-['Bahnschrift'] text-lg sm:text-xl font-bold text-[#1E1E1E]">
                    {item.price}
                  </span>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    aria-label="Saralanganlarga qo'shish"
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites[item.id] ? 'fill-red-500 text-red-500' : 'stroke-[1.8]'
                      }`}
                    />
                  </button>
                </div>

                <button className="w-full max-w-[170px] bg-[#FFD600] hover:bg-[#ffcc00] text-[#1E1E1E] font-bold text-xs py-2.5 px-4 rounded-full shadow-sm tracking-wider uppercase transition-colors cursor-pointer">
                  В КОРЗИНУ
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextSlide}
          aria-label="Keyingi"
          className="absolute right-0 sm:right-2 md:right-6 z-10 text-orange-500 hover:text-orange-600 transition-colors cursor-pointer p-2 bg-white/80 rounded-full shadow-sm"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
        </button>
      </div>

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E] mt-12" />
    </section>
  );
}