import { tv } from 'tailwind-variants';

export const INPUT_VARIANTS = tv({
	slots: {
		root: 'inline-flex items-center rounded transition-all ring ring-inset ring-transparent',
		base: 'appearance-none outline-none placeholder:text-muted',
		leading: 'text-muted',
		trailing: 'text-muted',
		icon: '',
	},
	variants: {
		fieldGroup: {
			horizontal: {
				root: '',
				base: '',
			},
			vertical: {
				root: '',
				base: '',
			},
		},
		size: {
			xs: {
				base: 'px-2 py-1 text-xs gap-1',
				leading: 'ps-2',
				trailing: 'pe-2',
				icon: 'size-4',
			},
			sm: {
				base: 'px-2.5 py-1.5 text-xs gap-1.5',
				leading: 'ps-2.5',
				trailing: 'pe-2.5',
				icon: 'size-4',
			},
			md: {
				base: 'px-2.5 py-1.5 text-sm gap-1.5',
				leading: 'ps-2.5',
				trailing: 'pe-2.5',
				icon: 'size-5',
			},
			lg: {
				base: 'px-3 py-2 text-sm gap-2',
				leading: 'ps-3',
				trailing: 'pe-3',
				icon: 'size-5',
			},
			xl: {
				base: 'px-3 py-2 text-base gap-2',
				leading: 'ps-3',
				trailing: 'pe-3',
				icon: 'size-6',
			},
		},
		variant: {
			outline: { root: 'ring ring-dimmed' },
			soft: { root: 'bg-surface-muted hover:bg-surface-elevated focus-within:bg-surface-elevated' },
			subtle: { root: 'ring ring-dimmed' },
			ghost: { root: 'hover:bg-surface-elevated focus-within:bg-surface-elevated' },
			none: { root: '' },
		},
		color: {
			primary: { root: '' },
			surface: { root: '' },
			info: { root: '' },
			success: { root: '' },
			warning: { root: '' },
			error: { root: '' },
		},
		leading: {
			false: { leading: 'hidden' },
		},
		trailing: {
			false: { trailing: 'hidden' },
		},
		loading: {
			true: '',
		},
		highlight: {
			true: '',
		},
		type: {
			file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none',
		},
	},
	compoundVariants: [
		{
			color: 'primary',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-primary-500 ring-2)',
			},
		},
		{
			color: 'surface',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-surface-800 ring-2)',
			},
		},
		{
			color: 'info',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-info-500 ring-2)',
			},
		},
		{
			color: 'success',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-success-500 ring-2)',
			},
		},
		{
			color: 'warning',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-warning-500 ring-2)',
			},
		},
		{
			color: 'error',
			variant: ['outline', 'subtle'],
			class: {
				root: 'focus-within:(ring-error-500 ring-2)',
			},
		},
	],
});
