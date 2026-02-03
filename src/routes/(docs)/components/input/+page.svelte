<script lang="ts">
	import { Input, COLORS, type InputProps, type PropColor } from '$lib/index.js';
	import { pascalCase } from 'scule';

	let value = $state('');
	let variant = $state<InputProps['variant']>('outline');
	let color = $state<PropColor>('primary');
	let size = $state<InputProps['size']>('md');
	let icon = $state('i-lucide-rocket');
	let loading = $state(false);
	let iconposition = $state<InputProps['iconposition']>('leading');
	let type = $state<InputProps['type']>('text');
</script>

<div class="space-y-4 p-4">
	<div>
		<select bind:value={variant}>
			{#each ['outline', 'soft', 'subtle', 'ghost', 'none'] as v (v)}
				<option value={v}>{v}</option>
			{/each}
		</select>

		<select bind:value={color}>
			{#each COLORS as v (v)}
				<option value={v}>{v}</option>
			{/each}
		</select>

		<select bind:value={size}>
			{#each ['xs', 'sm', 'md', 'lg', 'xl'] as s (s)}
				<option value={s}>{s}</option>
			{/each}
		</select>

		<select bind:value={iconposition}>
			<option value="leading">leading</option>
			<option value="trailing">trailing</option>
		</select>

		<select bind:value={loading}>
			<option value={true}>loading</option>
			<option value={false}>not loading</option>
		</select>
	</div>

	<input bind:value={type} type="text" />

	<Input
		bind:value
		{type}
		{variant}
		{color}
		{icon}
		{iconposition}
		{size}
		{loading}
		placeholder="Type something up..."
	/>
</div>
