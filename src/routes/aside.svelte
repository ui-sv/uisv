<script lang="ts">
	import { kebabCase } from 'scule';

	/* eslint svelte/no-navigation-without-resolve: "off" */

	const LINKS = {
		Layout: ['App', 'Container', 'Error', 'Footer', 'Header', 'Main'],
		Element: [
			'Alert',
			'Avatar',
			'AvatarGroup',
			'Badge',
			'Banner',
			'Button',
			'Calendar',
			'Card',
			'Chip',
			'Collapsible',
			'FieldGroup',
			'Icon',
			'Kbd',
			'Progress',
			'Seperator',
			'Skeleton',
		],
		Form: [
			'Checkbox',
			'CheckboxGroup',
			'ColorPicker',
			'FileUpload',
			'Form',
			'FormField',
			'Input',
			'InputDate',
			'InputMenu',
			'InputNumber',
			'InputTags',
			'InputTime',
			'PinInput',
			'RadioGroup',
			'Select',
			'SelectMenu',
			'Slider',
			'Switch',
			'Textarea',
		],
		Data: [
			'Accordion',
			'Carousel',
			'Empty',
			'Marquee',
			'ScrollArea',
			'Table',
			'Timeline',
			'Tree',
			'User',
		],
		Navigation: [
			'Breadcrumb',
			'CommandPalette',
			'FooterColumns',
			'Link',
			'NavigationMenu',
			'Pagination',
			'Stepper',
			'Tabs',
		],
		Overlay: [
			'ContextMenu',
			'Drawer',
			'DropdownMenu',
			'Modal',
			'Popover',
			'Slideover',
			'Toast',
			'Tooltip',
		],
	};
</script>

<aside
	class={[
		'sticky left-0 top-12 bg-white w-xs bottom-0 border-r border-neutral-200 <md:hidden p-4 max-h-[calc(100vh-var(--spacing)*12)] overflow-y-auto',
	]}
>
	{#each Object.entries(LINKS) as [label, links] (label)}
		<div class="font-medium">{label}</div>

		{#each links as href (href)}
			<div>
				<a href="/components/{kebabCase(href)}">
					{href}
				</a>
			</div>
		{/each}
	{/each}
</aside>
