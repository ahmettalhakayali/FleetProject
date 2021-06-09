import i18next from 'i18next';
import App2 from './App2';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'app1', en);
i18next.addResourceBundle('tr', 'app1', tr);
i18next.addResourceBundle('ar', 'app1', ar);

const ExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/app-2',
			component: App2
		}
	]
};

export default ExampleConfig;
