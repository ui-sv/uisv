<script module lang="ts">
	export {
		P as p,
		H1 as h1,
		H2 as h2,
		H3 as h3,
		H4 as h4,
		H5 as h5,
		H6 as h6,
	} from '$lib/index.js';
</script>

<script lang="ts">
	import { Button } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import './docs.css';

	type Props = {
		children?: Snippet;
		title?: string;
		code?: string;
		desc?: string;
		docs: string;
		bits?: string;
	};

	const { children, title, code, desc, docs, bits }: Props = $props();

	let nav_opened = false;

	$effect(() => {
		nav_opened = nav_opened;

		if (typeof document !== 'undefined') {
			document.body.classList[nav_opened ? 'add' : 'remove']('overflow-hidden');
		}
	});
</script>

<svelte:head>
	<title>{title} - uisv</title>
</svelte:head>

<div class="flex gap-2">
	<h1 class="flex-1 text-3xl sm:text-4xl text-pretty font-bold text-highlighted">{title}</h1>

	{#if bits}
		<Button
			href="https://bits-ui.com/{bits}"
			label={title}
			target="_blank"
			icon="lucide:circle"
			variant="outline"
			color="surface"
		/>
	{/if}

	<Button
		href="https://github.com/ui-sv/uisv/blob/main/src/lib/{code}"
		label="Github"
		target="_blank"
		icon="simple-icons:github"
		variant="outline"
		color="surface"
	/>

	<Button
		href="https://github.com/ui-sv/uisv/blob/main/src/routes/(docs)/{docs}"
		label="Edit Docs"
		target="_blank"
		icon="lucide:file-pen"
		variant="outline"
		color="surface"
	/>
</div>

<p class="text-lg text-pretty text-muted mt-4">{desc}</p>

<div class="h-px bg-surface-accented my-8"></div>

{@render children?.()}
