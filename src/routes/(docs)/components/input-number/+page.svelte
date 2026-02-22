<script lang="ts">
	import { InputNumber, COLORS, type InputNumberProps, type PropColor } from '$lib/index.js';

	let variant = $state<InputNumberProps['variant']>('outline');
	let color = $state<PropColor>('primary');
	let size = $state<InputNumberProps['size']>('md');
	let icon = $state('i-lucide-rocket');
	let loading = $state(false);
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

		<select bind:value={loading}>
			<option value={true}>loading</option>
			<option value={false}>not loading</option>
		</select>
	</div>

	<InputNumber {variant} {color} {size} placeholder="Type something up..." />
</div>
