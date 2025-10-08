<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type H1Props = {
		children: Snippet;
		ui?: { root?: ClassNameValue };
	};
</script>

<script lang="ts">
	const { children, ui = {} }: H1Props = $props();

	const classes = $derived(
		tv({
			variants: {
				slots: {
					root: 'text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)'
				}
			}
		})({ class: ui.root })
	);
</script>

<h1 class={classes}>
	{@render children()}
</h1>
