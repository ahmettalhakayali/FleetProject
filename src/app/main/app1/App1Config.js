import i18next from 'i18next';
import App1 from './App1';

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
			path: '/app-1',
			component: App1
		}
	]
};

export default ExampleConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
