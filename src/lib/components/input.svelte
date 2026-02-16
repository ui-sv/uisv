<script module lang="ts">
	import { type PropColor, isComponent, isSnippet } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';
	import { maska } from 'maska/svelte';
	import { type MaskInputOptions } from 'maska';
	import { tv } from 'tailwind-variants';

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
</script>

<script lang="ts">
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
				base: 'appearance-none outline-none placeholder:text-muted',
				leading: 'text-muted',
				trailing: 'text-muted',
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
					subtle: { root: 'ring ring-dimmed' },
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
					class: {
						root: 'focus-within:(ring-primary-500 ring-2)',
					},
				},
				{
					color: 'surface',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:(ring-surface-800 ring-2)',
					},
				},
				{
					color: 'info',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:(ring-info-500 ring-2)',
					},
				},
				{
					color: 'success',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:(ring-success-500 ring-2)',
					},
				},
				{
					color: 'warning',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:(ring-warning-500 ring-2)',
					},
				},
				{
					color: 'error',
					variant: ['outline', 'subtle'],
					class: {
						root: 'focus-within:(ring-error-500 ring-2)',
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
			{:else if typeof TrailingIcon === 'string'}
				<div
					class={variants.icon({
						class: [loading && 'animate-spin', TrailingIcon, ui.icon],
					})}
				></div>
			{:else if isSnippet(TrailingIcon)}
				{@render TrailingIcon()}
			{:else if isComponent(TrailingIcon)}
				<TrailingIcon class={variants.icon({ class: [ui.icon] })} />
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
				{:else if isSnippet(trailing)}
					{@render trailing()}
				{:else if isComponent(trailing)}
					{@const Trailing = trailing}
					<Trailing />
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
