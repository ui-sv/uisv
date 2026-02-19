<script lang="ts">
	import Seperator from '$lib/components/seperator.svelte';
	import { Icon } from '$lib/index.js';

	let name = $state('i-ph:rocket');
</script>

<div class="space-y-4 p-4">
	<div>
		<input bind:value={name} type="text" placeholder="icon" />
	</div>

	<Icon {name} />
</div>
