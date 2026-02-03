export const links: Record<
	string,
	{ icon: string; sections: Record<string, Record<string, { desc: string; ref: string }>> }
> = {
	guides: {
		icon: 'lucide:clock',
		sections: {
			Overview: {
				'Getting Started': {
					desc: '',
					ref: '',
				},
				Theming: {
					desc: '',
					ref: '',
				},
			},
		},
	},
	components: {
		icon: 'lucide:code-square',
		sections: {
			// Layout: {},
			Element: {
				Alert: {
					desc: '',
					ref: '',
				},
				Badge: {
					desc: '',
					ref: '',
				},
				Banner: {
					desc: '',
					ref: '',
				},
				Button: {
					desc: '',
					ref: '',
				},
				Card: {
					desc: '',
					ref: '',
				},
				Chip: {
					desc: '',
					ref: '',
				},
				Kbd: {
					desc: '',
					ref: '',
				},
				Progress: {
					desc: '',
					ref: '',
				},
				Placeholder: {
					desc: '',
					ref: '',
				},
			},
			Form: {
				Checkbox: {
					desc: '',
					ref: '',
				},
				CheckboxGroup: {
					desc: '',
					ref: '',
				},
				ColorPicker: {
					desc: 'A component to select a color.',
					ref: '',
				},
				PinInput: {
					desc: '',
					ref: '',
				},
				Slider: {
					desc: '',
					ref: '',
				},
				Switch: {
					desc: '',
					ref: '',
				},
			},
			// Data: {},
			Navigation: {
				Tabs: {
					desc: 'A set of tab panels that are displayed one at a time.',
					ref: '',
				},
			},
			Overlay: {
				Popover: {
					desc: '',
					ref: '',
				},
			},
		},
	},
	utilities: {
		icon: 'lucide:square-function',
		sections: {
			Overview: {
				isSnippet: {
					desc: '',
					ref: '',
				},
				isComponent: {
					desc: '',
					ref: '',
				},
				useElementRects: {
					desc: '',
					ref: '',
				},
			},
		},
	},
	typography: {
		icon: 'lucide:square-pilcrow',
		sections: {
			Overview: {},
		},
	},
};
