export type Links = Record<
	string,
	{
		icon: string;
		sections: Record<string, Record<string, string>>;
	}
>;

export const links: Links = {
	guides: {
		icon: 'lucide:clock',
		sections: {
			Overview: { 'Getting Started': '', Theming: '' },
		},
	},
	components: {
		icon: 'lucide:code-square',
		sections: {
			// Layout: {},
			Element: {
				Alert: '',
				Badge: '',
				Banner: '',
				Button: '',
				Card: '',
				Chip: '',
				Collapsible: '',
				Icon: 'A component to display any icon from Iconify or another component.',
				Kbd: '',
				Progress: '',
				Placeholder: '',
				Seperator: 'Separates content horizontally or vertically.',
			},
			Form: {
				Checkbox: '',
				CheckboxGroup: '',
				ColorPicker: 'A component to select a color.',
				Input: '',
				InputTime: 'An input for selecting a time.',
				PinInput: '',
				Select: 'A select element to choose from a list of options.',
				Slider: '',
				Switch: '',
			},
			// Data: {},
			Navigation: { Tabs: 'A set of tab panels that are displayed one at a time.' },
			Overlay: { Popover: '' },
		},
	},
	utilities: {
		icon: 'lucide:square-function',
		sections: {
			Overview: { isSnippet: '', isComponent: '', useElementRects: '' },
		},
	},
	typography: {
		icon: 'lucide:square-pilcrow',
		sections: {
			Overview: {},
		},
	},
};
