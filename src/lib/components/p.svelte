<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { cn } from 'tailwind-variants';
	const { children, class: classes }: SvelteHTMLElements['p'] = $props();

	const classname = $derived(cn('my-5 leading-7 text-pretty', classes));
</script>

<p class={classname}>
	{@render children?.()}
</p>
