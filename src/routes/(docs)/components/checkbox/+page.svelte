<script lang="ts">
	import { Checkbox, type CheckboxProps, COLORS } from '$lib/index.js';

	let value = $state(false);
	let indicator = $state<CheckboxProps['indicator']>('start');
</script>

<div class="space-y-4 p-4">
	<h1>Basic</h1>
	{@render components({})}

	<h1>Intermediate</h1>
	{@render components({ value: 'intermediate' }, true)}

	<h1>Label</h1>
	{@render components({ label: 'useSvelte' })}

	<h1>Description</h1>
	{@render components({ label: 'useSvelte', description: "use svelte for it's greatness" })}

	<h1>Required</h1>
	{@render components({
		label: 'useSvelte',
		description: "use svelte for it's greatness",
		required: true
	})}

	<h1>Custom icon</h1>
	{@render components({
		label: 'useSvelte',
		description: "use svelte for it's greatness",
		icon: 'i-lucide-award'
	})}

	<h1>indicator</h1>

	<select bind:value={indicator} name="indicator" id="indicator">
		<option value="start">start</option>
		<option value="end">end</option>
		<option value="hidden">hidden</option>
	</select>
	{@render components({
		label: 'useSvelte',
		description: "use svelte for it's greatness",
		indicator
	})}
</div>

{#snippet components(props?: CheckboxProps, noval?: boolean)}
	<div class="flex gap-2">
		{#each ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as color (color)}
			{#if noval}
				<Checkbox {...props} color={color as PropColor} />
			{:else}
				<Checkbox {...props} bind:value color={color as PropColor} />
			{/if}
		{/each}
	</div>
{/snippet}
