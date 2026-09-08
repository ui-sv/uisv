<script lang="ts">
	import { App } from '$lib/index.js';
	import Navigation from '$site/navigation.svelte';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>uisv – unstyled components the rest of us</title>
	<meta name="description" content="unstyled components the rest of us" />
</svelte:head>

<App>
	<Navigation />

	{@render children()}
</App>

<style>
	:global {
		html,
		body {
			@apply bg-surface-base text-label-base min-h-screen;
		}
	}
</style>
