<script lang="ts">
	import Placeholder from '$lib/components/placeholder.svelte';
	import { Card, type CardProps } from '$lib/index.js';

	const BUTTON_VARIANTS: CardProps['variant'][] = ['solid', 'outline', 'soft', 'subtle'];
</script>

<div class="space-y-4 p-4">
	{#each BUTTON_VARIANTS as variant (variant)}
		<Card {variant}>
			{#snippet header()}
				<Placeholder class="h-10" />
			{/snippet}

			<Placeholder class="h-32" />

			{#snippet footer()}
				<Placeholder class="h-10" />
			{/snippet}
		</Card>
	{/each}
</div>
