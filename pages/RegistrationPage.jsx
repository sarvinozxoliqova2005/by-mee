import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const STORAGE_KEY = "vita_juice_delivery_address";

const ERROR_MESSAGES = {
  street: "Пожалуйста введите улицу",
  building: "Пожалуйста введите № корпуса",
  entrance: "Пожалуйста введите № подъезда",
  floor: "Пожалуйста введите этаж",
  apartment: "Пожалуйста введите № Кв/оф",
  intercom: "Введите № домофона",
  comment: "Пожалуйста введите текст комментария",
};

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    street: "",
    building: "",
    entrance: "",
    floor: "",
    apartment: "",
    intercom: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
        const allFilled = Object.keys(ERROR_MESSAGES).every(
          (key) => parsed[key] && String(parsed[key]).trim() !== "",
        );
        if (allFilled) {
          setIsSaved(true);
        }
      }
    } catch {}
  }, []);

  const isFormComplete = Object.keys(ERROR_MESSAGES).every(
    (key) => formData[key].trim() !== "",
  );

  const validateAll = () => {
    const newErrors = {};
    Object.keys(ERROR_MESSAGES).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = ERROR_MESSAGES[key];
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
    if (saveMessage) setSaveMessage("");

    if (value.trim() && errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateAll()) {
      setIsSaved(false);
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {}
    setIsSaved(true);
    setSaveMessage("Данные доставки сохранены");
  };

  const handleProceedToPayment = () => {
    if (!validateAll()) {
      setIsSaved(false);
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {}
    navigate("/payment");
  };

  const hasErrors = Object.keys(errors).length > 0;
  const isButtonActive = isFormComplete && !hasErrors;

  return (
    <div className="w-full bg-white text-[#1E1E1E]">
      <div className="w-full bg-[#6FA352] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-center sm:justify-between gap-4 sm:gap-6 font-['Bahnschrift'] uppercase tracking-wider">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold opacity-65 hover:opacity-90 transition-opacity cursor-pointer"
          >
            КОРЗИНА
          </button>

          <span className="text-2xl sm:text-3xl md:text-4xl font-bold opacity-100">
            ОФОРМЛЕНИЕ
          </span>

          <button
            type="button"
            onClick={handleProceedToPayment}
            className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl font-bold opacity-65 hover:opacity-90 transition-opacity cursor-pointer"
          >
            ОПЛАТА
          </button>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
        <form
          onSubmit={handleSave}
          noValidate
          className="space-y-7 sm:space-y-8"
        >
          <div className="pb-7 sm:pb-8 border-b-[3px] border-dashed border-[#1E1E1E] grid grid-cols-1 md:grid-cols-3 gap-x-10 lg:gap-x-16 gap-y-4 sm:gap-y-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="street"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Улица
                </label>
                <div className="relative w-full min-w-0">
                  {errors.street && !formData.street && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.street}
                    </span>
                  )}
                  <input
                    id="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange("street")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.street ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="building"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Корпус
                </label>
                <div className="relative w-full min-w-0">
                  {errors.building && !formData.building && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.building}
                    </span>
                  )}
                  <input
                    id="building"
                    type="text"
                    value={formData.building}
                    onChange={handleChange("building")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.building ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="entrance"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Подъезд
                </label>
                <div className="relative w-full min-w-0">
                  {errors.entrance && !formData.entrance && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.entrance}
                    </span>
                  )}
                  <input
                    id="entrance"
                    type="text"
                    value={formData.entrance}
                    onChange={handleChange("entrance")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.entrance ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="floor"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Этаж
                </label>
                <div className="relative w-full min-w-0">
                  {errors.floor && !formData.floor && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.floor}
                    </span>
                  )}
                  <input
                    id="floor"
                    type="text"
                    value={formData.floor}
                    onChange={handleChange("floor")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.floor ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="apartment"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Кв/оф
                </label>
                <div className="relative w-full min-w-0">
                  {errors.apartment && !formData.apartment && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.apartment}
                    </span>
                  )}
                  <input
                    id="apartment"
                    type="text"
                    value={formData.apartment}
                    onChange={handleChange("apartment")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.apartment ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>

              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <label
                  htmlFor="intercom"
                  className="font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] shrink-0 w-20 sm:w-24"
                >
                  Домофон
                </label>
                <div className="relative w-full min-w-0">
                  {errors.intercom && !formData.intercom && (
                    <span className="pointer-events-none absolute left-0 bottom-1.5 text-[11px] sm:text-xs text-red-600 font-medium truncate max-w-full">
                      {errors.intercom}
                    </span>
                  )}
                  <input
                    id="intercom"
                    type="text"
                    value={formData.intercom}
                    onChange={handleChange("intercom")}
                    className={`w-full bg-transparent border-b-[3px] border-dashed ${
                      errors.intercom ? "border-red-500" : "border-[#1E1E1E]"
                    } focus:outline-none focus:border-[#6FA352] pb-1 text-sm sm:text-lg font-medium transition-colors`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-7 sm:pb-8 border-b-[3px] border-dashed border-[#1E1E1E] space-y-4">
            <label
              htmlFor="order-comment"
              className="block font-['Bahnschrift'] text-base sm:text-xl text-[#1E1E1E] text-center sm:text-left"
            >
              Комментарий к заказу
            </label>

            <div className="relative w-full max-w-md mx-auto sm:mx-0">
              {errors.comment && !formData.comment && (
                <span className="pointer-events-none absolute left-4 top-3.5 text-[11px] sm:text-xs text-red-600 font-medium">
                  {errors.comment}
                </span>
              )}
              <textarea
                id="order-comment"
                rows={5}
                value={formData.comment}
                onChange={handleChange("comment")}
                className={`w-full bg-[#EFEFEF] rounded-[24px] p-4 sm:p-5 text-sm sm:text-base text-[#1E1E1E] focus:outline-none focus:ring-2 ${
                  errors.comment
                    ? "ring-1 ring-red-500 focus:ring-red-500"
                    : "focus:ring-[#6FA352]"
                } resize-none`}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-1">
              <button
                type="submit"
                className={`font-['Bahnschrift'] font-bold text-xs sm:text-sm w-full max-w-[200px] sm:w-auto px-8 py-2.5 sm:py-2 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
                  isButtonActive
                    ? "bg-[#2B2B2B] hover:bg-[#1E1E1E] active:scale-95 text-white shadow-sm"
                    : "bg-[#D9D9D9] text-[#5A5A5A]"
                }`}
              >
                СОХРАНИТЬ
              </button>

              {saveMessage && isSaved && (
                <span className="text-xs sm:text-sm font-medium text-[#6FA352]">
                  {saveMessage}
                </span>
              )}
            </div>
          </div>
        </form>

        <Link to='/input' className="pt-7 sm:pt-8 pb-2 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleProceedToPayment}
            className={`font-['Bahnschrift'] font-bold text-xs sm:text-sm w-full max-w-[200px] sm:w-auto px-10 py-2.5 rounded-full uppercase tracking-wider transition-all cursor-pointer ${
              isButtonActive
                ? "bg-[#2B2B2B] hover:bg-[#1E1E1E] active:scale-95 text-white shadow-sm"
                : "bg-[#D9D9D9] text-[#5A5A5A]"
            }`}
          >
            ОПЛАТА
          </button>
        </Link>
      </div>

      <div className="border-t-[3px] border-dashed border-[#1E1E1E]"></div>
    </div>
  );
}
