<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/index.js';
	import './main.css';
	import 'virtual:uno.css';

	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();
	const is_home = $derived(page.url.pathname === '/');

	let nav_opened = $state(false);
	let search_opened = $state(false);

	$effect(() => {
		if (typeof document === 'undefined') return;

		document.body.classList[nav_opened || search_opened ? 'add' : 'remove']('overflow-hidden');
	});
</script>

<ModeWatcher />

<div class="min-h-vh flex flex-col <md:flex-col-reverse">
	<nav
		class={[
			'sticky top-0 p-2 <md:bottom-0 z-10 flex gap-2 <md:border-t md:border-b bg-white h-12',
			is_home ? 'border-transparent' : 'border-neutral-200'
		]}
	>
		<div class="w-64 max-w-full">
			<Button variant="link" ui={{ base: 'px-0!' }} href="/">
				<img class="size-5" src="/favicon.svg" alt="logo" />
				<span class="font-quicksand font-lg text-lg"> uisv </span>
			</Button>
		</div>

		<span class="flex-grow flex">
			{#if !is_home}
				<Button
					color="secondary"
					variant="soft"
					ui={{ base: 'text-secondary-300 w-64 max-w-full <md:hidden' }}
					onclick={() => {
						search_opened = true;
					}}
				>
					<div class="pi i-lucide-search opacity-50"></div>

					<span class="opacity-50"> Search docs... </span>
				</Button>
			{/if}
		</span>

		<Button variant="ghost" icon="i-lucide-swatch-book" />
		<Button
			variant="ghost"
			icon={mode.current === 'light' ? 'i-lucide-moon' : 'i-lucide-sun'}
			onclick={toggleMode}
		/>
		<Button variant="ghost" href="https://github.com/ui-sv/uisv" icon="i-lucide-github" />

		<Button
			icon={nav_opened ? 'i-lucide-x' : 'i-lucide-menu'}
			variant="ghost"
			ui={{ base: 'md:(hidden)' }}
			onclick={() => {
				nav_opened = !nav_opened;
			}}
		/>
	</nav>

	<div
		class={[
			'fixed h-1/2 bottom-16 left-2 right-2 bg-white transition z-20 border border-neutral-200 rounded-lg',
			nav_opened ? '' : 'opacity-0 pointer-events-none'
		]}
	></div>

	<div class="flex flex-1 min-h-[calc(100vh-48px)]">
		{#if !is_home}
			<aside
				class={[
					'sticky left-0 top-12 bg-white w-64 bottom-0 border-r border-neutral-200 <md:hidden'
				]}
			></aside>
		{/if}

		{@render children()}
	</div>

	<button
		aria-label="clear nav"
		class={[
			'fixed inset-0 bg-white/50 backdrop-blur-md transition',
			nav_opened || search_opened ? '' : 'pointer-events-none opacity-0',
			search_opened ? 'z-15' : 'z-5'
		]}
		onclick={() => {
			nav_opened = false;
			search_opened = false;
		}}
	></button>
</div>

<svelte:head>
	<title>uisv</title>
</svelte:head>
