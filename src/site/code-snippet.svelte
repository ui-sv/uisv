<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = { code: Snippet; children: Snippet };

	let { code, children }: Props = $props();
</script>

<div class="border border-surface-accented divide-y divide-surface-accented">
	<div class="flex items-center gap-4 justify-center min-h-3xs">
		{@render children()}
	</div>

	<div>
		{@render code()}
	</div>
</div>
