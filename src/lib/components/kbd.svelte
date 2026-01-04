<script module lang="ts">
	import type { PropColor } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type KbdProps = {
		children?: Snippet;
		value?: string;
		color?: PropColor;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		size?: 'sm' | 'md' | 'lg';
		class?: ClassNameValue;
	};

	export const KBD_KEYS = {
		meta: '',
		ctrl: '',
		alt: '',
		win: '⊞',
		command: '⌘',
		shift: '⇧',
		control: '⌃',
		option: '⌥',
		enter: '↵',
		delete: '⌦',
		backspace: '⌫',
		escape: 'Esc',
		tab: '⇥',
		capslock: '⇪',
		arrowup: '↑',
		arrowright: '→',
		arrowdown: '↓',
		arrowleft: '←',
		pageup: '⇞',
		pagedown: '⇟',
		home: '↖',
		end: '↘'
	};

	export type KbdKey = keyof typeof KBD_KEYS;
	export type KbdSpecificKey = 'meta' | 'alt' | 'ctrl';
</script>

<script lang="ts">
	const {
		children,
		value,
		color = 'primary',
		variant = 'outline',
		size = 'md',
		class: klass
	}: KbdProps = $props();

	const macOS = $derived.by(() => {
		if (typeof navigator === 'undefined') return null;
		if (!navigator.userAgent) return null;
		return navigator.userAgent.match(/Macintosh;/);
	});

	const kbdKeysSpecificMap = $derived({
		meta: macOS ? KBD_KEYS.command : 'Ctrl',
		alt: macOS ? KBD_KEYS.command : 'Ctrl',
		ctrl: macOS ? KBD_KEYS.option : 'Alt'
	});

	function getKey(value?: KbdKey | string) {
		if (!value) {
			return;
		}

		if (['meta', 'alt', 'ctrl'].includes(value)) {
			return kbdKeysSpecificMap[value as KbdSpecificKey];
		}

		return KBD_KEYS[value as KbdKey] || value.toUpperCase();
	}
</script>

<kbd
	class={tv({
		base: 'inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans text-xs',
		variants: {
			color: {
				primary: '',
				surface: '',
				info: '',
				success: '',
				warning: '',
				error: ''
			},
			variant: {
				solid: 'text-white border border-b-3 border-r-2',
				outline: 'border border-b-3 border-r-2',
				soft: '',
				subtle: 'border border-b-3 border-r-2'
			},
			size: {
				sm: 'h-4 min-w-4',
				md: 'h-5 min-w-5',
				lg: 'h-6 min-w-6'
			}
		},
		compoundVariants: [
			{
				color: 'primary',
				variant: 'outline',
				class: 'border-primary text-primary'
			},
			{
				color: 'surface',
				variant: 'outline',
				class: 'border-surface-600'
			},
			{
				color: 'info',
				variant: 'outline',
				class: 'border-info text-info'
			},
			{
				color: 'success',
				variant: 'outline',
				class: 'border-success text-success'
			},
			{
				color: 'warning',
				variant: 'outline',
				class: 'border-warning text-warning'
			},
			{
				color: 'error',
				variant: 'outline',
				class: 'border-error text-error'
			},

			// SOLID
			{
				color: 'primary',
				variant: 'solid',
				class: 'bg-primary border-primary-600'
			},
			{
				color: 'surface',
				variant: 'solid',
				class: 'bg-surface-600 border-surface-700'
			},
			{
				color: 'info',
				variant: 'solid',
				class: 'bg-info border-info-600'
			},
			{
				color: 'success',
				variant: 'solid',
				class: 'bg-success border-success-600'
			},
			{
				color: 'warning',
				variant: 'solid',
				class: 'bg-warning border-warning-600'
			},
			{
				color: 'error',
				variant: 'solid',
				class: 'bg-error border-error-600'
			},

			// SOFT
			{
				color: 'primary',
				variant: 'soft',
				class: 'bg-primary-100 text-primary'
			},
			{
				color: 'surface',
				variant: 'soft',
				class: 'bg-surface-100 text-surface-700'
			},
			{
				color: 'info',
				variant: 'soft',
				class: 'bg-info-100 text-info'
			},
			{
				color: 'success',
				variant: 'soft',
				class: 'bg-success-100 text-success'
			},
			{
				color: 'warning',
				variant: 'soft',
				class: 'bg-warning-100 text-warning'
			},
			{
				color: 'error',
				variant: 'soft',
				class: 'bg-error-100 text-error'
			},

			// SUBTLE
			{
				color: 'primary',
				variant: 'subtle',
				class: 'bg-primary-100 border-primary-200 text-primary'
			},
			{
				color: 'surface',
				variant: 'subtle',
				class: 'bg-surface-100 border-surface-200 text-surface-700'
			},
			{
				color: 'info',
				variant: 'subtle',
				class: 'bg-info-100 border-info-200 text-info'
			},
			{
				color: 'success',
				variant: 'subtle',
				class: 'bg-success-100 border-success-200 text-success'
			},
			{
				color: 'warning',
				variant: 'subtle',
				class: 'bg-warning-100 border-warning-200 text-warning'
			},
			{
				color: 'error',
				variant: 'subtle',
				class: 'bg-error-100 border-error-200 text-error'
			}
		]
	})({ color, variant, size, class: [klass] })}
>
	{#if value}
		{getKey(value)}
	{:else}
		{@render children?.()}
	{/if}
</kbd>
