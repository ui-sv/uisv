<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes, ...rest }: SvelteHTMLElements['h1'] = $props();

	const classname = $derived(
		cn(
			'text-4xl font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)',
			classes,
		),
	);
</script>

<h1 {...rest} class={classname}>
	{@render children?.()}
</h1>
