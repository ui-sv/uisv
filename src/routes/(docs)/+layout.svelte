<script lang="ts">
	import { page } from '$app/state';
	import Aside from '$site/aside.svelte';

	let { children } = $props();
</script>

<div class="min-h-[calc(100vh-var(--spacing)*16-1px)] container mx-auto flex">
	<Aside />

	{#if page.error}
		<div></div>
	{:else}
		<main class="">
			{@render children()}
		</main>
	{/if}
</div>
