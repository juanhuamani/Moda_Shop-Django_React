import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/locales/en/translation.json";
import esTranslation from "@/locales/es/translation.json";
import enAuth from "@/locales/en/auth.json";
import esAuth from "@/locales/es/auth.json";

const resources = {
  en: {
    translation: enTranslation,
    auth : enAuth
    
  },
  es: {
    translation: esTranslation,
    auth : esAuth
  },
};

const storedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
