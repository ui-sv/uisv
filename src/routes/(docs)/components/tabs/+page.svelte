<script lang="ts">
	import { Tabs, type TabsProps, COLORS } from '$lib/index.js';

	const ITEMS: TabsProps['items'] = [
		{
			label: 'vite',
			content: 'The Build Tool for the Web',
		},
		{
			label: 'svelte',
			content: 'web development for the rest of us',
		},
		{ label: 'uisv', content: 'ui library for the rest of us' },
	];

	let value = $state(0);
	let size = $state<TabsProps['size']>('md');
	let color = $state<TabsProps['color']>('primary');
</script>

<div class="space-y-4 p-4">
	<h1>Basic</h1>

	<select bind:value={size} name="sizes" id="sizes">
		<option value="xs">xs</option>
		<option value="sm">sm</option>
		<option value="md">md</option>
		<option value="lg">lg</option>
		<option value="xl">xl</option>
	</select>

	<select bind:value={color} name="colors" id="colors">
		{#each COLORS as color (color)}
			<option value={color}>{color}</option>
		{/each}
	</select>

	<Tabs bind:value items={ITEMS.map((v) => (typeof v === 'object' ? v.label : v))} {size} {color} />

	<h1>with contents</h1>

	<Tabs bind:value items={ITEMS} {size} {color} />
</div>

{#snippet components(props: Omit<TabsProps, 'items'>)}
	<div class="flex gap-2">
		{#each COLORS as color (color)}
			<Tabs bind:value {...props} {items} {color} />
		{/each}
	</div>
{/snippet}
