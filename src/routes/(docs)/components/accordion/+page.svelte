<script lang="ts">
	import { Accordion, type AccordionProps, type PropColor } from '$lib/index.js';

	const ITEMS: AccordionProps['items'] = [
		{
			label: 'Icons',
			icon: 'i-lucide-smile',
			content: 'You have nothing to do, @nuxt/icon will handle it automatically.'
		},
		{
			label: 'Colors',
			icon: 'i-lucide-palette',
			content: 'Choose a primary and a secondary color from your UnoCSS theme.'
		},
		{
			label: 'Components',
			icon: 'i-lucide-box',
			content:
				'You can customize components by using the `class` / `ui` props or in your vite.config.ts.'
		}
	];
</script>

<div class="space-y-4 p-4">
	<Accordion items={ITEMS} />

	<h1>Multiple</h1>
	<Accordion items={ITEMS} type="multiple" />

	<h1>Collapsible</h1>
	<Accordion items={ITEMS} collapsible />

	<h1>Disabled</h1>
	<Accordion items={ITEMS} disabled />

	<h1>Trailing Icon</h1>
	<Accordion items={ITEMS} trailingicon="i-lucide-arrow-down" />
</div>
