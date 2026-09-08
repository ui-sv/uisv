<script module lang="ts">
	import type { Component, Snippet } from 'svelte';
	import { Button, Icon, type ButtonProps, isSnippet } from '../index.js';
	import { cn } from 'tailwind-variants';
	import { getAppContext } from '../contexts.js';

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
		seperator = getAppContext().icons.chevronright,
		...rest
	}: BreadcrumbProps = $props();
</script>

<nav class={cn()}>
	<ol class={cn({})}>
		{#each items as item, idx (idx)}
			<li class={cn({})}>
				{#if item.snippet}
					{@const render = rest[item.snippet]}

					{#if isSnippet(render)}
						{@render (render as Snippet<[BreadcrumbItem]>)(item)}
					{/if}
				{:else}
					<Button label={item[labelkey] as undefined} icon={item.icon} href={item.href} {...item} />
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
