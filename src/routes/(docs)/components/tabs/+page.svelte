<script lang="ts">
	import { Tabs, type TabsProps, COLORS } from '$lib/index.js';

	let value = $state(0);
	const items = $state<string[]>(['ui', 'svelte', 'uisv']);
	let size = $state<TabsProps['size']>('md');
</script>

<div class="space-y-4 p-4">
	<h1>Basic</h1>
	{@render components({})}

	<h1>sizes</h1>

	<select bind:value={size} name="sizes" id="sizes">
		<option value="xs">xs</option>
		<option value="sm">sm</option>
		<option value="md">md</option>
		<option value="lg">lg</option>
		<option value="xl">xl</option>
	</select>

	{@render components({ size })}
</div>

{#snippet components(props: Omit<TabsProps, 'items'>)}
	<div class="flex gap-2">
		{#each COLORS as color (color)}
			<Tabs bind:value {...props} {items} {color} />
		{/each}
	</div>
{/snippet}
