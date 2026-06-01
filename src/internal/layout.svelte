<script module lang="ts">
	import './docs.css';

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
	export let title: string | undefined;
	// type Props = {
	// 	children?: Snippet;
	// 	title?: string;
	// 	code?: string;
	// 	desc?: string;
	// 	docs: string;
	// 	bits?: string;
	// };

	// const { children, title, code, desc, docs, bits }: Props = $props();

	// let nav_opened = false;

	// $effect(() => {
	// 	nav_opened = nav_opened;

	// 	if (typeof document !== 'undefined') {
	// 		document.body.classList[nav_opened ? 'add' : 'remove']('overflow-hidden');
	// 	}
	// });
</script>

<svelte:head>
	<title>{title ? `${title} - UI Svelte` : 'UI Svelte'}</title>
</svelte:head>

<slot />
