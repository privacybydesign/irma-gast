import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nl from "./translations/nl.json";
import en from "./translations/en.json";

const resources = {
  nl: nl,
  en: en,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "nl",
    fallbackLnglng: "nl",
    keySeparator: ".",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
