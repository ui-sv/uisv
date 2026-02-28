<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes, ...rest }: SvelteHTMLElements['h2'] = $props();
</script>

<h2
	{...rest}
	class={cn(
		'relative text-2xl text-highlighted font-bold mt-12 mb-6',
		'scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]',
		'[&>a]:focus-visible:outline-primary',
		'[&>a>code]:(transition-colors border-dashed font-bold text-xl/7)',
		'hover:[&>a>code]:(border-primary text-primary)',
		classes,
	)}
>
	{@render children?.()}
</h2>
