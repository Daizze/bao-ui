import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'GB',
    lng: 'GB',
    resources: {
        GB: {
            translations: require('./locales/en/translations.json')
        },
        NL: {
            translations: require('./locales/nl/translations.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

i18n.languages = ['GB', 'NL'];

export default i18n;
