import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

import resources from '@alias/locales';

export default (userlang) => {
  // setup LanguageDetector
  const langDetector = new LanguageDetector();
  langDetector.addDetector({
    name: 'userSettingDetector',
    lookup(options) {
      return userlang;
    },
    cacheUserlanguage(lng, options) {
    },
  });

  return i18n
    .use(langDetector)
    .use(reactI18nextModule) // if not using I18nextProvider
    .init({
      debug: (process.env.NODE_ENV !== 'production'),
      resources,
      load: 'currentOnly',

      fallbackLng: 'en-US',
      detection: {
        order: ['userSettingDetector', 'querystring', 'localStorage'],
      },

      interpolation: {
        escapeValue: false, // not needed for react!!
      },

      // react i18next special options (optional)
      react: {
        wait: false,
        withRef: true,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'default',
      },
    });
};
