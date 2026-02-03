import { type Component, type Snippet } from 'svelte';
import { type PropColor } from '$lib/index.js';
import type { ClassNameValue } from 'tailwind-merge';

export * from './style.js';

export { default as Button } from './button.svelte';

export type ButtonProps = {
	/** The underlying DOM element being rendered. You can bind to this to get a reference to the element. */
	ref?: HTMLButtonElement | HTMLAnchorElement;
	/** Where to display the linked URL, as the name for a browsing context. */
	target?: null | '_blank' | '_parent' | '_self' | '_top' | (string & {});
	/** Force the link to be active independent of the current route. */
	// active?: boolean;
	disabled?: boolean;
	/** The type of the button when not a link. */
	type?: 'submit' | 'reset' | 'button' | null | undefined;
	/** When true, the icon will be displayed on the right side. */
	loadingicon?: string | Snippet | Component;
	/** When true, the loading icon will be displayed. */
	loading?: boolean;
	/** The position of the icon, including the loading icon */
	iconposition?: 'left' | 'right';
	/** Icon when `loading` is `false` */
	icon?: string | Snippet | Component;
	/** Route Location the link should navigate to when clicked on. */
	href?: string;
	label?: string;
	/**
	 * @defaultValue 'primary'
	 */
	color?: PropColor;
	// activecolor?: PropColor;
	/**
	 * @defaultValue 'solid'
	 */
	variant?: 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost';
	// activevariant?: ButtonVariant;
	/**
	 * @defaultValue 'md'
	 */
	size?: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
	/** Render the button full width. */
	block?: boolean;
	/** Set loading state automatically based on the `@click` promise state */
	loadingauto?: boolean;
	onclick?: (event: MouseEvent) => void | Promise<void>;
	ui?: {
		base?: ClassNameValue;
		icon?: ClassNameValue;
	};
	children?: Snippet;
};
