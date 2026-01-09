<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes, ...rest }: SvelteHTMLElements['h6'] = $props();
</script>

<h6
	{...rest}
	class={cn(
		'relative text-2xl text-highlighted font-bold mt-12 mb-6',
		'scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]',
		'hover:[&>a>code]:(border-primary text-primary)',
		'[&>a>code]:(transition-colors text-xl/7 font-bold border-dashed)',
		'[&>a]:focus-visible:outline-primary',
		classes,
	)}
>
	{@render children?.()}
</h6>
