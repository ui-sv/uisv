<script lang="ts">
	import { Accordion, type AccordionProps } from '$lib/index.js';
	import ApiReferences from '$site/api-references.svelte';
	import CodeSnippet from '$site/code-snippet.svelte';
	import defu from 'defu';

	const items = [
		{
			label: 'What is uisv?',
			content: 'An unstyled Svelte component library with snippets API.',
		},
		{
			label: 'Is it styled?',
			content: 'uisv covers behavior and layout mechanics. You supply the visual styles.',
		},
		{
			label: 'Is it accessible?',
			content: 'Yes, it is built on top of Bits UI. I would hope so.',
		},
	];

	function ui(v: AccordionProps['ui'] = {}) {
		return defu(v, <AccordionProps['ui']>{
			root: 'w-sm divide-y divide-surface-accented',
			item: 'data-[state=open]:pb-4 transition-all',
			trigger: 'w-full flex items-center justify-between p-4 font-semibold',
			icon: 'data-[state=open]:rotate-180 transition-all',
			content:
				'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4 transition-all overflow-hidden',
		});
	}
</script>

<h1>Accordion</h1>

<p>
	Accordion displays expandable sections with single or multiple selection and keyboard navigation.
</p>

<h2 id="usage">Usage</h2>

<CodeSnippet>
	<Accordion {items} ui={ui()} />

	{#snippet code()}
		```svelte
		<script lang="ts">
			import { Accordion } from 'uisv';
		</script>

		<Accordion
			items={[
				{
					label: 'What is uisv?',
					content: 'An unstyled Svelte component library with snippets API.',
				},
				{
					label: 'Is it styled?',
					content: 'uisv covers behavior and layout mechanics. You supply the visual styles.',
				},
				{
					label: 'Is it accessible?',
					content: 'Yes, it is built on top of Bits UI. I would hope so.',
				},
			]}
			ui={{
				root: 'w-sm divide-y divide-surface-accented',
				item: 'data-[state=open]:pb-4 transition-all',
				trigger: 'w-full flex items-center justify-between p-4 font-semibold',
				icon: 'data-[state=open]:rotate-180 transition-all',
				content:
					'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4 transition-all overflow-hidden',
			}}
		/>
		```
	{/snippet}
</CodeSnippet>

<h3 id="custom-icon">Custom icon</h3>

<p>Use the <code>icon</code> prop to change the change the trigger's icon.</p>

<CodeSnippet>
	<Accordion {items} ui={ui()} icon="i-lucide:arrow-up" />

	{#snippet code()}
		```svelte
		<Accordion {items} icon="i-lucide:arrow-up" />
		```
	{/snippet}
</CodeSnippet>

<h3 id="multiple">Multiple</h3>

<p>Change the <code>type</code> prop to <code>"multiple"</code> to open multiple items.</p>

<CodeSnippet>
	<Accordion {items} ui={ui()} type="multiple" />

	{#snippet code()}
		```svelte
		<Accordion {items} type="multiple" />
		```
	{/snippet}
</CodeSnippet>

<ApiReferences
	props={[
		{
			name: 'items',
			description: 'Required. List of accordion items.',
			type: 'AccordionItem[]',
		},
		{
			name: 'type',
			description: 'Whether one or many items can be open simultaneously.',
			type: '"single" | "multiple"',
			default: '"single"',
		},
		{
			name: 'ref',
			description: 'The underlying DOM element being rendered.',
			type: 'HTMLDivElement',
			default: 'null',
			bindable: true,
		},
		{
			name: 'icon',
			description: "Arrow icon trailing an item' header.",
			type: 'string',
			default: '"i-lucide:chevron-down"',
		},
		{
			name: '',
			description: '',
			type: '',
		},
		{
			name: '',
			description: '',
			type: '',
		},
		{
			name: '',
			description: '',
			type: '',
		},
		{
			name: '',
			description: '',
			type: '',
		},
	]}
	snippets={[
		{
			name: '[item.content]',
			props: '{ item: AccordionItem; index: number; open: boolean }',
			description: 'Panel body content for every item.',
		},
		{
			name: 'trigger',
			props: '{ item: AccordionItem; index: number; open: boolean }',
			description: 'An optional snippet when you want more than a leading icon.',
		},
	]}
	ui={[
		{
			name: 'root',
			class: 'uisv-button',
			attrs: ['data-disabled', 'data-state'],
		},
		{
			name: 'icon',
			class: 'uisv-button-icon',
			attrs: ['data-disabled', 'data-state'],
		},
		{
			name: 'leadingicon',
			class: 'uisv-button-icon-leading',
			attrs: ['data-disabled', 'data-state'],
		},
		{
			name: 'trailingicon',
			class: 'uisv-button-icon-trailing',
			attrs: ['data-disabled', 'data-state'],
		},
	]}
/>
