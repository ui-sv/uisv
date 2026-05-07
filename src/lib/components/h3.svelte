<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes, ...rest }: SvelteHTMLElements['h3'] = $props();

	const classname = $derived(
		cn(
			'relative text-xl text-label-highlighted font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-lg/6 [&>a>code]:font-bold',
			'[&>a>code]:transition-colors',
			classes,
		),
	);
</script>

<h3 {...rest} class={classname}>
	{@render children?.()}
</h3>
