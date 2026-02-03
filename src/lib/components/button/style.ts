import { tv } from 'tailwind-variants';

export const BUTTON_VARIANTS = tv({
	slots: {
		icon: '',
		base: 'transition flex-inline items-center font-sans',
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
			solid: 'text-inverted',
			outline: 'border',
			soft: '',
			subtle: 'border',
			ghost: '',
		},
		size: {
			xs: {
				base: 'font-medium text-xs px-2 h-6 rounded gap-1',
				icon: 'size-4',
			},
			sm: { base: 'font-medium text-xs px-2 h-7 rounded gap-1', icon: 'size-4' },
			md: { base: 'font-medium text-sm rounded-md px-2 h-8 gap-2', icon: 'size-5' },
			lg: { base: 'font-medium text-sm px-3 h-9 rounded-md gap-2', icon: 'size-6' },
			xl: { base: 'font-medium px-3 h-10 rounded-md gap-2', icon: 'size-6' },
		},
		block: {
			true: 'w-full',
		},
		disabled: {
			true: 'cursor-not-allowed',
			false: 'cursor-default',
		},
	},
	compoundVariants: [
		{
			color: 'primary',
			variant: 'solid',
			class: 'bg-primary-500 hover:(bg-primary-400)',
		},
		{
			color: 'surface',
			variant: 'solid',
			class: 'bg-surface-inverted text-inverted hover:(bg-toned)',
		},
		{
			color: 'info',
			variant: 'solid',
			class: 'bg-info-500 hover:(bg-info-400)',
		},
		{
			color: 'success',
			variant: 'solid',
			class: 'bg-success-500 hover:(bg-success-400)',
		},
		{
			color: 'error',
			variant: 'solid',
			class: 'bg-error-500 hover:(bg-error-400)',
		},
		{
			color: 'warning',
			variant: 'solid',
			class: 'bg-warning-500 hover:(bg-warning-400)',
		},

		{
			color: 'primary',
			variant: 'outline',
			class: {
				base: [
					'border-primary/50 text-primary-500 hover:(bg-primary-50)',
					'dark:hover:bg-primary-950',
				],
			},
		},
		{
			color: 'surface',
			variant: 'outline',
			class: {
				base: [
					'border-surface-accented text-surface-inverted hover:bg-surface/10',
					'dark:hover:bg-surface-800',
				],
			},
		},
		{
			color: 'info',
			variant: 'outline',
			class: {
				base: ['border-info/50 text-blue-500 hover:bg-info/10', 'dark:hover:bg-info-950'],
			},
		},
		{
			color: 'success',
			variant: 'outline',
			class: {
				base: [
					'border-success/50 text-success-500 hover:bg-success/10',
					'dark:hover:bg-success-950',
				],
			},
		},
		{
			color: 'error',
			variant: 'outline',
			class: {
				base: ['border-red/50 text-red-500 hover:bg-red/10', 'dark:hover:bg-red-950'],
			},
		},
		{
			color: 'warning',
			variant: 'outline',
			class: {
				base: [
					'border-warning/50 text-warning-500 hover:(bg-warning/10)',
					'dark:hover:bg-warning-950',
				],
			},
		},

		{
			color: 'primary',
			variant: 'soft',
			class: 'bg-primary-50 text-primary-500 hover:(bg-primary-100)',
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-100 text-surface-800 hover:(bg-surface-200)',
		},
		{
			color: 'info',
			variant: 'soft',
			class: 'bg-blue-100 text-blue-500 hover:(bg-blue-50)',
		},
		{
			color: 'success',
			variant: 'soft',
			class: 'bg-green-100 text-green-500 hover:(bg-green-50)',
		},
		{
			color: 'error',
			variant: 'soft',
			class: 'bg-red-100 text-red-500 hover:(bg-red-50)',
		},
		{
			color: 'warning',
			variant: 'soft',
			class: 'bg-yellow-100 text-yellow-500 hover:(bg-yellow-50)',
		},

		{
			color: 'primary',
			variant: 'subtle',
			class: 'bg-primary-50 text-primary-500 border-primary-200 hover:(bg-primary-100)',
		},
		{
			color: 'surface',
			variant: 'subtle',
			class: 'bg-surface-50 text-surface-800 border-surface-300 hover:(bg-surface-100)',
		},
		{
			color: 'info',
			variant: 'subtle',
			class: 'bg-blue-50 text-blue-600 border-blue-200 hover:(bg-blue-100)',
		},
		{
			color: 'success',
			variant: 'subtle',
			class: 'bg-green-100 text-green-600 border-green-300 hover:(bg-green-100)',
		},
		{
			color: 'error',
			variant: 'subtle',
			class: 'bg-red-50 text-red-600 border-red-200 hover:(bg-red-100)',
		},
		{
			color: 'warning',
			variant: 'subtle',
			class: 'bg-yellow-50 text-yellow-600 border-yellow-300 hover:(bg-yellow-100)',
		},

		{
			color: 'primary',
			variant: 'ghost',
			class: 'text-primary-500 hover:(bg-primary-100)',
		},
		{
			color: 'surface',
			variant: 'ghost',
			class: 'text-surface-inverted hover:(bg-surface-elevated text-surface-inverted)',
		},
		{
			color: 'info',
			variant: 'ghost',
			class: 'text-blue-600 hover:(bg-blue-100)',
		},
		{
			color: 'success',
			variant: 'ghost',
			class: 'text-green-600 hover:(bg-green-100)',
		},
		{
			color: 'error',
			variant: 'ghost',
			class: 'text-red-600 hover:(bg-red-100)',
		},
		{
			color: 'warning',
			variant: 'ghost',
			class: 'text-yellow-600 hover:(bg-yellow-100)',
		},

		{
			color: 'primary',
			variant: 'link',
			class: 'text-primary-500 hover:(text-primary-400)',
		},
		{
			color: 'surface',
			variant: 'link',
			class: 'text-muted hover:(text-surface-inverted)',
		},
		{
			color: 'info',
			variant: 'link',
			class: 'text-blue-500 hover:(text-blue-400)',
		},
		{
			color: 'success',
			variant: 'link',
			class: 'text-green-500 hover:(text-green-400)',
		},
		{
			color: 'error',
			variant: 'link',
			class: 'text-red-500 hover:(text-red-400)',
		},
		{
			color: 'warning',
			variant: 'link',
			class: 'text-yellow-500 hover:(text-yellow-400)',
		},
	],
});
