<script lang="ts">
	import { COLORS } from '$internal/index.js';
	import { Select, type SelectProps } from '$lib/index.js';

	type P = SelectProps<typeof ITEMS>;

	const ITEMS = ['Vite', 'Svelte', 'UI Svelte', true, 69420];

	let value = $state('Vite');
	let variant = $state<P['variant']>('outline');
	let color = $state<P['color']>('primary');
	let size = $state<P['size']>('md');
	let highlight = $state(false);
</script>

<select bind:value={variant} name="variant" id="variant">
	<option value="outline">outline</option>
	<option value="soft">soft</option>
	<option value="subtle">subtle</option>
	<option value="ghost">ghost</option>
	<option value="none">none</option>
</select>

<select bind:value={highlight} name="highlight" id="highlight">
	<option value={true}>true</option>
	<option value={false}>false</option>
</select>

<select bind:value={color} name="color" id="color">
	{#each COLORS as color (color)}
		<option value={color}>{color}</option>
	{/each}
</select>

<select bind:value={size} name="size" id="size">
	<option value="xs">xs</option>
	<option value="sm">sm</option>
	<option value="md">md</option>
	<option value="lg">lg</option>
	<option value="xl">xl</option>
</select>

<Select bind:value {variant} {color} {highlight} {size} items={ITEMS} ui={{ base: 'w-42' }}
></Select>
