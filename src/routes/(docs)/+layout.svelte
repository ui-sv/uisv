<script lang="ts">
	import { page } from '$app/state';
	import { links } from '$internal/index.js';
	import { Button } from '$lib/index.js';
	import { kebabCase, splitByCase } from 'scule';
	import '$internal/docs.css';

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
	{#if section in links}
		<aside class="w-62 h-full sticky top-16">
			{#each Object.entries(links[section].sections) as [group_label, list] (group_label)}
				<p class="select-none py-1 pt-4 text-sm font-medium">
					{group_label}
				</p>

				{#each Object.entries(list) as [label] (label)}
					{@const href = `/${section}/${toHref(label)}`}

					<div class="px-2">
						<div
							class={[
								'border-l px-2 transition',
								href === page.url.pathname ? 'border-primary' : 'border-surface-accented',
							]}
						>
							<Button
								color="surface"
								variant="link"
								{href}
								{label}
								ui={{
									base: [
										'w-full font-normal',
										href === page.url.pathname
											? 'text-primary hover:(text-primary bg-surface-muted)'
											: 'hover:bg-surface-muted',
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

<style>
	:global(.shiki) {
		@apply p-4 sm:p-6 text-sm;
	}
</style>
