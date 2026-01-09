export const ASIDE_LINKS: Record<string, Record<string, string[]>> = {
	guides: { Overview: ['Getting Started', 'Theming'] },
	components: {
		Layout: [],
		Element: [
			'Alert',
			'Badge',
			'Banner',
			'Button',
			'Card',
			'Chip',
			'Kbd',
			'Progress',
			'Placeholder',
		],
		Form: ['Checkbox', 'CheckboxGroup', 'PinInput', 'Slider', 'Switch'],
		Data: [],
		Navigation: ['Tabs'],
		Overlay: [],
	},
	utilities: {
		Overview: ['isSnippet', 'isComponent'],
	},
};

export const LINKS = [
	{
		label: 'Guides',
		href: '/guides',
		icon: 'lucide:clock',
	},
	{
		label: 'Components',
		href: '/components',
		icon: 'lucide:code-square',
	},
	{
		label: 'Utilities',
		href: '/utilities',
		icon: 'lucide:square-function',
	},
	{
		label: 'Typography',
		href: '/typography',
		icon: 'lucide:square-pilcrow',
	},
	{
		label: 'GitHub',
		href: 'https://github.com/ui-sv/uisv',
		target: '_blank',
		icon: 'lucide:github',
	},
];
