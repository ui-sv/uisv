<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { page } from '$app/state';
	import { Button } from '$lib/index.js';
	import 'virtual:uno.css';
	import { LINKS } from '$internal/index.js';

	const { children } = $props();

	let nav_opened = $state(false);
	let search_opened = $state(false);

	$effect(() => {
		if (typeof document === 'undefined') return;

		document.body.classList[nav_opened || search_opened ? 'add' : 'remove']('overflow-hidden');
	});
</script>

<ModeWatcher />

<nav class="sticky top-0 z-5 bg-surface-default/75 backdrop-blur w-full">
	<div class="border-b border-surface-200 h-16 flex items-center">
		<div class="container mx-auto flex items-center">
			<div class="flex-1 flex items-center">
				<Button variant="link" ui={{ base: 'px-0!' }} href="/">
					<img class="size-8" src="/favicon.svg" alt="logo" />
					<span class="font-quicksand font-lg text-2xl"> uisv </span>
				</Button>
			</div>

			<div class="flex-1 flex justify-center">
				{#each LINKS as link (link.href)}
					<Button
						label={link.label}
						href={link.href}
						variant="link"
						color="surface"
						ui={{
							base: [
								'capitalize',
								page.url.pathname.startsWith(link.href) ? 'text-primary hover:(text-primary)' : '',
							],
						}}
					/>
				{/each}
			</div>

			<div class="flex-1 flex justify-end">
				<Button variant="ghost" color="surface" icon="lucide:swatch-book" />

				<Button
					variant="ghost"
					color="surface"
					icon={mode.current === 'light' ? 'lucide:moon' : 'lucide:sun'}
					onclick={toggleMode}
				/>

				<Button
					href="https://github.com/ui-sv/uisv"
					target="_blank"
					variant="ghost"
					color="surface"
					icon="lucide:github"
				/>

				<Button
					icon={nav_opened ? 'lucide:x' : 'lucide:menu'}
					variant="ghost"
					color="surface"
					ui={{ base: 'md:(hidden)' }}
					onclick={() => {
						nav_opened = !nav_opened;
					}}
				/>
			</div>
		</div>
	</div>
</nav>

{@render children()}

<svelte:head>
	<title>UI Svelte</title>
</svelte:head>
