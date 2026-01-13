<script module lang="ts">
	import { Tabs } from 'bits-ui';
	import { isComponent, isSnippet, type PropColor } from '$lib/index.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import type { Component, Snippet } from 'svelte';

	export type TabItem =
		| string
		| {
				label: string;
				icon?: string | Component | Snippet;
				iconposition?: 'before' | 'after';
				content?: string | Component | Snippet<[{ item: TabItem; value: number }]>;
		  };

	export type TabsProps = {
		value?: number;
		items: TabItem[];
		color?: PropColor;
		variant?: 'link' | 'pill';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		disabled?: boolean;
		orientation?: 'vertical' | 'horizontal';
		ui?: {
			root?: ClassNameValue;
			item?: ClassNameValue;
			list?: ClassNameValue;
			content?: ClassNameValue;
			icon?: ClassNameValue;
			indicator?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(0),
		items = [],
		color = 'primary',
		variant = 'pill',
		size = 'md',
		disabled,
		orientation = 'horizontal',
		ui = {},
	}: TabsProps = $props();

	let container_el = $state<HTMLElement | null>(null);
	let item_els = $state<HTMLElement[]>([]);
	const bounding = $state({ w: 0, h: 0, l: 0, t: 0 });

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: 'w-full',
				list: 'flex w-full relative bg-surface-100 rounded-lg p-1',
				item: 'text-surface-500 font-medium flex-1 z-1 transition-all data-[state="inactive"]:hover:(text-surface-700) data-[state="active"]:(text-white)',
				icon: '',
				content: 'mt-2',
				indicator: 'absolute z-0 transition-all duration-200 rounded-md',
			},
			variants: {
				color: {
					primary: {
						indicator: 'bg-primary-500',
					},
					surface: {
						indicator: 'bg-surface-900',
					},
					info: {
						indicator: 'bg-info-500',
					},
					success: {
						indicator: 'bg-success-500',
					},
					warning: {
						indicator: 'bg-warning-500',
					},
					error: {
						indicator: 'bg-error-500',
					},
				},
				size: {
					xs: {
						list: 'h-8 text-xs',
					},
					sm: {
						list: 'h-9 text-xs',
					},
					md: {
						list: 'h-10 text-sm',
					},
					lg: {
						list: 'h-11 text-sm',
					},
					xl: {
						list: 'h-12',
					},
				},
				orientation: {
					horizontal: {
						indicator: 'w-(--width) left-(--left)',
					},
					vertical: {
						indicator: 'h-(--height) left-(--top)',
					},
				},
				variant: {
					pill: {
						list: 'bg-surface-elevated rounded-lg',
						trigger: 'flex-1',
						indicator: 'rounded-md shadow-xs',
					},
					link: {
						list: 'border-default',
						indicator: 'rounded-full',
						trigger: 'focus:outline-none',
					},
				},
			},
			compoundVariants: [
				{ orientation: 'horizontal', size: 'xs', class: { indicator: 'h-6' } },
				{ orientation: 'horizontal', size: 'sm', class: { indicator: 'h-7' } },
				{ orientation: 'horizontal', size: 'md', class: { indicator: 'h-8' } },
				{ orientation: 'horizontal', size: 'lg', class: { indicator: 'h-9' } },
				{ orientation: 'horizontal', size: 'xl', class: { indicator: 'h-10' } },
				{ orientation: 'vertical', size: 'xs', class: { indicator: 'w-6' } },
				{ orientation: 'vertical', size: 'sm', class: { indicator: 'w-7' } },
				{ orientation: 'vertical', size: 'md', class: { indicator: 'w-8' } },
				{ orientation: 'vertical', size: 'lg', class: { indicator: 'w-9' } },
				{ orientation: 'vertical', size: 'xl', class: { indicator: 'w-10' } },
			],
		})({ color, size, orientation }),
	);

	function zero() {
		bounding.h = 0;
		bounding.t = 0;
		bounding.w = 0;
		bounding.l = 0;
	}

	$effect(() => {
		if (!item_els[value] || !container_el) return zero();
		const container_rect = container_el.getBoundingClientRect();
		const rect = item_els[value].getBoundingClientRect();

		bounding.w = rect.width;
		bounding.l = rect.left - container_rect.left;
		bounding.h = rect.height;
		bounding.t = rect.top - container_rect.top;
	});
</script>

<Tabs.Root
	bind:value={() => value.toString(), (v) => (value = parseInt(v))}
	class={classes.root({ class: ui.root })}
>
	<Tabs.List bind:ref={container_el} class={classes.list({ class: ui.list })}>
		{#each items as item, idx (idx)}
			{@const label = typeof item === 'string' ? item : item.label}

			<Tabs.Trigger
				bind:ref={
					() => {
						if (item_els[idx]) return item_els[idx];
						if (typeof document !== 'undefined') return document.createElement('div');
					},
					(v) => {
						if (v) item_els[idx] = v;
					}
				}
				value={idx.toString()}
				class={classes.item({ class: ui.item })}
			>
				{@render RenderIcon(typeof item === 'string' ? undefined : item.icon)}

				{label}
			</Tabs.Trigger>
		{/each}

		<span
			class={classes.indicator({ class: ui.indicator })}
			style:--width="{bounding.w}px"
			style:--left="{bounding.l}px"
			style:--height="{bounding.w}px"
			style:--top="{bounding.t}px"
		></span>
	</Tabs.List>
	{#each items as item, idx (idx)}
		{#if typeof item === 'object' && item.content}
			<Tabs.Content value={idx.toString()} class={classes.content({ class: ui.content })}>
				{#if isSnippet(item.content)}
					{@render item.content()}
				{:else if isComponent(item.content)}
					{@const C = item.content}
					<C />
				{:else}
					{item.content}
				{/if}
			</Tabs.Content>
		{/if}
	{/each}
</Tabs.Root>

{#snippet RenderIcon(Icon?: string | Component | Snippet)}
	{#if isSnippet(Icon)}
		{@render Icon()}
	{:else if isComponent(Icon)}
		<Icon class={classes.icon({ class: ui.icon })} />
	{:else}{/if}
{/snippet}
