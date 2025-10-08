<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type H2Props = {
		children: Snippet;
		ui?: { root?: ClassNameValue };
	};
</script>

<script lang="ts">
	const { children, ui = {} }: H2Props = $props();

	const classes = $derived(
		tv({
			base: [
				'relative text-2xl text-highlighted font-bold mt-12 mb-6',
				'scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]',
				'hover:[&>a>code]:(border-primary text-primary)',
				'[&>a>code]:(transition-colors text-xl/7 font-bold border-dashed)',
				'[&>a]:focus-visible:outline-primary'
			]
		})({ class: ui.root })
	);
</script>

<h1 class={classes}>
	{@render children()}
</h1>
