import { tv } from 'tailwind-variants';

export const accordion = tv({
	slots: {
		root: '',
		item: '',
		header: '',
		trigger: '',
		content: '',
		body: '',
		leadingicon: '',
		trailingicon: '',
		label: '',
	},
	variants: {
		disabled: {
			true: {
				trigger: '',
			},
		},
	},
});

export const button = tv({
	slots: {
		icon: '',
		base: '',
	},
	variants: {
		color: {
			primary: '',
			surface: '',
			error: '',
			success: '',
			info: '',
			warning: '',
		},
		variant: {
			link: '',
			solid: '',
			outline: '',
			soft: '',
			subtle: '',
			ghost: '',
		},
		size: {
			xs: '',
			sm: '',
			md: '',
			lg: '',
			xl: '',
		},
		block: {
			true: '',
		},
		disabled: {
			true: '',
			false: '',
		},
	},
});
