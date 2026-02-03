<script module lang="ts">
	import { type PropColor, isComponent, isSnippet } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import type { Component } from 'vitest-browser-svelte';

	export type SwitchProps = {
		value?: boolean;
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		disabled?: boolean;
		loading?: boolean;
		loadingicon?: string | Snippet | Component;
		uncheckedicon?: string | Snippet | Component;
		checkedicon?: string | Snippet | Component;
		label?: string | Snippet;
		description?: string | Snippet;
		required?: boolean;
		ui?: {
			root?: ClassNameValue;
			container?: ClassNameValue;
			thumb?: ClassNameValue;
			label?: ClassNameValue;
			description?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(false),
		color = 'primary',
		size = 'md',
		disabled,
		loading,
		loadingicon = 'i-lucide-loader-circle',
		uncheckedicon,
		checkedicon,
		label,
		description,
		required,
		ui = {},
	}: SwitchProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: 'flex-inline gap-2',
				container: 'rounded-full bg-neutral-200 p-0.5 relative transition',
				thumb: [
					'bg-white block rounded-full absolute top-0.5 transition grid place-items-center',
					value ? 'translate-x-full' : 'text-neutral-500',
				],
				icon: 'pi',
				label: 'text-sm',
				description: 'text-sm text-neutral-500',
			},
			variants: {
				color: {
					primary: {
						container: ['', value && 'bg-primary-500 text-primary-500'],
					},
					surface: {
						container: ['', value && 'bg-neutral-900 text-neutral-900'],
					},
					info: {
						container: ['', value && 'bg-info-500 text-info-500'],
					},
					success: {
						container: ['', value && 'bg-success-500 text-success-500'],
					},
					warning: {
						container: ['', value && 'bg-warning-500 text-warning-500'],
					},
					error: {
						container: ['', value && 'bg-error-500 text-error-500'],
					},
				},
				size: {
					xs: {
						container: 'w-7 min-w-7 h-4',
						thumb: 'size-3',
						icon: 'size-2.5',
					},
					sm: {
						container: 'w-8 min-w-8 h-4.5',
						thumb: 'size-3.5',
						icon: 'size-3',
					},
					md: {
						container: 'w-9 min-w-9 h-5',
						thumb: 'size-4',
						icon: 'size-3.5',
					},
					lg: {
						container: 'w-10 min-w-10 h-5.5',
						thumb: 'size-4.5',
						icon: 'size-4',
					},
					xl: {
						container: 'w-11  min-w-11 h-6',
						thumb: 'size-5',
						icon: 'size-4.5',
					},
				},
			},
			compoundVariants: [],
		})({ color, size }),
	);
</script>

<div
	data-state={value ? 'checked' : 'unchecked'}
	class={classes.root({
		class: [(loading || disabled) && 'opacity-50', ui.thumb],
	})}
>
	<button
		aria-label="switch"
		data-state={value ? 'checked' : 'unchecked'}
		class={classes.container({ class: [loading && 'cursor-not-allowed', ui.thumb] })}
		onclick={() => {
			console.log('click');
			if (loading) return;
			value = !value;
		}}
	>
		<span data-state={value ? 'checked' : 'unchecked'} class={classes.thumb({ class: ui.thumb })}>
			{@render Icon(uncheckedicon, [(loading || value) && 'opacity-0'])}
			{@render Icon(checkedicon, [(loading || !value) && 'opacity-0'])}
			{@render Icon(loadingicon || 'i-lucide-loader-circle', [
				'animate-spin',
				!loading && 'opacity-0',
			])}
		</span>
	</button>

	{#if label}
		<span>
			<div
				class={classes.label({
					class: [required ? 'after:content-["*"] after:text-error-500' : '', ui.thumb],
				})}
			>
				{#if typeof label === 'string'}
					{label}
				{:else}
					{@render label()}
				{/if}
			</div>

			{#if description}
				<div class={classes.description({ class: ui.thumb })}>
					{#if typeof description === 'string'}
						{description}
					{:else}
						{@render description()}
					{/if}
				</div>
			{/if}
		</span>
	{/if}
</div>

{#snippet Icon(ico?: SwitchProps['checkedicon'], icon_class?: ClassNameValue)}
	<div class={['absolute', icon_class]}>
		{#if typeof ico === 'string'}
			<div
				data-state={value ? 'checked' : 'unchecked'}
				class={classes.icon({ class: [ico] })}
			></div>
		{:else if isSnippet(ico)}
			{@render ico()}
		{:else if isComponent(ico)}
			{@const Iconn = ico}
			<Iconn />
		{/if}
	</div>
{/snippet}
