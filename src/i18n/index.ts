import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./pt.json";
import en from "./en.json";
import de from "./de.json";

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador automaticamente
  .use(initReactI18next) // Conecta com o React
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "pt", // Se não detectar, usa português
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
