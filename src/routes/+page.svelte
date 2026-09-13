<script>
	import { Button } from '$lib/index.js';
	import PreviewSnippet from './landing-snippet.md';
</script>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*16-1px)] grid">
	<div class="container mx-auto flex gap-8 <xl:flex-col">
		<div class="grow flex flex-col justify-center gap-8">
			<h1 class="text-7xl font-bold">
				unstyled components
				<br />
				for the rest of us
			</h1>
			<p class="max-w-3xl text-lg">
				Unstyled and accessible primitives build for Svelte. use bind:value, snippets, and ui prop
				without the style of sub-components.
			</p>
			<div class="flex gap-4 items-center">
				<Button
					href="/introduction"
					label="Start styling"
					class="h-10 px-4 bg-svelte text-white font-medium flex items-center gap-2 transition-all hover:bg-primary/75 active:translate-y-0.5 w-max"
					icon="i-lucide:arrow-right"
					iconposition="trailing"
				/>
				<Button
					href="/components"
					label="Browse components"
					class="h-10 px-4 border border-surface-accented font-medium flex items-center gap-2 transition-all hover:bg-surface-muted active:translate-y-0.5 w-max"
					icon="i-lucide:rocket"
					iconposition="trailing"
				/>
			</div>
		</div>
		<div class="flex items-center">
			<PreviewSnippet />
		</div>
	</div>
</div>

<style>
	:global(.shiki) {
		@apply p-4 border border-surface-accented pr-42;
	}
</style>
