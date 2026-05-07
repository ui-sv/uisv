<script module lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { Button, Icon, type ButtonProps } from './index.js';
	import { tv } from 'tailwind-variants';
	import { isSnippet } from '$lib/utilities.svelte.js';

	export type BreadcrumbItem = Omit<ButtonProps, 'label'> & {
		label?: string;
		icon?: string | Component;
		snippet?: string;
		[key: string]: unknown;
	};

	export type BreadcrumbProps = {
		items: BreadcrumbItem[];
		seperator?: string | Component | Snippet;
		labelkey?: string;
		[key: string]: unknown | Snippet<[BreadcrumbItem]>;
	};
</script>

<script lang="ts">
	let {
		items,
		labelkey = 'label',
		seperator = 'i-lucide:chevron-right',
		...rest
	}: BreadcrumbProps = $props();

	const variants = $derived(
		tv({
			slots: {
				root: '',
				list: 'flex items-center',
				item: '',
				seperator: '',
			},
			variants: {},
		})(),
	);
</script>

<nav class={variants.root({})}>
	<ol class={variants.list({})}>
		{#each items as item, idx (idx)}
			<li class={variants.item({})}>
				{#if item.snippet}
					{@const render = rest[item.snippet]}

					{#if isSnippet(render)}
						{@render (render as Snippet<[BreadcrumbItem]>)(item)}
					{/if}
				{:else}
					<Button
						label={item[labelkey] as undefined}
						icon={item.icon}
						href={item.href}
						variant="link"
						color="surface"
						{...item}
					/>
				{/if}
			</li>

			{#if idx < items.length - 1}
				{#if isSnippet(seperator)}
					{@render seperator()}
				{:else}
					<Icon name={seperator} class={variants.seperator({})} />
				{/if}
			{/if}
		{/each}
	</ol>
</nav>
