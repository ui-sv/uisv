import { defineVariants } from './index.js';

export default defineVariants({
	accordion: {
		slots: {
			root: 'w-full',
			item: 'border-b border-default last:border-b-0',
			header: 'flex',
			trigger:
				'group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0',
			content:
				'data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none',
			body: 'text-sm pb-3.5',
			leadingicon: 'shrink-0 size-5',
			trailingicon:
				'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
			label: 'text-start break-words',
		},
		variants: {
			disabled: {
				true: {
					trigger: 'cursor-not-allowed opacity-75',
				},
			},
		},
	},

	button: {
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
				solid: 'text-label-inverted',
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
				class: 'bg-primary-500 hover:bg-primary-400',
			},
			{
				color: 'surface',
				variant: 'solid',
				class: 'bg-surface-inverted text-label-inverted hover:bg-label-toned',
			},
			{
				color: 'info',
				variant: 'solid',
				class: 'bg-info-500 hover:bg-info-400',
			},
			{
				color: 'success',
				variant: 'solid',
				class: 'bg-success-500 hover:bg-success-400',
			},
			{
				color: 'error',
				variant: 'solid',
				class: 'bg-error-500 hover:bg-error-400',
			},
			{
				color: 'warning',
				variant: 'solid',
				class: 'bg-warning-500 hover:bg-warning-400',
			},

			{
				color: 'primary',
				variant: 'outline',
				class: {
					base: 'border-primary/50 text-primary-500 hover:bg-primary/10',
				},
			},
			{
				color: 'surface',
				variant: 'outline',
				class: {
					base: 'border-surface-accented text-label hover:bg-surface-elevated',
				},
			},
			{
				color: 'info',
				variant: 'outline',
				class: {
					base: 'border-info/50 text-info-500 hover:bg-info/10',
				},
			},
			{
				color: 'success',
				variant: 'outline',
				class: {
					base: 'border-success/50 text-success-500 hover:bg-success/10',
				},
			},
			{
				color: 'error',
				variant: 'outline',
				class: {
					base: 'border-error/50 text-error-500 hover:bg-error/10',
				},
			},
			{
				color: 'warning',
				variant: 'outline',
				class: {
					base: 'border-warning/50 text-warning-500 hover:bg-warning/10',
				},
			},

			{
				color: 'primary',
				variant: 'soft',
				class: 'bg-primary/10 text-primary-500 hover:bg-primary/15',
			},
			{
				color: 'surface',
				variant: 'soft',
				class: 'bg-surface/10 text-label-highlighted hover:bg-surface/15',
			},
			{
				color: 'info',
				variant: 'soft',
				class: 'bg-info/10 text-info-500 hover:bg-info/15',
			},
			{
				color: 'success',
				variant: 'soft',
				class: 'bg-success/10 text-success-500 hover:bg-success/15',
			},
			{
				color: 'error',
				variant: 'soft',
				class: 'bg-error/10 text-error-500 hover:bg-error/15',
			},
			{
				color: 'warning',
				variant: 'soft',
				class: 'bg-warning/10 text-warning-500 hover:bg-warning/15',
			},

			{
				color: 'primary',
				variant: 'subtle',
				class: 'bg-primary/10 text-primary-500 border-primary/25 hover:bg-primary/15',
			},
			{
				color: 'surface',
				variant: 'subtle',
				class: 'bg-surface/10 text-label-highlighted border-surface/25 hover:bg-surface/15',
			},
			{
				color: 'info',
				variant: 'subtle',
				class: 'bg-info/10 text-info-600 border-info/25 hover:bg-info/15',
			},
			{
				color: 'success',
				variant: 'subtle',
				class: 'bg-success/10 text-success-600 border-success/25 hover:bg-success/15',
			},
			{
				color: 'error',
				variant: 'subtle',
				class: 'bg-error/10 text-error-600 border-error/25 hover:bg-error/15',
			},
			{
				color: 'warning',
				variant: 'subtle',
				class: 'bg-warning/10 text-warning-600 border-warning/25 hover:bg-warning/15',
			},

			{
				color: 'primary',
				variant: 'ghost',
				class: 'text-primary-500 hover:bg-primary/15',
			},
			{
				color: 'surface',
				variant: 'ghost',
				class: 'text-label-label-highlighted hover:bg-surface/15',
			},
			{
				color: 'info',
				variant: 'ghost',
				class: 'text-info-600 hover:bg-info/15',
			},
			{
				color: 'success',
				variant: 'ghost',
				class: 'text-success-600 hover:bg-success/15',
			},
			{
				color: 'error',
				variant: 'ghost',
				class: 'text-error-600 hover:bg-error/15',
			},
			{
				color: 'warning',
				variant: 'ghost',
				class: 'text-warning-600 hover:bg-warning/15',
			},

			{
				color: 'primary',
				variant: 'link',
				class: 'text-primary-500 hover:text-primary-400',
			},
			{
				color: 'surface',
				variant: 'link',
				class: 'text-label-muted hover:text-surface-inverted',
			},
			{
				color: 'info',
				variant: 'link',
				class: 'text-info-500 hover:text-info-400',
			},
			{
				color: 'success',
				variant: 'link',
				class: 'text-success-500 hover:text-success-400',
			},
			{
				color: 'error',
				variant: 'link',
				class: 'text-error-500 hover:text-error-400',
			},
			{
				color: 'warning',
				variant: 'link',
				class: 'text-warning-500 hover:text-warning-400',
			},
		],
	},
});
