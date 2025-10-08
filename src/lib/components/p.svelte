<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type ParagraphProps = {
		children: Snippet;
		ui?: { root?: ClassNameValue };
	};
</script>

<script lang="ts">
	const { children, ui = {} }: ParagraphProps = $props();
</script>

<p
	class={tv({
		base: 'my-5 leading-7 text-pretty'
	})({ class: ui.root })}
>
	{@render children()}
</p>
