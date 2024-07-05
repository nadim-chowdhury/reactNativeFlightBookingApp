import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en.json';
import es from './locales/es.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const language = await AsyncStorage.getItem('user-language');
    callback(language || 'en');
  },
  init: () => {},
  cacheUserLanguage: async language => {
    await AsyncStorage.setItem('user-language', language);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      es: {translation: es},
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
