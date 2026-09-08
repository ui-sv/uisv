<script module lang="ts">
	import { cn, type ClassValue } from 'tailwind-variants';
	import { type SvelteHTMLElements } from 'svelte/elements';

	export type ProgressProps = SvelteHTMLElements['div'] & {
		value?: number;
		min?: number;
		max?: number | string[];
		ui?: {
			root?: ClassValue;
			base?: ClassValue;
			indicator?: ClassValue;
			text?: ClassValue;
		};
		base?: SvelteHTMLElements['div'];
	};
</script>

<script lang="ts">
	let { value = 0, min = 0, max, ui = {}, base, ...rest }: ProgressProps = $props();

	const percentage = $derived.by(() => {
		if (value === undefined) return null;
		if (Array.isArray(max)) return (value / (max.length - 1)) * 100;

		return (value / (max || 100)) * 100;
	});
	const indeterminate = $derived.by(() => {
		if (value === undefined || percentage === null) return true;
		if (value < min) return true;
		if (percentage > 100) return true;

		return false;
	});
</script>

<div
	{...rest}
	data-state-indeterminate={indeterminate}
	class={cn(rest.class, ui.root)}
	data-value={value}
	data-percentage={percentage}
	style:--bits-progress-value={value}
	style:--bits-progress-percentage={percentage}
>
	<div
		{...base}
		class={cn(base?.class, ui.base)}
		data-value={value}
		data-percentage={percentage}
		style:--bits-progress-value={value}
		style:--bits-progress-percentage={percentage}
	>
		<span
			class={cn(ui.indicator)}
			data-value={value}
			data-percentage={percentage}
			style:--bits-progress-value={value}
			style:--bits-progress-percentage={percentage}
		>
		</span>
	</div>

	{#if Array.isArray(max)}
		<p class={cn(ui.text)}>
			{(value && max[value]) || max[0]}
		</p>
	{/if}
</div>
