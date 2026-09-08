<script module lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	export type CardProps = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		ui?: {
			base?: ClassValue;
			header?: ClassValue;
			content?: ClassValue;
			footer?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let { header, children, footer, ui = {} }: CardProps = $props();
</script>

<div class={cn(ui.base)}>
	{#if header}
		<div class={cn(ui.header)}>
			{@render header()}
		</div>
	{/if}

	<div class={cn(ui.content)}>
		{@render children()}
	</div>

	{#if footer}
		<div class={cn(ui.footer)}>
			{@render footer()}
		</div>
	{/if}
</div>
