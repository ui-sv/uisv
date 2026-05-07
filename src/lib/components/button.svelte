<script module lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import { isComponent, type PropColor, type PropVariant } from '$lib/index.js';
	// import { FORM_LOADING_CONTEXT_KEY } from '$lib/utils/keys.js';
	import { isSnippet } from '$lib/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { tv, type ClassValue } from 'tailwind-variants';

	export type ButtonProps = SvelteHTMLElements['button'] & {
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
		leadingicon?: string | Snippet | Component;
		trailingicon?: string | Snippet | Component;
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
</script>

<script lang="ts">
	// let form_loading = getContext<{ value: boolean } | undefined>(FORM_LOADING_CONTEXT_KEY);
	let {
		ref = $bindable(),
		size = 'md',
		variant = 'solid',
		color = 'primary',
		iconposition = 'left',
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
		loadingicon = 'i-lucide-loader-circle',
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
		tv({
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
		})({ variant, color, size, block, disabled: disabled || is_loading }),
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
	data-button-root
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
	{#if iconposition === 'left' || leadingicon}
		{@render Icon(is_loading ? loadingicon : leadingicon || icon, ui.leadingicon)}
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if iconposition !== 'left' || trailingicon}
		{@render Icon(trailingicon || icon, ui.trailingicon)}
	{/if}
</svelte:element>

{#snippet Icon(IconProp?: string | Snippet | Component, classvalue?: ClassValue)}
	{#if typeof IconProp === 'string'}
		<div
			class={classnames.icon({
				class: [is_loading && 'animate-spin', IconProp, ui.icon, classvalue],
			})}
		></div>
	{:else if isSnippet(IconProp)}
		{@render IconProp()}
	{:else if isComponent(IconProp)}
		<IconProp />
	{/if}
{/snippet}
