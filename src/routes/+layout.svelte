<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { Button } from '$lib/index.js';
	import 'virtual:uno.css';
	import Aside from './aside.svelte';
	import { LINKS } from '$internal/index.js';

	const { children } = $props();
	const is_home = $derived(page.url.pathname === '/');

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

			<div class="flex-1 flex">
				{#each LINKS as link (link.href)}
					<Button
						label={link.label}
						href={link.href}
						target={link.target}
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

<!--
<div class="min-h-vh flex flex-col <md:flex-col-reverse">
	<nav
		class={[
			'sticky top-0 p-2 <md:bottom-0 z-10 flex gap-2 <md:border-t md:border-b bg-white h-12',
			is_home ? 'border-transparent' : 'border-surface-200',
		]}
	>
		<div class="w-64 max-w-full">
			<Button variant="link" ui={{ base: 'px-0!' }} href="/">
				<img class="size-5" src="/favicon.svg" alt="logo" />
				<span class="font-quicksand font-lg text-lg"> uisv </span>
			</Button>
		</div>

		<span class={['flex-1 flex gap-2', is_home ? 'justify-center' : '']}>
			{#if !is_home}
				<Button
					color="surface"
					variant="soft"
					ui={{ base: 'text-surface-500 w-64 max-w-full <md:hidden' }}
					onclick={() => {
						search_opened = true;
					}}
				>
					<div class="pi i-lucide-search opacity-50"></div>

					<span class="opacity-50"> Search docs... </span>
				</Button>
			{:else}
				{#each LINKS as link (link.href)}
					<Button
						label={link.label}
						href={link.href}
						target={link.target}
						variant="ghost"
						color="surface"
						ui={{ base: 'capitalize' }}
					/>
				{/each}
			{/if}
		</span>

		<Button variant="ghost" icon="i-lucide-swatch-book" />

		<Button
			variant="ghost"
			icon={mode.current === 'light' ? 'i-lucide-moon' : 'i-lucide-sun'}
			onclick={toggleMode}
		/>

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
			'fixed h-1/2 bottom-16 left-2 right-2 bg-white transition z-20 border border-surface-200 rounded-lg',
			nav_opened ? '' : 'opacity-0 pointer-events-none',
		]}
	></div>

	<article class="flex flex-1 min-h-[calc(100vh-48px)]">
		{#if !is_home}
			<Aside />
		{/if}

		{@render children()}
	</article>

	<button
		aria-label="clear nav"
		class={[
			'fixed inset-0 bg-white/50 backdrop-blur-md transition',
			nav_opened || search_opened ? '' : 'pointer-events-none opacity-0',
			search_opened ? 'z-15' : 'z-5',
		]}
		onclick={() => {
			nav_opened = false;
			search_opened = false;
		}}
	></button>
</div> -->

<svelte:head>
	<title>UI Svelte</title>
</svelte:head>
