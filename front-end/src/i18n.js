import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import nl from "./translations/nl.json";
import en from "./translations/en.json";

const resources = {
  nl: nl,
  en: en,
};

const options = {
  // order and from where user language should be detected
  order: ["querystring", "cookie", "localStorage", "sessionStorage"],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "qrona.info",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: "/", sameSite: "strict" },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    load: "languageOnly",
    detection: options,
    resources: resources,
    supportedLngs: ["nl", "en"],
    fallbackLng: "nl",
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
