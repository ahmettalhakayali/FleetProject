import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'example-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'android',
				url: '/app-1'
				/* auth: ['admin'] */
			},
			{
				id: 'example-component-2',
				title: 'Example-2',
				translate: 'EXAMPLE2',
				type: 'item',
				icon: 'adb',
				url: '/app-2'
				/* auth: ['staff'] */
			},
			{
				id: 'example-component-3',
				title: 'Example-2',
				translate: 'EXAMPLE3',
				type: 'item',
				icon: 'android',
				url: '/app-3'
				/* auth: ['staff'] */
			}
		]
	}
];

export default navigationConfig;
