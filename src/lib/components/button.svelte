<script module lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import { type PropColor, type PropVariant, Icon } from '$lib/index.js';
	// import { FORM_LOADING_CONTEXT_KEY } from '$lib/utils/keys.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { tv, type ClassValue } from 'tailwind-variants';
	import { getAppContext } from '$lib/contexts.js';
	import { getAppIcons } from '$lib/contexts.js';
	import { button } from '$lib/theme/default.js';

	export type ButtonBaseProps = {
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
		loadingicon?: string | Component;
		/** When true, the loading icon will be displayed. */
		loading?: boolean;
		/** The position of the icon, including the loading icon */
		iconposition?: 'leading' | 'trailing';
		/** Icon when `loading` is `false` */
		icon?: string | Component;
		leadingicon?: string | Component;
		trailingicon?: string | Component;
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
		variant?: Exclude<PropVariant, 'none'> | 'link';
		// activevariant?: ButtonVariant;
		/**
		 * @defaultValue 'md'
		 */
		size?: 'md' | 'xs' | 'sm' | 'lg' | 'xl';
		/** Render the button full width. */
		block?: boolean;
		/** Set loading state automatically based on the `@click` promise state */
		loadingauto?: boolean;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
			leadingicon?: ClassValue;
			trailingicon?: ClassValue;
		};
		children?: Snippet;
	};

	export type ButtonProps = SvelteHTMLElements['button'] & ButtonBaseProps;
</script>

<script lang="ts">
	// let form_loading = getContext<{ value: boolean } | undefined>(FORM_LOADING_CONTEXT_KEY);
	let {
		ref = $bindable(),
		size = 'md',
		variant = 'solid',
		color = 'primary',
		iconposition = 'leading',
		children,
		// active,
		// activecolor,
		// activevariant,
		block,
		label,
		loadingauto,
		onclick = () => {},
		ui = {},
		disabled,
		href,
		icon,
		loading,
		loadingicon = getAppContext().icons.loading,
		type,
		trailingicon,
		leadingicon,
		...rest
	}: ButtonProps = $props();

	let internal_loading = $state(false);
	const is_loading = $derived.by(() => {
		if (loading) return true;
		if (loadingauto) return internal_loading;
		return false;
	});

	const classnames = $derived(
		button({ variant, color, size, block, disabled: disabled || is_loading }),
	);

	const only_icon = $derived(!(children || label) && !!icon);

	async function onClickWrapper(
		e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
	) {
		if (!onclick) return;
		internal_loading = true;

		await onclick(e);

		internal_loading = false;
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={disabled || is_loading}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	bind:this={ref}
	class={classnames.base({
		class: [only_icon && 'px-0 aspect-square justify-center', href && 'cursor-pointer', ui.base],
	})}
	onclick={onClickWrapper}
	{...rest}
>
	{#if iconposition === 'leading' || leadingicon || loading}
		<Icon
			name={is_loading ? loadingicon : leadingicon || icon}
			class={[ui.leadingicon, loading && 'animate-spin', iconposition === 'leading' && ui.icon]}
		/>
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if iconposition === 'trailing' || trailingicon}
		<Icon
			name={trailingicon || icon}
			class={[ui.trailingicon, iconposition === 'trailing' && ui.icon]}
		/>
	{/if}
</svelte:element>
