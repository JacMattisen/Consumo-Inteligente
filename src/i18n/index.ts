import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ptTranslations from "./pt.json";
import enTranslations from "./en.json";
import deTranslations from "./de.json";

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador automaticamente
  .use(initReactI18next) // Conecta com o React
  .init({
    resources: {
      pt: { translation: ptTranslations },
      en: { translation: enTranslations },
      de: { translation: deTranslations },
    },
    fallbackLng: "en", // Se não detectar, usa inglês

    detection: {
      // Ordem de onde ele vai tentar buscar o idioma do usuário:

      order: ["localStorage", "navigator"],

      // O nome da chave que ele vai criar no localStorage para guardar a escolha
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
