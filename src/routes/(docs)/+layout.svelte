<script lang="ts">
	import { page } from '$app/state';
	import { ASIDE_LINKS } from '$internal/index.js';
	import { Button } from '$lib/index.js';
	import { kebabCase, splitByCase } from 'scule';

	const { children } = $props();
	const section = $derived(page.url.pathname.split('/')[1]);

	const toHref = (str: string) =>
		kebabCase(
			splitByCase(str)
				.filter((v) => v !== ' ')
				.map((v) => v.trim()),
		);
</script>

<div class="container mx-auto flex min-h-[calc(100vh-var(--spacing)*16)]">
	{#if section in ASIDE_LINKS}
		<aside class="w-62 h-full sticky top-16 pt-4">
			{#each Object.entries(ASIDE_LINKS[section]) as [group_label, list] (group_label)}
				<p class="select-none py-1 pt-4 text-sm">
					{group_label}
				</p>

				{#each list as item (item)}
					{@const href = `/${section}/${toHref(item)}`}

					<div class="px-2">
						<div
							class={[
								'border-l px-2',
								href === page.url.pathname ? 'border-primary' : 'border-surface-accented',
							]}
						>
							<Button
								color="surface"
								variant="ghost"
								{href}
								label={item}
								ui={{
									base: [
										'w-full',
										href === page.url.pathname
											? 'text-primary'
											: 'text-surface-500 hover:(text-surface-700)',
									],
								}}
							/>
						</div>
					</div>
				{/each}
			{/each}
		</aside>
	{/if}

	<div class="flex-1 flex">
		<main class="flex-1 p-4 space-y-4">
			{@render children()}
		</main>
	</div>
</div>
