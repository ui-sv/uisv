<script lang="ts">
	import { CheckboxGroup, type CheckboxGroupProps, type PropColor } from '$lib/index.js';

	const ITEMS = ['Use Svelte', 'Use uisv', 'Use mdsvex'];
	const ITEMS_DESC = [
		{ value: 'Use Svelte', description: 'web development for the rest of us' },
		{ value: 'Use uisv', description: 'ui library for the rest of us' },
		{ value: 'Use mdsvex', description: 'one of the good markdown libraries' }
	];
	let value = $state([]);
</script>

<div class="space-y-4 p-4">
	<h1>Basic</h1>
	{@render components({ items: ITEMS })}

	<h1>Description</h1>
	{@render components({ items: ITEMS_DESC, labelkey: 'value' })}

	<h1>variants</h1>
	{@render components({ items: ITEMS, variant: 'card' })}
	{@render components({ items: ITEMS, variant: 'table' })}
</div>

{#snippet components(props: CheckboxGroupProps, noval?: boolean)}
	<div class="flex flex-col gap-2">
		{#each ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as color (color)}
			{#if noval}
				<CheckboxGroup {...props} color={color as PropColor} />
			{:else}
				<CheckboxGroup {...props} bind:value color={color as PropColor} />
			{/if}
		{/each}
	</div>
{/snippet}
