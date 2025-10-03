<script lang="ts">
	import 'virtual:uno.css';
	import './main.css';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
</script>

{@render children()}
