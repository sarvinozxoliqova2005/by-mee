import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PROFILE_STORAGE_KEY = "vita_juice_personal_area";
const AUTH_STORAGE_KEY = "vita_juice_is_logged_in";

export default function PersonalAreaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || null;
  const initialTab = location.state?.tab || "profile";

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return savedAuth === null ? true : savedAuth === "true";
    } catch {
      return true;
    }
  });

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showBirthInfo, setShowBirthInfo] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    birthDate: "",
    email: "",
  });

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProfile((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const isFormFilled =
    profile.name.trim() !== "" &&
    profile.phone.trim() !== "" &&
    profile.birthDate.trim() !== "" &&
    profile.email.trim() !== "";

  const handleFieldChange = (field) => (e) => {
    const value = e.target.value;
    setProfile((prev) => ({ ...prev, [field]: value }));
    if (saveMessage) setSaveMessage("");

    if (value.trim() && errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab("profile");
    setErrors({});
    setSaveMessage("");
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } catch {
      // ignore storage errors
    }

    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setErrors({});
    setSaveMessage("");
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, "false");
    } catch {
      // ignore storage errors
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = "Введите имя";
    }
    if (!profile.phone.trim()) {
      newErrors.phone = "Введите телефон";
    }
    if (!profile.birthDate.trim()) {
      newErrors.birthDate = "Дата рождения";
    }
    if (!profile.email.trim()) {
      newErrors.email = "Введите E-mail";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSaveMessage("");
      return;
    }

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } catch {
      // ignore storage errors
    }

    setSaveMessage("Данные сохранены");

    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="w-full bg-white text-[#1E1E1E]">
      {/* Yashil tablar paneli */}
      <div className="w-full bg-[#6FA352] text-white">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-10 py-3.5 sm:py-5 grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-items-center sm:justify-between gap-2 sm:gap-8 font-['Bahnschrift'] uppercase tracking-wide sm:tracking-wider text-center sm:text-left">
          <button
            type="button"
            onClick={() => isLoggedIn && setActiveTab("profile")}
            className={`text-sm sm:text-3xl md:text-[34px] font-bold leading-tight transition-opacity ${
              isLoggedIn && activeTab === "profile"
                ? "opacity-100 cursor-pointer"
                : isLoggedIn
                ? "opacity-65 hover:opacity-90 cursor-pointer"
                : "opacity-65 cursor-default"
            }`}
          >
            <span className="block sm:inline">ЛИЧНЫЙ</span>{" "}
            <span className="block sm:inline">КАБИНЕТ</span>
          </button>

          <button
            type="button"
            onClick={() => isLoggedIn && navigate("/history")}
            className={`text-sm sm:text-3xl md:text-[34px] font-bold leading-tight transition-opacity ${
              isLoggedIn
                ? "opacity-65 hover:opacity-90 cursor-pointer"
                : "opacity-65 cursor-default"
            }`}
          >
            <span className="block sm:inline">ИСТОРИЯ</span>{" "}
            <span className="block sm:inline">ЗАКАЗОВ</span>
          </button>

          <button
            type="button"
            onClick={() => isLoggedIn && setActiveTab("balance")}
            className={`text-sm sm:text-3xl md:text-[34px] font-bold leading-tight transition-opacity ${
              isLoggedIn && activeTab === "balance"
                ? "opacity-100 cursor-pointer"
                : isLoggedIn
                ? "opacity-65 hover:opacity-90 cursor-pointer"
                : "opacity-65 cursor-default"
            }`}
          >
            <span className="block sm:inline">БАЛАНС</span>{" "}
            <span className="block sm:inline">300</span>
          </button>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10 py-7 sm:py-10">
        {!isLoggedIn ? (
          <div className="py-10 sm:py-14 flex flex-col items-center justify-center gap-5 text-center">
            {redirectTo && (
              <p className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E]">
                Чтобы оформить заказ, войдите в личный кабинет
              </p>
            )}
            <button
              type="button"
              onClick={handleLogin}
              className="bg-[#FFD600] hover:bg-[#f5cc00] active:scale-95 text-[#1E1E1E] font-['Bahnschrift'] font-bold text-xs sm:text-sm px-10 py-2.5 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              ВОЙТИ
            </button>
          </div>
        ) : activeTab === "profile" ? (
          <form onSubmit={handleSave} noValidate className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
              {/* Chap tomondagi forma maydonlari */}
              <div className="md:col-span-7 space-y-5 sm:space-y-6">
                {/* Имя */}
                <div className="flex items-end gap-4 sm:gap-8">
                  <label
                    htmlFor="pa-name"
                    className="font-['Bahnschrift'] text-base sm:text-2xl text-[#3A3A3A] w-24 sm:w-44 shrink-0"
                  >
                    Имя
                  </label>
                  <div className="relative flex-1 max-w-[230px] sm:max-w-[280px]">
                    {errors.name && !profile.name && (
                      <span className="pointer-events-none absolute left-0 bottom-1.5 text-xs sm:text-sm text-[#E11D48] font-medium truncate max-w-full">
                        {errors.name}
                      </span>
                    )}
                    <input
                      id="pa-name"
                      type="text"
                      value={profile.name}
                      onChange={handleFieldChange("name")}
                      className="w-full bg-transparent border-b-[3px] border-dashed border-[#2B2B2B] focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium text-[#1E1E1E]"
                    />
                  </div>
                </div>

                {/* Телефон */}
                <div className="flex items-end gap-4 sm:gap-8">
                  <label
                    htmlFor="pa-phone"
                    className="font-['Bahnschrift'] text-base sm:text-2xl text-[#3A3A3A] w-24 sm:w-44 shrink-0"
                  >
                    Телефон
                  </label>
                  <div className="relative flex-1 max-w-[230px] sm:max-w-[280px]">
                    {errors.phone && !profile.phone && (
                      <span className="pointer-events-none absolute left-0 bottom-1.5 text-xs sm:text-sm text-[#E11D48] font-medium truncate max-w-full">
                        {errors.phone}
                      </span>
                    )}
                    <input
                      id="pa-phone"
                      type="tel"
                      value={profile.phone}
                      onChange={handleFieldChange("phone")}
                      className="w-full bg-transparent border-b-[3px] border-dashed border-[#2B2B2B] focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium text-[#1E1E1E]"
                    />
                  </div>
                </div>

                {/* Дата рождения + (i) */}
                <div className="flex items-end gap-4 sm:gap-8">
                  <label
                    htmlFor="pa-birth"
                    className="font-['Bahnschrift'] text-base sm:text-2xl text-[#3A3A3A] leading-tight w-24 sm:w-44 shrink-0"
                  >
                    <span className="block sm:inline">Дата</span>{" "}
                    <span className="block sm:inline">рождения</span>
                  </label>

                  <div className="relative flex items-end gap-2 flex-1 max-w-[260px] sm:max-w-[315px]">
                    <div className="relative flex-1 max-w-[230px] sm:max-w-[280px]">
                      {errors.birthDate && !profile.birthDate && (
                        <span className="pointer-events-none absolute left-0 bottom-1.5 text-xs sm:text-sm text-[#E11D48] font-medium truncate max-w-full">
                          {errors.birthDate}
                        </span>
                      )}
                      <input
                        id="pa-birth"
                        type="text"
                        value={profile.birthDate}
                        onChange={handleFieldChange("birthDate")}
                        className="w-full bg-transparent border-b-[3px] border-dashed border-[#2B2B2B] focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium text-[#1E1E1E]"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowBirthInfo((prev) => !prev)}
                      aria-label="Информация о дате рождения"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#2B2B2B] text-[#2B2B2B] text-xs sm:text-sm font-serif italic inline-flex items-center justify-center shrink-0 mb-0.5 hover:bg-[#EFEFEF] cursor-pointer"
                    >
                      i
                    </button>

                    {showBirthInfo && (
                      <div className="absolute left-0 sm:left-28 top-full mt-2 z-10 w-64 bg-white border border-[#D9D9D9] rounded-lg p-2.5 text-xs text-[#1E1E1E] shadow-md">
                        Дарим бонусы ко дню рождения
                      </div>
                    )}
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-end gap-4 sm:gap-8">
                  <label
                    htmlFor="pa-email"
                    className="font-['Bahnschrift'] text-base sm:text-2xl text-[#3A3A3A] w-24 sm:w-44 shrink-0"
                  >
                    E-mail
                  </label>
                  <div className="relative flex-1 max-w-[230px] sm:max-w-[280px]">
                    {errors.email && !profile.email && (
                      <span className="pointer-events-none absolute left-0 bottom-1.5 text-xs sm:text-sm text-[#E11D48] font-medium truncate max-w-full">
                        {errors.email}
                      </span>
                    )}
                    <input
                      id="pa-email"
                      type="email"
                      value={profile.email}
                      onChange={handleFieldChange("email")}
                      className="w-full bg-transparent border-b-[3px] border-dashed border-[#2B2B2B] focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium text-[#1E1E1E]"
                    />
                  </div>
                </div>
              </div>

              {/* O‘ng tomondagi "ДАРИМ ПОДАРОК НА ДР!" buluti */}
              <div className="md:col-span-5 flex justify-center md:justify-start pt-2 md:pt-0">
                <div className="relative w-44 h-32 sm:w-48 sm:h-36 flex items-center justify-center select-none">
                  <svg
                    viewBox="0 0 220 150"
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <path
                      d="M42 114 C24 114 14 100 18 82 C12 68 20 50 36 46 C42 26 64 16 84 24 C98 12 124 14 138 28 C158 22 180 34 184 54 C200 60 206 80 196 96 C200 112 186 126 168 124 C154 134 132 132 118 122 C100 132 76 130 62 118 C54 120 46 118 42 114 Z M24 108 L12 124 L32 115"
                      fill="#FFFFFF"
                      stroke="#6E6E6E"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pb-2 font-['Bahnschrift'] font-bold text-[#6FA352] uppercase leading-tight tracking-wide text-sm sm:text-base">
                    <span>ДАРИМ</span>
                    <span>ПОДАРОК</span>
                    <span>НА ДР!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* СОХРАНИТЬ va ВЫЙТИ tugmalari */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-24 md:pl-52">
              <button
                type="submit"
                className={`font-['Bahnschrift'] font-bold text-xs sm:text-sm w-36 sm:w-auto px-8 py-2.5 sm:py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                  isFormFilled
                    ? "bg-[#2B2B2B] hover:bg-[#1E1E1E] active:scale-95 text-white shadow-sm"
                    : "bg-[#D9D9D9] text-[#5A5A5A]"
                }`}
              >
                СОХРАНИТЬ
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className={`font-['Bahnschrift'] font-bold text-xs sm:text-sm w-36 sm:w-auto px-9 py-2.5 sm:py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                  isFormFilled
                    ? "bg-[#2B2B2B] hover:bg-[#1E1E1E] active:scale-95 text-white shadow-sm"
                    : "bg-[#D9D9D9] text-[#5A5A5A]"
                }`}
              >
                ВЫЙТИ
              </button>
            </div>

            {saveMessage && (
              <p className="pt-3 text-xs sm:text-sm font-medium text-[#6FA352] text-center sm:text-left md:pl-52">
                {saveMessage}
              </p>
            )}
          </form>
        ) : (
          <div className="space-y-3">
            <h2 className="font-['Bahnschrift'] font-bold text-xl sm:text-2xl uppercase">
              БАЛАНС БОНУСОВ: 300
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A]">
              Используйте бонусы при оплате заказа на странице оплаты.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}