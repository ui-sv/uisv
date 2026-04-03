<script lang="ts">
	import { Icon } from '$lib/index.js';
	import Test from '../input/test.svelte';

	let name = $state('i-lucide:rocket');
</script>

<div class="space-y-4 p-4">
	<div>
		<input bind:value={name} type="text" placeholder="icon" />
	</div>

	<Icon {name} class="size-10" />

	<Icon name={Test} class="size-10" />
</div>
