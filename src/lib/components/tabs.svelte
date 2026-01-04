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
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		items = [],
		color = 'primary',
		variant = 'pill',
		size = 'md',
		disabled,
		orientation = 'horizontal',
		ui = {}
	}: TabsProps = $props();

	let container_el = $state<HTMLElement | null>(null);
	let item_els = $state<HTMLElement[]>([]);

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: 'relative w-full flex bg-surface-100',
				list: '',
				item: 'text-surface-600 font-medium',
				icon: ''
			},
			variants: {
				color: {
					primary: {
						root: '',
						list: '',
						item: ''
					},
					surface: {
						root: '',
						list: '',
						item: ''
					},
					info: {
						root: '',
						list: '',
						item: ''
					},
					success: {
						root: '',
						list: '',
						item: ''
					},
					warning: {
						root: '',
						list: '',
						item: ''
					},
					error: {
						root: '',
						list: '',
						item: ''
					}
				},
				size: {
					xs: {
						root: '',
						list: '',
						item: ''
					},
					sm: {
						root: '',
						list: '',
						item: ''
					},
					md: {
						root: '',
						list: '',
						item: ''
					},
					lg: {
						root: '',
						list: '',
						item: ''
					},
					xl: {
						root: '',
						list: '',
						item: ''
					}
				},
				orientation: {
					horizontal: {
						root: '',
						list: '',
						item: ''
					},
					vertical: {
						root: '',
						list: '',
						item: ''
					}
				},
				variant: {
					pill: {
						root: '',
						list: '',
						item: ''
					},
					link: {
						root: '',
						list: '',
						item: ''
					}
				}
			},
			compoundVariants: [{ orientation: 'horizontal', size: 'md', class: { root: '' } }]
		})({ color, size, orientation })
	);
</script>

<Tabs.Root class={classes.root({ class: ui.root })}>
	<Tabs.List bind:ref={container_el} class={classes.list({ class: ui.list })}>
		{#each items as item, idx (idx)}
			{@const label = typeof item === 'string' ? item : item.label}

			<Tabs.Trigger
				bind:ref={item_els[idx]}
				value={idx.toString()}
				class={classes.item({ class: ui.item })}
			>
				{@render RenderIcon(typeof item === 'string' ? undefined : item.icon)}

				{label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
</Tabs.Root>

{#snippet RenderIcon(Icon?: string | Component | Snippet)}
	{#if isSnippet(Icon)}
		{@render Icon()}
	{:else if isComponent(Icon)}
		<Icon class={classes.icon({ class: ui.icon })} />
	{/if}
{/snippet}
