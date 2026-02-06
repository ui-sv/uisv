import { type PropColor } from '$lib/index.js';
import type { Component, Snippet } from 'svelte';
import type { ClassNameValue } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Time } from '@internationalized/date';

export { Time };
export { default as InputTime } from './input-time.svelte';

export type InputTimeProps = {
	id?: string;
	name?: string;
	hourcycle?: 12 | 24;
	max?: Time;
	min?: Time;
	/**
	 * The placeholder text when the input is empty.
	 */
	placeholder?: string;
	/**
	 * @default primary
	 */
	color?: PropColor;
	/**
	 * @default outline
	 */
	variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none';
	/**
	 * @default md
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	/**
	 * @default off
	 */
	autocomplete?: 'on' | 'off';
	/**
	 * @default false
	 */
	autofocus?: boolean | number;
	disabled?: boolean;
	/**
	 * Highlight the ring color like a focus state.
	 */
	highlight?: boolean;
	value?: Time;
	icon?: string | Snippet | Component;
	ui?: {
		base?: ClassNameValue;
		leading?: ClassNameValue;
		icon?: ClassNameValue;
		trailing?: ClassNameValue;
	};
};

export const INPUT_TIME_VARIANTS = tv({
	slots: {
		root: 'inline-flex items-center rounded transition-all ring ring-inset ring-transparent',
		leading: 'text-muted',
		trailing: 'text-muted',
		icon: '',
		segment: [
			'rounded text-center outline-hidden transition-all focus:bg-surface-accented shrink',
			'aria-[valuetext="Empty"]:text-dimmed data-[segment="literal"]:(text-muted px-1) data-invalid:text-error data-disabled:(cursor-not-allowed opacity-75)',
		],
	},
	variants: {
		fieldGroup: {
			horizontal: {
				root: '',
			},
			vertical: {
				root: '',
			},
		},
		size: {
			xs: {
				root: 'px-2 h-6 text-xs',
				leading: 'ps-2',
				trailing: 'pe-2',
				icon: 'size-4',
				segment: 'px-1',
			},
			sm: {
				root: 'px-2.5 h-7 text-xs',
				leading: 'ps-2.5',
				trailing: 'pe-2.5',
				icon: 'size-4',
				segment: 'px-1',
			},
			md: {
				root: 'px-2.5 h-8 text-sm',
				leading: 'ps-2.5',
				trailing: 'pe-2.5',
				icon: 'size-5',
				segment: 'px-2',
			},
			lg: {
				root: 'px-3 h-9 text-sm',
				leading: 'ps-3',
				trailing: 'pe-3',
				icon: 'size-5',
				segment: 'px-3',
			},
			xl: {
				root: 'px-3 h-10 text-base',
				leading: 'ps-3',
				trailing: 'pe-3',
				icon: 'size-6',
				segment: 'px-3',
			},
		},
		variant: {
			outline: { root: 'ring ring-surface-accented' },
			soft: { root: 'bg-surface-muted hover:bg-surface-elevated focus-within:bg-surface-elevated' },
			subtle: { root: 'ring ring-accented' },
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
			highlight: true,
			class: {
				root: 'ring-primary-500 ring-2',
			},
		},
		{
			color: 'surface',
			variant: ['outline', 'subtle'],
			highlight: true,
			class: {
				root: 'ring-surface-800 ring-2',
			},
		},
		{
			color: 'info',
			variant: ['outline', 'subtle'],
			highlight: true,
			class: {
				root: 'ring-info-500 ring-2',
			},
		},
		{
			color: 'success',
			variant: ['outline', 'subtle'],
			highlight: true,
			class: {
				root: 'ring-success-500 ring-2',
			},
		},
		{
			color: 'warning',
			variant: ['outline', 'subtle'],
			highlight: true,
			class: {
				root: 'ring-warning-500 ring-2',
			},
		},
		{
			color: 'error',
			variant: ['outline', 'subtle'],
			highlight: true,
			class: {
				root: 'ring-error-500 ring-2',
			},
		},
	],
});
