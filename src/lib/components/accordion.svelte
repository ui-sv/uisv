<script module lang="ts">
	import { getAppContext } from '../contexts.js';
	import { Accordion } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import { cn, tv, type ClassValue } from 'tailwind-variants';

	export type AccordionItem = {
		label: string;
		icon?: string | Snippet | Component;
		trailingicon?: string | Snippet | Component;
		content: string;
		value?: string;
		disabled?: boolean;
	};
	export type AccordionProps = {
		value?: string | string[];
		items: AccordionItem[];
		collapsible?: boolean;
		disabled?: boolean;
		type?: 'single' | 'multiple';
		trailingicon?: string | Snippet | Component;
		leading?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		default?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		trailing?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		content?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		body?: Snippet<[{ item: AccordionItem; index: number; open: boolean }]>;
		ui?: {
			root?: ClassValue;
			item?: ClassValue;
			header?: ClassValue;
			trigger?: ClassValue;
			content?: ClassValue;
			body?: ClassValue;
			leadingicon?: ClassValue;
			trailingicon?: ClassValue;
			label?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		items,
		collapsible = true,
		disabled,
		type = 'single',
		trailingicon = getAppContext().icons.chevrondown,
		leading,
		default: defau,
		trailing,
		content,
		body,
		ui = {}
	}: AccordionProps = $props();
</script>

<Accordion.Root class={cn(ui.root)} {type} bind:value>
	{#each items as item, idx (idx)}
		<Accordion.Item value="item-{idx}">
			<Accordion.Header>
				<Accordion.Trigger>{item.label}</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content class=""
				>This is the collapsible content for this section.</Accordion.Content
			>
		</Accordion.Item>
	{/each}
</Accordion.Root>
