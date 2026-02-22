<script lang="ts">
	import { Breadcrumb, type BreadcrumbItem } from '$lib/index.js';

	const ITEMS: BreadcrumbItem[] = [
		{
			label: 'UI Svelte',
			icon: 'i-lucide-book-open',
			href: '/',
		},
		{
			label: 'Components',
			icon: 'i-lucide-box',
			href: '/components',
		},
		{
			label: 'Breadcrumb',
			icon: 'i-lucide-link',
			href: '/components/breadcrumb',
		},
	];
</script>

<div class="space-y-4 p-4">
	<Breadcrumb items={ITEMS} />
</div>
