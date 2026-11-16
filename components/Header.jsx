import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronDown, ShoppingCart, Sun, Check, Menu, X } from 'lucide-react';

const categories = [
  { name: 'СОКИ', path: '/soki' },
  { name: 'МИКСЫ', path: '/miksy' },
  { name: 'СМУЗИ', path: '/smuzi' },
  { name: 'ЛАССИ', path: '/lassi' },
  { name: 'ДЕТОКС', path: '/detoks' },
  { name: 'БОУЛЫ', path: '/bouly' },
  { name: 'САЛАТЫ', path: '/salaty' },
  { name: 'ЗДОРОВАЯ ЕДА', path: '/zdorovaya-eda' },
];

const infoLinks = [
  { name: 'О НАС', path: '/about' },
  { name: 'ФРАНШИЗА', path: '/franchise' },
  { name: 'КОНТАКТЫ', path: '/contacts' },
  { name: 'РАБОТА', path: '/jobs' },
];

const regions = [
  'Москва',
  'Санкт-Петербург',
  'Ташкент',
  'Алматы',
  'Казань',
  'Екатеринбург',
  'Краснодар',
  'Сочи',
];

export default function Header() {
  const [selectedRegion, setSelectedRegion] = useState('ВАШ РЕГИОН');
  const [isOpen, setIsOpen] = useState(false);
  
  const [activeMobileMenu, setActiveMobileMenu] = useState(null); 

  const handleSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
  };

  const toggleMobileMenu = (menuType) => {
    setActiveMobileMenu((prev) => (prev === menuType ? null : menuType));
  };

  return (
    <header className="w-full bg-white text-[#1E1E1E] relative select-none">
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
              onClick={() => toggleMobileMenu('burger')}
              className="p-1 cursor-pointer hover:opacity-75 transition-opacity"
              aria-label="Навигация"
            >
              {activeMobileMenu === 'burger' ? (
                <X className="w-7 h-7 stroke-[2.2] text-[#1E1E1E]" />
              ) : (
                <Menu className="w-7 h-7 stroke-[2.2] text-[#1E1E1E]" />
              )}
            </button>

            <button
              onClick={() => toggleMobileMenu('catalog')}
              className={`font-['Bahnschrift'] font-bold text-xl tracking-wide cursor-pointer py-1 transition-colors ${
                activeMobileMenu === 'catalog' ? 'text-orange-600' : 'text-[#1E1E1E]'
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
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 sm:gap-1.5 hover:opacity-75 transition-opacity cursor-pointer bg-gray-50 px-2 sm:px-2.5 py-1.5 rounded-lg border border-gray-200"
              >
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] text-orange-600 shrink-0" />
                <span className="max-w-[95px] sm:max-w-[150px] truncate text-[11px] sm:text-xs md:text-sm">
                  {selectedRegion}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsOpen(false)} 
                  />
                  
                  <div className="absolute top-full left-0 mt-2 w-52 sm:w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-40 py-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                      Выберите город
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {regions.map((region) => (
                        <button
                          key={region}
                          onClick={() => handleSelect(region)}
                          className={`w-full text-left px-3.5 py-2 text-xs md:text-sm flex items-center justify-between hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                            selectedRegion === region ? 'font-bold text-orange-600 bg-orange-50/50' : 'text-gray-700'
                          }`}
                        >
                          <span>{region}</span>
                          {selectedRegion === region && <Check className="w-4 h-4 text-orange-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 sm:gap-6 md:gap-10 shrink-0">
              <Link
                to="/cart"
                className="flex items-center gap-1.5 sm:gap-2 hover:opacity-75 transition-opacity"
              >
                <span className="hidden sm:inline">КОРЗИНА (0)</span>
                <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-1.5 sm:gap-2 hover:opacity-75 transition-opacity"
              >
                <span className="hidden sm:inline">ВОЙТИ</span>
                <Sun className="w-5 h-5 stroke-[1.8]" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between gap-y-3 pt-1">
            <nav className="flex items-center gap-5 md:gap-7 overflow-x-auto no-scrollbar pb-1">
              {categories.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group shrink-0 flex flex-col items-center gap-1.5 text-xs md:text-[13px] font-bold tracking-wide hover:text-orange-600 transition-colors"
                >
                  <span className="whitespace-nowrap">{item.name}</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#D9D9D9] group-hover:bg-orange-500 transition-colors" />
                </Link>
              ))}
            </nav>

            <nav className="flex items-center gap-6 text-xs md:text-[13px] font-bold tracking-wide pb-5 shrink-0">
              {infoLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {activeMobileMenu === 'burger' && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2.5">
            {infoLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setActiveMobileMenu(null)}
                className="py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-orange-50 hover:text-orange-600 font-bold text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeMobileMenu === 'catalog' && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-5 shadow-xl animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setActiveMobileMenu(null)}
                className="py-2.5 px-3.5 rounded-xl bg-gray-50 hover:bg-orange-50 hover:text-orange-600 font-bold text-xs transition-colors flex items-center justify-between"
              >
                <span>{item.name}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D9D9D9]" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="w-full border-b-[4px] border-dashed border-[#1E1E1E]" />
    </header>
  );
}