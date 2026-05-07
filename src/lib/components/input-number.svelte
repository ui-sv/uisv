<script module lang="ts">
	import {
		Button,
		type ButtonProps,
		type PropColor,
		type PropSize,
		type PropVariant,
	} from '$lib/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { tv, type ClassValue } from 'tailwind-variants';
	import { useId } from 'bits-ui';

	export type InputNumberProps = Omit<SvelteHTMLElements['input'], 'size' | 'value'> & {
		value?: number;
		placeholder?: string;
		color?: PropColor;
		variant?: Exclude<PropVariant, 'solid'>;
		size?: PropSize;
		highlight?: boolean;
		fixed?: boolean;
		orientation?: 'vertical' | 'horizontal';
		increment?: boolean | Omit<ButtonProps, 'href'>;
		decrement?: boolean | Omit<ButtonProps, 'href'>;
		autofocus?: boolean | number;
		min?: number;
		max?: number;
		step?: number;
		stepsnapping?: number;
		disabled?: boolean;
		required?: boolean;
		id?: string;
		name?: string;
		format?: Intl.NumberFormatOptions;
		wheelchange?: boolean;
		invertwheelchange?: boolean;
		focusonchange?: boolean;
		autocomplete?: 'on' | 'off' | string;
		ui?: {
			root?: ClassValue;
			base?: ClassValue;
			increment?: ClassValue;
			decrement?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		placeholder,
		color = 'primary',
		variant = 'outline',
		size = 'md',
		highlight,
		fixed,
		orientation = 'horizontal',
		increment = true,
		decrement = true,
		autofocus,
		min,
		max,
		step,
		stepsnapping,
		disabled,
		required,
		format,
		wheelchange = true,
		invertwheelchange,
		focusonchange,
		autocomplete,
		ui = {},
		...rest
	}: InputNumberProps = $props();
	const id = useId('uisv-in');

	const variants = $derived(
		tv({
			slots: {
				root: 'inline-flex relative items-center',
				base: 'outline-none',
				increment: '',
				decrement: '',
			},
			variants: {
				size: {
					xs: {},
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
				variant: {
					outline: {},
					subtle: {},
					soft: {},
					ghost: {},
					none: {},
				},
				color: {
					primary: {},
					surface: {},
					info: {},
					success: {},
					warning: {},
					error: {},
				},
				orientation: {
					horizontal: {},
					vertical: {},
				},
			},
			compoundVariants: [
				{
					color: 'primary',
					class: { base: 'bg-pimary-500' },
				},
			],
		})({ color, size, orientation, variant }),
	);

	$effect(() => {
		if (typeof value === 'string') value = parseInt(value) || undefined;
	});
</script>

<div class={variants.root({ class: ui.root })}>
	<input
		{...rest}
		{id}
		tabindex="0"
		bind:value
		type="text"
		inputmode="decimal"
		{autocomplete}
		autocorrect="off"
		spellcheck="false"
		{placeholder}
		{max}
		{min}
		{step}
		class={variants.base({ class: ui.base })}
	/>

	{#if orientation === 'horizontal'}
		{@render crements()}
	{:else}
		<div class="flex flex-col position">
			{@render crements()}
		</div>
	{/if}
</div>

{#snippet crements()}
	{#if increment}
		<Button
			variant="link"
			icon="i-lucide:minus"
			onclick={() => {
				value = value === undefined ? 0 : value - 1;
			}}
		/>
	{/if}

	{#if increment}
		<Button
			variant="link"
			icon="i-lucide:plus"
			onclick={() => {
				value = value === undefined ? 0 : value + 1;
			}}
		/>
	{/if}
{/snippet}
