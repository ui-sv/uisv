<script module lang="ts">
	import { type Component, type Snippet } from 'svelte';
	import { type PropColor } from '$lib/index.js';
	import type { ClassNameValue } from 'tailwind-merge';
	// import { FORM_LOADING_CONTEXT_KEY } from '$lib/utils/keys.js';
	import { isSnippet } from '$lib/index.js';
	import { tv } from 'tailwind-variants';

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
		onclick,
		ui = {},
		disabled,
		href,
		icon,
		loading,
		loadingicon,
		target,
		type,
	}: ButtonProps = $props();

	let internal_loading = $state(false);
	const is_loading = $derived.by(() => {
		if (loading) return true;
		if (loadingauto) return internal_loading;
		return false;
	});

	const variants = $derived(
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
		})({ variant, color, size, block, disabled: disabled || is_loading }),
	);

	const only_icon = $derived(!(children || label) && !!icon);

	async function onClickWrapper(event: MouseEvent) {
		if (!onclick) return;
		internal_loading = true;

		await onclick(event);

		internal_loading = false;
	}
</script>

{#if href}
	<a
		{href}
		{target}
		class={variants.base({
			class: [only_icon ? 'px-0 aspect-square justify-center' : '', 'cursor-pointer', ui.base],
		})}
		onclick={onClickWrapper}
	>
		{@render Content()}
	</a>
{:else}
	<button
		{type}
		disabled={disabled || is_loading}
		class={variants.base({
			class: [only_icon ? 'px-0 aspect-square justify-center' : '', ui.base],
		})}
		onclick={onClickWrapper}
	>
		{@render Content()}
	</button>
{/if}

{#snippet Content()}
	{#if iconposition === 'left'}
		{@render Icon()}
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if iconposition !== 'left'}
		{@render Icon()}
	{/if}
{/snippet}

{#snippet Icon()}
	{@const IconCom = is_loading ? loadingicon || '-ph-lucide-loader-circle' : icon}

	{#if IconCom}
		{#if typeof IconCom === 'string'}
			<div class={variants.icon({ class: [is_loading && 'animate-spin', IconCom, ui.icon] })}></div>
		{:else if isSnippet(IconCom)}
			{@render IconCom()}
		{:else}
			<IconCom />
		{/if}
	{/if}
{/snippet}
