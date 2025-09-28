<script lang="ts" module>
	export type ButtonVariant = 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost';

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
		loadingicon?: string;
		/** When true, the loading icon will be displayed. */
		loading?: boolean;
		/** When `true`, the icon will be displayed on the right side. */
		trailingicon?: boolean;
		/** Display an icon based on the `leading` and `trailing` props. */
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
		variant?: ButtonVariant;
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
			base?: ClassValue;
			icon?: ClassValue;
		};
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { Button } from 'bits-ui';
	// import { FORM_LOADING_CONTEXT_KEY } from '$lib/utils/keys.js';
	import { type Component, type Snippet } from 'svelte';
	import { isSnippet } from '$lib/utils/common.js';
	import { tv } from 'tailwind-variants';
	import type { ClassValue } from 'svelte/elements';
	import type { PropColor } from '$lib/types.js';

	// let form_loading = getContext<{ value: boolean } | undefined>(FORM_LOADING_CONTEXT_KEY);
	let {
		ref = $bindable(),
		size = 'md',
		variant = 'solid',
		color = 'primary',
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
		trailingicon,
		type
	}: ButtonProps = $props();

	let internal_loading = $state(false);
	const is_loading = $derived.by(() => {
		if (loading) return true;
		if (loadingauto) return internal_loading;
		return false;
	});

	const classes = $derived.by(() =>
		tv({
			slots: {
				icon: '',
				base: 'transition flex items-center font-sans'
			},
			variants: {
				color: {
					primary: '',
					secondary: '',
					error: '',
					success: '',
					info: '',
					warning: ''
				},
				variant: {
					link: '',
					solid: 'text-white',
					outline: 'border',
					soft: '',
					subtle: 'border',
					ghost: ''
				},
				size: {
					xs: {
						base: 'font-medium text-xs px-2 h-6 rounded gap-1',
						icon: 'size-4'
					},
					sm: { base: 'font-medium text-xs px-2 h-7 rounded gap-1', icon: 'size-4' },
					md: { base: 'font-medium text-sm rounded-md px-2 h-8 gap-2', icon: 'size-5' },
					lg: { base: 'font-medium text-sm px-3 h-9 rounded-md gap-2', icon: 'size-6' },
					xl: { base: 'font-medium px-3 h-10 rounded-md gap-2', icon: 'size-6' }
				},
				block: {
					true: 'w-full'
				},
				disabled: {
					true: 'cursor-not-allowed'
				}
			},
			compoundVariants: [
				{
					color: 'primary',
					variant: 'solid',
					class: 'bg-primary-500 hover:(bg-primary-400)'
				},
				{
					color: 'secondary',
					variant: 'solid',
					class: 'bg-secondary-900 hover:(bg-secondary-900)'
				},
				{
					color: 'info',
					variant: 'solid',
					class: 'bg-blue-500 hover:(bg-blue-400)'
				},
				{
					color: 'success',
					variant: 'solid',
					class: 'bg-green-500 hover:(bg-green-400)'
				},
				{
					color: 'error',
					variant: 'solid',
					class: 'bg-red-500 hover:(bg-red-400)'
				},
				{
					color: 'warning',
					variant: 'solid',
					class: 'bg-yellow-500 hover:(bg-yellow-400)'
				},

				{
					color: 'primary',
					variant: 'outline',
					class: 'border-primary-500 text-primary-500 hover:(bg-primary-50)'
				},
				{
					color: 'secondary',
					variant: 'outline',
					class: 'border-secondary-900 text-secondary-500 hover:(bg-secondary-50)'
				},
				{
					color: 'info',
					variant: 'outline',
					class: 'border-blue-500 text-blue-500 hover:(bg-blue-50)'
				},
				{
					color: 'success',
					variant: 'outline',
					class: 'border-green-500 text-green-500 hover:(bg-green-50)'
				},
				{
					color: 'error',
					variant: 'outline',
					class: 'border-red-500 text-red-500 hover:(bg-red-50)'
				},
				{
					color: 'warning',
					variant: 'outline',
					class: 'border-yellow-500 text-yellow-500 hover:(bg-yellow-50)'
				},

				{
					color: 'primary',
					variant: 'soft',
					class: ' bg-primary-50 text-primary-500 hover:(bg-primary-100)'
				},
				{
					color: 'secondary',
					variant: 'soft',
					class: 'bg-secondary-100 text-secondary-800 hover:(bg-secondary-50)'
				},
				{
					color: 'info',
					variant: 'soft',
					class: 'bg-blue-100 text-blue-500 hover:(bg-blue-50)'
				},
				{
					color: 'success',
					variant: 'soft',
					class: 'bg-green-100 text-green-500 hover:(bg-green-50)'
				},
				{
					color: 'error',
					variant: 'soft',
					class: 'bg-red-100 text-red-500 hover:(bg-red-50)'
				},
				{
					color: 'warning',
					variant: 'soft',
					class: 'bg-yellow-100 text-yellow-500 hover:(bg-yellow-50)'
				},

				{
					color: 'primary',
					variant: 'subtle',
					class: 'bg-primary-50 text-primary-500 border-primary-200 hover:(bg-primary-100)'
				},
				{
					color: 'secondary',
					variant: 'subtle',
					class: 'bg-secondary-50 text-secondary-800 border-secondary-300 hover:(bg-secondary-100)'
				},
				{
					color: 'info',
					variant: 'subtle',
					class: 'bg-blue-50 text-blue-600 border-blue-200 hover:(bg-blue-100)'
				},
				{
					color: 'success',
					variant: 'subtle',
					class: 'bg-green-100 text-green-600 border-green-300 hover:(bg-green-100)'
				},
				{
					color: 'error',
					variant: 'subtle',
					class: 'bg-red-50 text-red-600 border-red-200 hover:(bg-red-100)'
				},
				{
					color: 'warning',
					variant: 'subtle',
					class: 'bg-yellow-50 text-yellow-600 border-yellow-300 hover:(bg-yellow-100)'
				},

				{
					color: 'primary',
					variant: 'ghost',
					class: 'text-primary-500 hover:(bg-primary-100)'
				},
				{
					color: 'secondary',
					variant: 'ghost',
					class: 'text-secondary-900 hover:(bg-secondary-100)'
				},
				{
					color: 'info',
					variant: 'ghost',
					class: 'text-blue-600 hover:(bg-blue-100)'
				},
				{
					color: 'success',
					variant: 'ghost',
					class: 'text-green-600 hover:(bg-green-100)'
				},
				{
					color: 'error',
					variant: 'ghost',
					class: 'text-red-600 hover:(bg-red-100)'
				},
				{
					color: 'warning',
					variant: 'ghost',
					class: 'text-yellow-600 hover:(bg-yellow-100)'
				},

				{
					color: 'primary',
					variant: 'link',
					class: 'text-primary-500 hover:(text-primary-400)'
				},
				{
					color: 'secondary',
					variant: 'link',
					class: 'text-secondary-900 hover:(text-secondary-900)'
				},
				{
					color: 'info',
					variant: 'link',
					class: 'text-blue-500 hover:(text-blue-400)'
				},
				{
					color: 'success',
					variant: 'link',
					class: 'text-green-500 hover:(text-green-400)'
				},
				{
					color: 'error',
					variant: 'link',
					class: 'text-red-500 hover:(text-red-400)'
				},
				{
					color: 'warning',
					variant: 'link',
					class: 'text-yellow-500 hover:(text-yellow-400)'
				}
			]
		})({ variant, color, size, block, disabled: disabled || is_loading })
	);

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
		class={[classes.base(), !children && icon ? 'px-0 aspect-square' : '', ui.base]}
		onclick={onClickWrapper}
	>
		{@render Inside()}
	</a>
{:else}
	<Button.Root
		{type}
		disabled={disabled || is_loading}
		class={[classes.base(), !children && icon ? 'px-0 aspect-square' : '', ui.base]}
		onclick={onClickWrapper}
	>
		{@render Inside()}
	</Button.Root>
{/if}

{#snippet Inside()}
	{#if !trailingicon}
		{@render Icon()}
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if trailingicon}
		{@render Icon()}
	{/if}
{/snippet}

{#snippet Icon()}
	{@const IconCom = is_loading ? loadingicon || 'i-lucide-loader-circle' : icon}

	{#if IconCom}
		{#if typeof IconCom === 'string'}
			<div class={['pi', IconCom, is_loading ? 'animate-spin' : '', classes.icon(), ui.icon]}></div>
		{:else if isSnippet(IconCom)}
			{@render IconCom()}
		{:else}
			<IconCom />
		{/if}
	{/if}
{/snippet}
