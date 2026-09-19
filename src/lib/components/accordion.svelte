<script module lang="ts">
	import { getAppContext } from '../contexts.js';
	import { Accordion } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { Icon, isComponent, isSnippet } from '../index.js';
	import { boolAttr } from 'runed';

	export type AccordionItem = {
		label: string;
		icon?: string | Component;
		content: string | Snippet<[{ item: AccordionItem; index: number; open: boolean }]> | Component;
		value?: string;
		disabled?: boolean;
	};

	export type AccordionProps = {
		value?: string | string[];
		ref?: HTMLDivElement | null;
		items: AccordionItem[];
		orientation?: 'horizontal' | 'vertical';
		collapsible?: boolean;
		disabled?: boolean;
		type?: 'single' | 'multiple';
		icon?: string | Snippet | Component;
		trigger?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		ui?: {
			root?: ClassValue;
			item?: ClassValue;
			header?: ClassValue;
			trigger?: ClassValue;
			content?: ClassValue;
			icon?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		ref = $bindable(null),
		items,
		type = 'single',
		icon = getAppContext().icons.chevrondown,
		ui = {},
		orientation = 'vertical',
		trigger: trigger_snippet,
		disabled,
		...rest
	}: AccordionProps = $props();

	const current_value = $derived.by(() => {
		if (type === 'single') return !value ? [] : [value as string];
		return !value ? [] : (value as string[]);
	});
</script>

<Accordion.Root
	bind:value
	bind:ref
	{type}
	{orientation}
	class={cn('uisv-accordion', ui.root)}
	{...rest as any}
	data-disabled={boolAttr(disabled)}
>
	{#each items as item, index (index)}
		{@const item_value = item.value || index.toString()}
		{@const selected = current_value.includes(item_value) || false}
		{@const state = selected ? 'open' : 'closed'}

		<Accordion.Item
			value={item_value}
			class={cn('uisv-accordion-item', ui.item)}
			data-state={state}
			data-disabled={boolAttr(disabled)}
		>
			<Accordion.Header
				class={cn('uisv-accordion-header', ui.header)}
				data-state={state}
				data-disabled={boolAttr(disabled)}
			>
				<Accordion.Trigger
					class={cn('uisv-accordion-trigger', ui.trigger)}
					data-state={state}
					data-disabled={boolAttr(disabled)}
				>
					{#if trigger_snippet}
						{@render trigger_snippet({
							item,
							index,
							open: selected,
						})}
					{:else}
						{item.label}

						{#if isSnippet(icon)}
							{@render icon()}
						{:else}
							<Icon name={icon} class={cn(ui.icon)} data-state={state} />
						{/if}
					{/if}
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content class={cn('uisv-accordion-content', ui.content)}>
				{#if isSnippet(item.content)}
					{@render item.content({ item, index, open: selected })}
				{:else if isComponent(item.content)}
					{@const Content = item.content}
					<Content />
				{:else}
					{item.content}
				{/if}
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
