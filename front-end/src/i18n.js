import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import nl from "./translations/nl.json";

const resources = {
  nl: nl,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: Object.keys(resources)[0], // Since we only support nl now, pin the language for all environments.

    keySeparator: false,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
