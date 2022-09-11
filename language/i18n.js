import i18next from 'i18next';
import english from './english.json';
import malay from './malay.json';
import chinese from './chinese.json';
import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'english',
  resources: {
    english,
    malay,
    chinese,
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
