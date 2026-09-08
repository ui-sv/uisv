<script lang="ts">
	import { page } from '$app/state';
	import Aside from '$site/aside.svelte';

	let { children } = $props();
</script>

<article class="min-h-[calc(100vh-var(--spacing)*16-1px)] container mx-auto flex">
	<Aside />

	{#if page.error}
		<div></div>
	{:else}
		<main class="grow p-4">
			<div class="mx-auto max-w-4xl space-y-4">
				{@render children()}
			</div>
		</main>
	{/if}
</article>

<style>
	:global {
		.shiki {
			@apply p-4 text-sm max-w-full max-h-lg overflow-y-auto bg-surface-muted!;
		}

		h1 {
			@apply text-3xl font-bold mt-12;
		}

		h2 {
			@apply text-2xl font-bold mt-12 mb-4;
		}

		h3 {
			@apply text-xl font-bold mt-6 mb-4;
		}

		p {
			@apply text-label-toned;
		}

		p > code {
			@apply text-sm p-0.5 bg-surface-muted border border-surface-accented text-label-highlighted font-medium;
		}

		html.dark .shiki,
		html.dark .shiki span {
			color: var(--shiki-dark) !important;
			/*background-color: var(--shiki-dark-bg) !important;*/
			/* Optional, if you also want font styles */
			font-style: var(--shiki-dark-font-style) !important;
			font-weight: var(--shiki-dark-font-weight) !important;
			text-decoration: var(--shiki-dark-text-decoration) !important;

			@apply bg-surface-muted!;
		}
	}
</style>
