<script module lang="ts">
	import { Tabs } from 'bits-ui';
	import { isComponent, isSnippet, useElementRects, type PropColor } from '$lib/index.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import { type Component, type Snippet } from 'svelte';
	import Icon from '@iconify/svelte';
	import { ElementRect } from 'runed';

	export type TabItem =
		| string
		| {
				label: string;
				icon?: string | Component | Snippet;
				iconposition?: 'before' | 'after';
				content?: string | Component;
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
		[k: `content_${string}`]: Snippet<[{ item: TabItem; value: number }]>;
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
		...rest
	}: TabsProps = $props();

	let container_el = $state<HTMLElement | null>(null);
	const container_rect = new ElementRect(() => container_el);
	let item_els = $state<HTMLElement[]>([]);
	const rects = useElementRects(() => item_els);
	const rect = $derived.by(() => {
		const result = { w: 0, h: 0, l: 0, t: 0 };

		if (rects[value]) {
			result.w = rects[value].width;
			result.l = rects[value].left - container_rect.left;
			result.h = rects[value].height;
			result.t = rects[value].top - container_rect.top;
		}

		return result;
	});

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: '',
				list: 'flex relative p-1',
				item: 'flex items-center justify-center text-muted data-[state="inactive"]:hover:(text-highlighted) font-medium z-1 transition-all',
				icon: '',
				content: 'mt-2',
				indicator: 'absolute z-0 transition-all duration-200 rounded-md w---width',
			},
			variants: {
				variant: {
					pill: {
						list: 'bg-surface-elevated rounded-lg',
						item: 'flex-1 data-[state="active"]:(text-inverted)',
						trigger: 'flex-1',
						indicator: 'rounded-md shadow-xs',
					},
					link: {
						list: 'border-b border-surface-accented',
						item: '',
						indicator: 'rounded-full -bottom-px',
						trigger: 'focus:outline-none',
					},
				},
				color: {
					primary: {
						item: 'data-[variant="link"]:data-[state="active"]:text-primary-500',
						indicator: 'bg-primary-500',
					},
					surface: {
						item: 'data-[variant="link"]:data-[state="active"]:text-surface-500',
						indicator: 'bg-surface-900',
					},
					info: {
						item: 'data-[variant="link"]:data-[state="active"]:text-info-500',
						indicator: 'bg-info-500',
					},
					success: {
						item: 'data-[variant="link"]:data-[state="active"]:text-success-500',
						indicator: 'bg-success-500',
					},
					warning: {
						item: 'data-[variant="link"]:data-[state="active"]:text-warning-500',
						indicator: 'bg-warning-500',
					},
					error: {
						item: 'data-[variant="link"]:data-[state="active"]:text-error-500',
						indicator: 'bg-error-500',
					},
				},
				size: {
					xs: {
						list: 'text-xs',
						item: 'min-h-6 gap-1 px-2',
						icon: 'size-4',
					},
					sm: {
						list: 'text-xs',
						item: 'min-h-7 gap-1 px-3',
						icon: 'size-4',
					},
					md: {
						list: 'text-sm',
						item: 'min-h-8 gap-2 px-4',
						icon: 'size-5',
					},
					lg: {
						list: 'text-sm',
						item: 'min-h-9 gap-2 px-4',
						icon: 'size-5',
					},
					xl: {
						list: '',
						item: 'min-h-10 gap-4 px-5',
						icon: 'size-6',
					},
				},
				orientation: {
					horizontal: {
						indicator: 'h-px left---left',
					},
					vertical: {
						root: '',
						list: 'flex-col',
						indicator: 'h-(--height) top-(--top)',
					},
				},
			},
			compoundVariants: [
				{ size: 'xs', variant: 'pill', class: { indicator: 'h-6' } },
				{ size: 'sm', variant: 'pill', class: { indicator: 'h-7' } },
				{ size: 'md', variant: 'pill', class: { indicator: 'h-8' } },
				{ size: 'lg', variant: 'pill', class: { indicator: 'h-9' } },
				{ size: 'xl', variant: 'pill', class: { indicator: 'h-10' } },
				{
					size: 'xs',
					variant: 'link',
					orientation: 'vertical',
					class: { indicator: 'h-6' },
				},
				{ size: 'sm', variant: 'link', orientation: 'vertical', class: { indicator: 'h-7' } },
				{ size: 'md', variant: 'link', orientation: 'vertical', class: { indicator: 'h-8' } },
				{ size: 'lg', variant: 'link', orientation: 'vertical', class: { indicator: 'h-9' } },
				{ size: 'xl', variant: 'link', orientation: 'vertical', class: { indicator: 'h-10' } },
				{
					orientation: 'vertical',
					variant: 'link',
					class: { list: 'border-b-0 border-l', indicator: 'w-px -left-px' },
				},
			],
		})({ color, size, orientation, variant }),
	);
</script>

<Tabs.Root
	{disabled}
	bind:value={() => value.toString(), (v) => (value = parseInt(v))}
	class={classes.root({ class: ui.root })}
	{orientation}
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
				data-variant={variant}
			>
				{@render RenderIcon(typeof item === 'string' ? undefined : item.icon)}

				{label}
			</Tabs.Trigger>
		{/each}

		<span
			class={classes.indicator({ class: ui.indicator })}
			style:--width="{rect.w}px"
			style:--left="{rect.l}px"
			style:--height="{rect.w}px"
			style:--top="{rect.t}px"
		></span>
	</Tabs.List>
	{#each items as item, idx (idx)}
		{#if typeof item === 'object' && item.content}
			{@const Content = item.content}
			<Tabs.Content value={idx.toString()} class={classes.content({ class: ui.content })}>
				{#if `content_${idx}` in rest}
					{@render rest[`content_${idx}`]({ item, value: idx })}
				{:else if typeof Content === 'string'}
					{Content}
				{:else if isComponent(Content)}
					<Content />
				{/if}
			</Tabs.Content>
		{/if}
	{/each}
</Tabs.Root>

{#snippet RenderIcon(IconProp?: string | Component | Snippet)}
	{#if isSnippet(IconProp)}
		{@render IconProp()}
	{:else if isComponent(IconProp)}
		<IconProp class={classes.icon({ class: ui.icon })} />
	{:else if typeof IconProp === 'string'}
		<Icon icon={IconProp} class={classes.icon({ class: ui.icon })} />
	{/if}
{/snippet}
