<script lang="ts">
	import { Chip, Button, COLORS } from '$lib/index.js';

	let size = $state(8);
	let text = $state('8');
</script>

<div class="space-y- p-4">
	<input bind:value={size} type="number" />
	<input bind:value={text} type="text" />

	<div class="flex gap-4">
		{#each COLORS as color (color)}
			<Chip {color} {size} {text}>
				<Button icon="i-lucide-mail" color="surface" variant="subtle" />
			</Chip>
		{/each}
	</div>
</div>
