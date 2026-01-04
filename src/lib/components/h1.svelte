<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { cx } from 'tailwind-variants';

	export type H1Props = {
		children: Snippet;
		ui?: { root?: ClassNameValue };
	};
</script>

<script lang="ts">
	const { children, ui = {} }: H1Props = $props();
</script>

<h1
	class={cx(
		'text-4xl font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)',
		ui.root
	)}
>
	{@render children()}
</h1>
