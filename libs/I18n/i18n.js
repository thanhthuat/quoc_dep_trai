import i18n from 'i18next';

import { vi_data } from '../I18n/languages/vi';
import { en_data } from '../I18n/languages/en';

const options = {
	// order and from where user language should be detected
	order: ['localStorage',],
	// keys or params to lookup language from
	lookupLocalStorage: 'i18nextLng',
	// cache user language on
	caches: ['localStorage'],
	excludeCacheFor: ['cimode'],
};

i18n.init({
	resources: {
		en: { translation: en_data },
		vn: { translation: vi_data },
	},
	fallbackLng: 'vn',
	interpolation: {
		escapeValue: false, // not needed for react!!
		formatSeparator: ','
	},
	react: { wait: true },
	detection: options,
});

export default i18n;