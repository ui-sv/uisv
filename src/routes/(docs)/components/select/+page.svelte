<script>
	import { COLORS, Select } from '$lib/index.js';

	const ITEMS = ['Vite', 'Svelte', 'UI Svelte', true, 69420];

	let value = $state('Vite');
	let variant = $state('outline');
	let color = $state('primary');
	let size = $state('md');
	let highlight = $state(false);
</script>

--- description: what --- Usage Use the `bind:value` directive to control the value of the Select or
the `defaultvalue` prop to set the initial value when you do not need to control its state.

<!--
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

<Select bind:value {variant} {color} {highlight} {size} items={ITEMS}></Select> -->
