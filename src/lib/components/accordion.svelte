<script module lang="ts">
	import { Accordion } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

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
			root?: ClassNameValue;
			item?: ClassNameValue;
			header?: ClassNameValue;
			trigger?: ClassNameValue;
			content?: ClassNameValue;
			body?: ClassNameValue;
			leadingicon?: ClassNameValue;
			trailingicon?: ClassNameValue;
			label?: ClassNameValue;
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
		trailingicon = 'i-lucide-baret-down',
		leading,
		default: defau,
		trailing,
		content,
		body,
		ui = {}
	}: AccordionProps = $props();
	const classes = $derived(
		tv({
			slots: {
				root: 'w-full',
				item: 'border-b border-default last:border-b-0',
				header: 'flex',
				trigger:
					'group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 focus-visible:outline-primary min-w-0',
				content:
					'data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out] overflow-hidden focus:outline-none',
				body: 'text-sm pb-3.5',
				leadingIcon: 'shrink-0 size-5',
				trailingIcon:
					'shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200',
				label: 'text-start break-words'
			},
			variants: {
				disabled: {
					true: {
						trigger: 'cursor-not-allowed opacity-75'
					}
				}
			}
		})({
			disabled
		})
	);
</script>

<Accordion.Root
	class={classes.root({ class: ui.root })}
	type="multiple"
	bind:value={
		() => {
			if (!value) return;
			if (Array.isArray(value)) return value;
			return [value];
		},
		(val) => {
			if (!val) return (value = val);
			value = type === 'single' ? val[0] : val;
		}
	}
>
	{#each items as item, idx (idx)}
		<Accordion.Item value="item-1">
			<Accordion.Header>
				<Accordion.Trigger>{item.label}</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content>This is the collapsible content for this section.</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
