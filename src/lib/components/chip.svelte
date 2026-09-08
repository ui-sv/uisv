<script module lang="ts">
	import type { BitsSpanAttributes } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	export type ChipProps = {
		children: Snippet;
		text?: string;
		ui?: {
			base?: ClassValue;
			chip?: ClassValue;
		};
		chip?: BitsSpanAttributes;
	};
</script>

<script lang="ts">
	let { children, text, ui = {}, chip, ...rest }: ChipProps = $props();
</script>

<div class={cn(ui.base)} {...rest}>
	{@render children()}

	<span class={cn(ui.chip)} {...chip}>
		{text}
	</span>
</div>
