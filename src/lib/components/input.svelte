<script module lang="ts">
	import { type PropColor, type PropVariant, isComponent, isSnippet } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { maska } from 'maska/svelte';
	import { type MaskInputOptions } from 'maska';
	import { tv, type ClassValue } from 'tailwind-variants';

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
		variant?: Exclude<PropVariant, 'solid'>;
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
		icon?: string | Component;
		iconposition?: 'leading' | 'trailing';
		leading?: string | Component | Snippet;
		trailing?: string | Component | Snippet;
		loading?: boolean;
		loadingicon?: string | Component;
		mask?: string | MaskInputOptions;
		ui?: {
			root?: ClassValue;
			base?: ClassValue;
			leading?: ClassValue;
			icon?: ClassValue;
			trailing?: ClassValue;
		};
	};
</script>

<script lang="ts">
	import Icon from './icon.svelte';

	let {
		type,
		value = $bindable(),
		color = 'primary',
		variant = 'outline',
		size = 'md',
		icon,
		iconposition,
		disabled,
		highlight,
		leading,
		loading,
		loadingicon = 'i-lucide-loader-circle',
		required,
		trailing,
		mask,
		ui = {},
		...rest
	}: InputProps = $props();
	const id = $props.id();

	const variants = $derived(
		tv({
			slots: {
				root: 'inline-flex items-center rounded transition-all ring ring-inset ring-transparent',
				base: 'appearance-none outline-none placeholder:text-label-muted',
				leading: 'text-label-muted flex items-center',
				trailing: 'text-label-muted flex items-center',
				icon: '',
			},
			variants: {
				fieldGroup: {
					horizontal: {
						root: '',
						base: '',
					},
					vertical: {
						root: '',
						base: '',
					},
				},
				size: {
					xs: {
						base: 'px-2 py-1 text-xs gap-1',
						leading: 'ps-2',
						trailing: 'pe-2',
						icon: 'size-4',
					},
					sm: {
						base: 'px-2.5 py-1.5 text-xs gap-1.5',
						leading: 'ps-2.5',
						trailing: 'pe-2.5',
						icon: 'size-4',
					},
					md: {
						base: 'px-2.5 py-1.5 text-sm gap-1.5',
						leading: 'ps-2.5',
						trailing: 'pe-2.5',
						icon: 'size-5',
					},
					lg: {
						base: 'px-3 py-2 text-sm gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						icon: 'size-5',
					},
					xl: {
						base: 'px-3 py-2 text-base gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						icon: 'size-6',
					},
				},
				variant: {
					outline: { root: 'ring ring-dimmed' },
					soft: {
						root: 'bg-surface-muted hover:bg-surface-elevated focus-within:bg-surface-elevated',
					},
					subtle: { root: 'bg-surface-muted ring ring-dimmed' },
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
					file: 'file:me-1.5 file:font-medium file:text-label-muted file:outline-none',
				},
			},
			compoundVariants: [
				{
					color: 'primary',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-primary-500 focus-within:ring-2',
					},
				},
				{
					color: 'surface',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-surface-inverted focus-within:ring-2',
					},
				},
				{
					color: 'info',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-info-500 focus-within:ring-2',
					},
				},
				{
					color: 'success',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-success-500 focus-within:ring-2',
					},
				},
				{
					color: 'warning',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-warning-500 focus-within:ring-2',
					},
				},
				{
					color: 'error',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:ring-error-500 focus-within:ring-2',
					},
				},
			],
		})({
			size,
			color,
			variant,
			highlight,
			loading,
			leading: !!leading || (!!icon && iconposition === 'leading') || loading,
			trailing: !!trailing || (!!icon && iconposition === 'trailing'),
			type: type === 'file' ? 'file' : undefined,
		}),
	);
</script>

<div class={variants.root({ class: ui.root })}>
	{#if leading || (icon && iconposition === 'leading') || loading}
		{@const TrailingIcon = loading ? loadingicon : icon}

		<span class={variants.leading({ class: ui.leading })}>
			{#if !!leading && !loading}
				{#if typeof leading === 'string'}
					{leading}
				{:else if isSnippet(leading)}
					{@render leading()}
				{:else if isComponent(leading)}
					{@const Leading = leading}
					<Leading />
				{/if}
			{:else}
				<Icon
					name={TrailingIcon}
					class={variants.icon({ class: [loading ? 'animate-spin' : ''] })}
				/>
			{/if}
		</span>
	{/if}

	<input
		{id}
		{type}
		{...rest}
		class={variants.base({ class: [ui.base] })}
		{...rest}
		use:maska={mask}
	/>

	{#if trailing || (icon && iconposition === 'trailing')}
		<span class={variants.trailing({ class: ui.trailing })}>
			{#if !!trailing}
				{#if typeof trailing === 'string'}
					{trailing}
				{:else if isComponent(trailing)}
					{@const Trailing = trailing}
					<Trailing />
				{:else if isSnippet(trailing)}
					{@render trailing()}
				{/if}
			{:else if typeof icon === 'string'}
				<div
					class={variants.icon({
						class: [icon, ui.icon],
					})}
				></div>
			{:else if isSnippet(icon)}
				{@render icon()}
			{:else if isComponent(icon)}
				{@const Icon = icon}
				<Icon class={variants.icon({ class: [ui.icon] })} />
			{/if}
		</span>
	{/if}
</div>
