<script module lang="ts">
	import { type PropColor, isComponent, isSnippet } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import { tv, type ClassValue } from 'tailwind-variants';
	import type { Component } from 'vitest-browser-svelte';

	export type CheckboxProps = {
		value?: boolean | 'intermediate';
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		disabled?: boolean;
		icon?: string | Snippet | Component;
		intermediateicon?: string | Snippet | Component;
		label?: string | Snippet;
		description?: string | Snippet;
		required?: boolean;
		indicator?: 'start' | 'end' | 'hidden';
		as?: string;
		ui?: {
			root?: ClassValue;
			container?: ClassValue;
			icon?: ClassValue;
			label?: ClassValue;
			description?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(false),
		color = 'primary',
		size = 'md',
		disabled,
		icon = 'i-lucide-check',
		intermediateicon = 'i-lucide-minus',
		label,
		description,
		required,
		indicator = 'start',
		as = 'div',
		ui = {},
	}: CheckboxProps = $props();
	const id = $props.id();

	const variants = $derived.by(() =>
		tv({
			slots: {
				root: 'relative flex-inline gap-2',
				container:
					'rounded-md border border-surface-accented relative transition m-0.5 mr-0 grid place-items-center',
				icon: 'pi text-white',
				label: 'text-sm font-medium',
				description: 'text-sm text-label-muted',
			},
			variants: {
				color: {
					primary: {
						container: [value && 'bg-primary-500 border-primary-500 text-primary-500'],
					},
					surface: {
						container: [
							value && 'bg-surface-inverted border-surface-inverted text-surface-inverted',
						],
					},
					info: {
						container: [value && 'bg-info-500 border-info-500 text-info-500'],
					},
					success: {
						container: [value && 'bg-success-500 border-success-500 text-success-500'],
					},
					warning: {
						container: [value && 'bg-warning-500 border-warning-500 text-warning-500'],
					},
					error: {
						container: [value && 'bg-error-500 border-error-500 text-error-500'],
					},
				},
				size: {
					xs: {
						container: 'size-3',
						icon: 'size-3',
					},
					sm: {
						container: 'size-3.5',
						icon: 'size-3.5',
					},
					md: {
						container: 'size-4',
						icon: 'size-4',
					},
					lg: {
						container: 'size-4.5',
						icon: 'size-4.5',
					},
					xl: {
						container: 'size-5',
						icon: 'size-5',
					},
				},
				indicator: {
					start: '',
					end: {
						root: 'flex-row-reverse',
					},
					hidden: {
						container: 'hidden',
					},
				},
			},
			compoundVariants: [],
		})({ color, size, indicator }),
	);
</script>

<svelte:element
	this={as}
	data-state={value ? 'checked' : 'unchecked'}
	class={variants.root({
		class: [disabled && 'opacity-50', ui.root],
	})}
>
	<button
		{id}
		aria-label="checkbox"
		class={variants.container({ class: [ui.container] })}
		onclick={() => {
			if (disabled) return;
			if (value === 'intermediate') return (value = true);
			value = !value;
		}}
	>
		{@render Icon(icon, [value !== true && 'opacity-0'])}
		{@render Icon(intermediateicon, [value !== 'intermediate' && 'opacity-0'])}
	</button>

	{#if label}
		<div class="flex flex-col justify-start">
			<label
				for={id}
				class={variants.label({
					class: [required ? 'after:content-["*"] after:text-error-500' : '', ui.label],
				})}
			>
				{#if typeof label === 'string'}
					{label}
				{:else}
					{@render label()}
				{/if}
			</label>

			{#if description}
				<div class={variants.description({ class: ui.description })}>
					{#if typeof description === 'string'}
						{description}
					{:else}
						{@render description()}
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</svelte:element>

{#snippet Icon(ico?: CheckboxProps['icon'], icon_class?: ClassValue)}
	<div class={['absolute', icon_class]}>
		{#if typeof ico === 'string'}
			<div class={variants.icon({ class: [ico, ui.icon] })}></div>
		{:else if isSnippet(ico)}
			{@render ico()}
		{:else if isComponent(ico)}
			{@const Iconn = ico}
			<Iconn />
		{/if}
	</div>
{/snippet}
