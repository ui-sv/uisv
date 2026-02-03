import type { PropColor } from '$lib/index.js';
import type { Component, Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { ClassNameValue } from 'tailwind-merge';
import type { MaskInputOptions } from 'maska';

export { default as Input } from './input.svelte';
export * from './style.js';

export type InputProps = Omit<SvelteHTMLElements['input'], 'size'> & {
	name?: string;
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
	value?: string;
	icon?: string | Snippet | Component;
	iconposition?: 'leading' | 'trailing';
	leading?: string | Snippet | Component;
	trailing?: string | Snippet | Component;
	loading?: boolean;
	loadingicon?: string | Snippet | Component;
	mask?: string | MaskInputOptions;
	ui?: {
		root?: ClassNameValue;
		base?: ClassNameValue;
		leading?: ClassNameValue;
		icon?: ClassNameValue;
		trailing?: ClassNameValue;
	};
};
