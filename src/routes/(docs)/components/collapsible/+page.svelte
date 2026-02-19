<script lang="ts">
	import { Collapsible, Placeholder, COLORS, type CollapsibleProps } from '$lib/index.js';

	let color = $state<(typeof COLORS)[number]>('primary');
	let variant = $state<CollapsibleProps['variant']>('subtle');
</script>

<div class="space-y-4 p-4">
	<div>
		<select bind:value={color} name="color" id="color">
			{#each COLORS as c (c)}
				<option value={c}>{c}</option>
			{/each}
		</select>

		<select bind:value={variant} name="color" id="color">
			{#each ['link', 'solid', 'outline', 'soft', 'subtle', 'ghost'] as v (v)}
				<option value={v}>{v}</option>
			{/each}
		</select>
	</div>

	<Collapsible class="w-48" label="Hello" {variant} {color}>
		<Placeholder class="h-48" />
	</Collapsible>
</div>
