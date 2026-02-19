<script lang="ts">
	import Seperator from '$lib/components/seperator.svelte';
	import { Placeholder, COLORS, type SeperatorProps } from '$lib/index.js';

	let color = $state<(typeof COLORS)[number]>('primary');
	let type = $state<SeperatorProps['type']>('solid');
	let label = $state('');
	let icon = $state('i-ph:rocket');
</script>

<div class="space-y-4 p-4">
	<div>
		<select bind:value={color} name="color" id="color">
			{#each COLORS as c (c)}
				<option value={c}>{c}</option>
			{/each}
		</select>

		<select bind:value={type} name="color" id="color">
			{#each ['solid', 'dashed', 'dotted'] as t (t)}
				<option value={t}>{t}</option>
			{/each}
		</select>

		<input bind:value={label} type="text" placeholder="label" />
		<input bind:value={icon} type="text" placeholder="icon" />
	</div>

	<Seperator {color} {type} {label} {icon} />
</div>
