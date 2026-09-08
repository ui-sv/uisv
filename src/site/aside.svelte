<script lang="ts">
	import { page } from '$app/state';
	import { Button, Icon, type BadgeProps, type ButtonProps } from '$lib/index.js';

	type Link = ButtonProps & {
		base_href?: string;
		sublinks?: Link[];
		badge?: BadgeProps;
	};

	const link_sections: Record<string, Link[]> = {
		'/components': [
			{
				label: 'Components',
				base_href: '/components',
				sublinks: [
					{
						href: '/button',
						label: 'Button',
						icon: 'i-lucide:mouse-pointer-click',
					},
				],
			},
		],
		'/styles': [],
		default: [
			{
				label: 'Guides',
				sublinks: [
					{
						href: '/introduction',
						label: 'Introduction',
						icon: 'i-lucide:book-text',
					},
					{
						href: '/getting-started',
						label: 'Getting Started',
						icon: 'i-lucide:rocket',
					},
					{
						href: '/colors',
						label: 'Colors',
						icon: 'i-lucide:swatch-book',
					},
				],
			},
			{
				label: 'Integrations',
				base_href: '/integrations',
				sublinks: [
					{
						href: '/fonts',
						label: 'Fonts',
						icon: 'i-lucide:type',
					},
					{
						href: '/icons',
						label: 'Icons',
						icon: 'i-lucide:view',
					},
					{
						href: '/modes',
						label: 'Modes',
						icon: 'i-lucide:sun-moon',
					},
					{
						href: '/dates',
						label: 'Dates',
						icon: 'i-lucide:calendar-days',
					},
				],
			},
		],
	};

	const link_section = $derived.by(() => {
		for (const [href, section] of Object.entries(link_sections)) {
			if (page.url.pathname.startsWith(href)) return section;
		}

		return link_sections['default'];
	});
</script>

<aside
	class="w-68 sticky top-[calc(var(--spacing)*16+1px)] max-h-[calc(100vh-1px-var(--spacing)*16)] p-4 space-y-1 border-x border-gray/25"
>
	{#each link_section as section (section.label)}
		<div class="text-xs font-semibold text-black/60 h-8 flex items-center uppercase">
			<Icon name={section.icon} />

			{section.label}
		</div>

		{#each section.sublinks as link (link.href)}
			<Button
				{...link}
				href="{section.base_href}{link.href}"
				ui={{
					base: [
						'text-sm text-black/50 flex items-center gap-2 transition px-2 h-8',
						`${section.base_href || ''}${link.href}` === page.url.pathname
							? 'bg-gray/10 text-black/75'
							: 'hover:(bg-gray/10)',
					],
					icon: 'size-4.5',
				}}
			/>
		{/each}
	{/each}
</aside>
