<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button } from '$lib/index.js';

	let nav_opened = false;
	export let title: string;

	$: {
		nav_opened = nav_opened;

		console.log(nav_opened);

		if (typeof document !== 'undefined') {
			document.body.classList[nav_opened ? 'add' : 'remove']('overflow-hidden');
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="min-h-vh flex flex-col <md:flex-col-reverse">
	<nav class={['sticky top-0 p-2 <md:bottom-0 z-10']}>
		<div
			class={[
				'mx-auto max-w-7xl backdrop-blur-md rounded-lg h-12 p-2 py-4 flex items-center gap-2 border border-neutral-200',
				nav_opened ? 'bg-white' : 'bg-white/50'
			]}
		>
			<Button color="secondary" variant="link" ui={{ base: '' }} href={resolve('/')}>
				{#snippet icon()}
					<img class="size-8" src="/favicon.svg" alt="logo" />
				{/snippet}

				<span class="font-quicksand font-lg text-lg"> uisv </span>
			</Button>

			<span class="flex-grow"></span>

			<Button
				icon={nav_opened ? 'i-lucide-x' : 'i-lucide-menu'}
				variant="ghost"
				color="secondary"
				ui={{ base: 'md:(hidden)' }}
				onclick={() => {
					nav_opened = !nav_opened;
				}}
			/>
		</div>
	</nav>

	<div
		class={[
			'fixed h-1/2 bottom-16 md:(hidden) left-2 right-2 bg-white transition z-20 border border-neutral-200 rounded-lg',
			nav_opened ? '' : 'opacity-0 pointer-events-none'
		]}
	></div>

	<main class="flex-1">
		<slot />
	</main>

	<button
		aria-label="clear nav"
		class={[
			'fixed inset-0 bg-white/75 backdrop-blur-md z-5 transition md:(hidden)',
			nav_opened ? '' : 'pointer-events-none opacity-0'
		]}
		onclick={() => {
			nav_opened = false;
		}}
	></button>
</div>
