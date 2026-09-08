<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/index.js';
	import { systemPrefersMode, userPrefersMode, resetMode, setMode, mode } from '$lib/mode.js';
	import Logo from '$site/logo.svelte';

	const links = { guides: '/introduction', components: '/components', styles: '/styles' };

	const mode_icon = $derived.by(() => {
		if (
			userPrefersMode.current === 'dark' ||
			(userPrefersMode.current === 'system' && mode.current === 'dark')
		)
			return 'i-lucide:sun';
		return 'i-lucide:moon';
	});

	function is_link(label: string, href: string) {
		if (label !== 'guides') return page.url.pathname.startsWith(href);
		if (page.url.pathname !== '/')
			return !Object.entries(links)
				.slice(1)
				.find((v) => page.url.pathname.startsWith(v[1]));
	}
</script>

<nav
	class="bg-surface-base border-b border-surface-accented sticky top-0 z-50 flex items-center gap-2 px-12"
>
	<a href="/" class="flex gap-2 items-center">
		<Logo class="size-7 text-svelte text-shadow" />

		<span class="font-medium text-md tracking-1 text-black/67 dark:text-white/67 leading-3.5">
			SVELTE
		</span>
	</a>

	<span></span>

	{#each Object.entries(links) as [label, href] (href)}
		<a
			{href}
			class={[
				'capitalize transition relative group h-16 flex items-center px-2',
				is_link(label, href) ? 'text-svelte' : '',
			]}
		>
			{label}

			<span
				class={[
					'h-px absolute w-full left-0 top-full transition-all duration-300',
					is_link(label, href)
						? 'bg-svelte scale-x-full'
						: 'group-hover:(bg-surface/75 scale-x-full) scale-x-0',
				]}
			></span>
		</a>
	{/each}

	<span class="grow"></span>

	<Button
		href="https://github.com/ui-sv/uisv"
		icon="i-lucide:github"
		target="_blank"
		class="size-8 flex items-center justify-center hover:bg-gray/10 transition"
	/>

	<Button
		icon={mode_icon}
		class="size-8 flex items-center justify-center bg-gray/10 border border-gray/25 hover:bg-gray/20 transition"
		onclick={() => {
			const is_system = userPrefersMode.current === 'system';

			if (is_system && systemPrefersMode.current === 'light') setMode('dark');
			else if (is_system && systemPrefersMode.current === 'dark') setMode('light');
			else resetMode();
		}}
	/>
</nav>
