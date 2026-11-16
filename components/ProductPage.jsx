import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: 'СОКИ',
    path: '/soki',
    img: 'sok.png',
  },
  {
    name: 'МИКСЫ',
    path: '/miksy',
    img: 'miks.png',
  },
  {
    name: 'СМУЗИ',
    path: '/smuzi',
    img: 'smuzi.png',
  },
  {
    name: 'ДЕТОКСЫ',
    path: '/detoks',
    img: 'detox.png',
  },
  {
    name: 'ЛАССИ',
    path: '/lassi',
    img: 'lassi.png',
  },
  {
    name: 'БОУЛЫ',
    path: '/bouly',
    img: 'bouli.png',
  },
  {
    name: 'САЛАТЫ',
    path: '/salaty',
    img: 'salat.png',
  },
  {
    name: 'ЗДОРОВАЯ ЕДА',
    path: '/zdorovaya-eda',
    img: 'lavash.png',
  },
];

export default function ProductPage() {
  return (
    <section className="w-full bg-white pt-10 select-none">
      <div className="max-w-[1440px] container w-full mx-auto px-5 text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-[60px] font-normal tracking-wide text-[#1E1E1E] uppercase">
          НАША ПРОДУКЦИЯ
        </h2>
      </div>

      <div className="w-full border-t-[4px] border-dashed border-[#1E1E1E]" />

      <div className="bg-[#779A4B] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col lg:flex-row items-stretch justify-between">
          
          <div className="hidden lg:relative lg:w-[45%] lg:flex items-stretch">
            <img
              src="/qiz.png"
              alt="Полезно и питательно"
              className="w-full h-full min-h-[480px] object-cover"
            />

            <div className="absolute top-12 -right-6 z-20 rotate-[18deg] drop-shadow-md">
              <div className="relative bg-white px-6 py-5 rounded-[45px] text-center">
                <span className="absolute -top-3 left-6 w-10 h-10 bg-white rounded-full -z-10" />
                <span className="absolute -top-4 right-8 w-12 h-12 bg-white rounded-full -z-10" />
                <span className="absolute -bottom-3 left-8 w-10 h-10 bg-white rounded-full -z-10" />
                <span className="absolute -bottom-2 right-6 w-9 h-9 bg-white rounded-full -z-10" />
                <span className="absolute bottom-2 -left-3 w-5 h-5 bg-white rotate-45 -z-10" />

                <p className="text-[#779A4B] font-black text-lg leading-tight tracking-tight uppercase">
                  ПОЛЕЗНО И <br />
                  ПИТАТЕЛЬНО!
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[56%] py-10 lg:py-12 pl-0 lg:pl-12 flex items-center justify-center">
            <div className="font-['Bahnschrift'] font-normal w-full grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-8 justify-items-center">
              {products.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 xl:w-36 xl:h-36 rounded-full bg-white p-2.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <span className="mt-3 text-white font-bold text-xs md:text-sm tracking-wide uppercase leading-tight max-w-[120px] group-hover:text-yellow-200 transition-colors">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E]" />
    </section>
  );
}