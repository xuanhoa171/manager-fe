import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en';
import vi from './vi';

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    },
    lng: 'vi',
    fallbackLng: 'vi'
  });

export default i18n;
