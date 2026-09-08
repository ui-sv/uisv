<script module lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import { Icon } from '../index.js';
	// import { FORM_LOADING_CONTEXT_KEY } from '../utils/keys.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { getAppContext } from '../contexts.js';

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
		iconposition = 'leading',
		children,
		label,
		loadingauto = true,
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

	async function onClickWrapper(
		e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
	) {
		console.log('onclick');
		if (!onclick) return;
		internal_loading = true;
		console.log(internal_loading);

		await onclick(e);

		console.log('clicked');
		internal_loading = false;
	}
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{...rest}
	bind:this={ref}
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={disabled || is_loading}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	class={cn(ui.base, rest.class)}
	onclick={onClickWrapper}
	data-loading={is_loading ? '' : undefined}
	data-disabled={href ? disabled : undefined}
>
	{@render content()}
</svelte:element>

{#snippet content()}
	{#if iconposition === 'leading' || leadingicon || is_loading}
		<Icon
			name={is_loading ? loadingicon : leadingicon || icon}
			class={cn(ui.leadingicon, iconposition === 'leading' && ui.icon)}
			data-loading={is_loading ? '' : undefined}
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
			class={cn(ui.trailingicon, iconposition === 'trailing' && ui.icon)}
			data-loading={is_loading ? '' : undefined}
			data-disabled={href ? disabled : undefined}
		/>
	{/if}
{/snippet}
