<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes, ...rest }: SvelteHTMLElements['h2'] = $props();

	const classname = $derived(
		cn(
			'relative text-2xl text-label-highlighted font-bold mt-12 mb-6',
			'scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]',
			'[&>a]:focus-visible:outline-primary',
			'[&>a>code]:transition-colors [&>a>code]:border-dashed [&>a>code]:font-bold [&>a>code]:text-xl/7',
			'hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary',
			classes,
		),
	);
</script>

<h2 {...rest} class={classname}>
	{@render children?.()}
</h2>
