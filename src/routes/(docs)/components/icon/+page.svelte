<script lang="ts">
	import { Icon } from '$lib/index.js';

	let name = $state('i-ic:baseline-rocket');
</script>

<div class="space-y-4 p-4">
	<div>
		<input bind:value={name} type="text" placeholder="icon" />
	</div>

	<Icon {name} class="size-10" />
</div>
