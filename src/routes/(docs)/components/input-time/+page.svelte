<script lang="ts">
	import { InputTime, COLORS, type InputTimeProps, type PropColor } from '$lib/index.js';

	let variant = $state<InputTimeProps['variant']>('outline');
	let color = $state<PropColor>('primary');
	let size = $state<InputTimeProps['size']>('md');
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

	<InputTime {variant} {color} {icon} {size} placeholder="Type something up..." />
</div>
