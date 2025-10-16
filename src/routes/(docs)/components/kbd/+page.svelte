<script lang="ts">
	import { COLORS, KBD, type KbdProps } from '$lib/index.js';

	let value = $state('k');
</script>

<div class="space-y-4 p-4">
	<input bind:value type="text" placeholder="key" />

	{@render components({})}
	{@render components({ variant: 'solid' })}
	{@render components({ variant: 'soft' })}
	{@render components({ variant: 'subtle' })}

	<h1>Special keys</h1>
</div>

{#snippet components(props?: KbdProps)}
	<div class="flex gap-2">
		{#each COLORS as color (color)}
			<KBD {...props} {value} {color} />
		{/each}
	</div>
{/snippet}
