<script lang="ts">

</script>

## Usage

Use the Tabs component to display a list of items in a tabs.

<!--
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

	<select bind:value={variant} name="variants" id="variants">
		<option value="pill">pill</option>
		<option value="link">link</option>
	</select>

	<Tabs items={ITEMS.map((v) => (typeof v === 'object' ? v.label : v))} {size} {color} {variant} />

	<h1>with icons</h1>

	<Tabs
		items={ITEMS.map((v) => (typeof v === 'object' ? { ...v, content: undefined } : v))}
		{size}
		{color}
		{variant}
	/>

	<h1>with contents</h1>

	<Tabs items={ITEMS} {size} {color} {variant} content_0={testing}>
		{#snippet content_1()}
			hello
		{/snippet}

		{#snippet content_2()}
			testing 2
		{/snippet}
	</Tabs>

	<h1>vertical</h1>

	<Tabs
		items={ITEMS.map((v) => (typeof v === 'object' ? { ...v, content: undefined } : v))}
		{size}
		{color}
		{variant}
		orientation="vertical"
	/>
</div>

{#snippet testing()}
	what
{/snippet}

w-->
