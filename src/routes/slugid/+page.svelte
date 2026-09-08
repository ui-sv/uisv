<script lang="ts">
	import Aside from '$site/aside.svelte';

	let { data } = $props();
</script>

<div class="min-h-[calc(100vh-var(--spacing)*16-1px)] container mx-auto flex">
	<Aside />

	{#if data.md}
		<main class="">
			{@render data.md?.()}
		</main>
	{:else}
		<div class="grow flex flex-col justify-center items-center">
			<h1>rorrE</h1>

			<p>can't find it... the page prob got up and walk away.</p>
		</div>
	{/if}
</div>
