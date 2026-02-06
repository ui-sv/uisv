<script lang="ts">
	import { isComponent, isSnippet } from '$lib/utilities.svelte.js';
	import { type InputTimeProps, INPUT_TIME_VARIANTS, Time } from './index.js';
	import { TimeField } from 'bits-ui';

	let {
		hourcycle = 12,
		value = $bindable(),
		color = 'primary',
		variant = 'outline',
		size = 'md',
		icon,
		disabled,
		highlight,
		ui = {},
		...rest
	}: InputTimeProps = $props();

	const variants = $derived(
		INPUT_TIME_VARIANTS({
			size,
			color,
			variant,
			highlight,
		}),
	);
</script>

<TimeField.Root bind:value hourCycle={hourcycle}>
	<TimeField.Input name="hello" class={variants.root({ class: ui.root })}>
		{#snippet children({ segments })}
			{#each segments as { part, value }, i (part + i)}
				<TimeField.Segment {part} class={variants.segment({ class: ui.segment })}>
					{value}
				</TimeField.Segment>
			{/each}
		{/snippet}
	</TimeField.Input>
</TimeField.Root>
