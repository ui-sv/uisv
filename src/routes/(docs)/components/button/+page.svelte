<script lang="ts">
	import { Button } from '$lib/index.js';
	import ApiReferences from '$site/api-references.svelte';
	import CodeSnippet from '$site/code-snippet.svelte';

	const async_fn = async () => new Promise((resolve) => setTimeout(resolve, 2000));

	const ghost_class =
		'flex items-center gap-2 px-4 h-8 transition-all hover:bg-surface-muted active:translate-y-0.5 text-sm font-medium';
	const ghost_icon_class =
		'size-8 grid place-items-center transition-all hover:bg-surface-muted active:translate-y-0.5';
	const outline_class =
		'flex items-center gap-2 border px-4 h-8 border-surface-accented transition-all hover:bg-surface-muted active:translate-y-0.5 text-sm font-medium';
	const outline_icon_class =
		'border size-8 grid place-items-center border-surface-accented transition-all hover:bg-surface-muted active:translate-y-0.5';
	const primary_class =
		'flex items-center gap-2 border px-4 h-8 border-surface-accented transition-all bg-primary text-white hover:bg-primary/75 active:translate-y-0.5 text-sm font-medium';
	const primary_icon_class =
		'border size-8 grid place-items-center border-surface-accented transition-all bg-primary text-white hover:bg-primary/75 active:translate-y-0.5';
	const ui = { icon: 'data-[loading]:animate-spin' };
</script>

<h1>Button</h1>

<p>
	A component that can switch between a button and an anchor tag based on the <code>href</code> prop.
</p>

<h2>Usage</h2>

<CodeSnippet>
	<Button label="Ghost" class={ghost_class} />
	<Button icon="i-lucide:arrow-up" class={ghost_icon_class} />

	<Button label="Outline" class={outline_class} />
	<Button icon="i-lucide:arrow-up" class={outline_icon_class} />

	<Button label="Primary" class={primary_class} />
	<Button icon="i-lucide:arrow-up" class={primary_icon_class} />

	{#snippet code()}
		```svelte
		<script lang="ts">
			import { Button } from 'uisv';
		</script>

		<Button
			label="Button"
			class="border px-4 h-8 border-surface-accented transition-all text-sm font-medium
			hover:bg-surface-muted active:translate-y-0.5"
		/>

		<Button
			icon="i-lucide:arrow-up"
			class="border size-8 grid place-items-center border-surface-accented transition-all
			hover:bg-surface-muted active:translate-y-0.5"
		/>
		```
	{/snippet}
</CodeSnippet>

<h3>Loading state</h3>

<p>
	Use <code>loadingauto</code> to automatically show a spinner while the <code>onclick</code> handler's
	Promise is pending.
</p>

<CodeSnippet>
	<Button label="Ghost" class={ghost_class} onclick={async_fn} {ui} />
	<Button icon="i-lucide:arrow-up" class={ghost_icon_class} onclick={async_fn} {ui} />

	<Button label="Outline" class={outline_class} onclick={async_fn} {ui} />
	<Button icon="i-lucide:arrow-up" class={outline_icon_class} onclick={async_fn} {ui} />

	<Button label="Primary" class={primary_class} onclick={async_fn} {ui} />
	<Button icon="i-lucide:arrow-up" class={primary_icon_class} onclick={async_fn} {ui} />

	{#snippet code()}
		```svelte
		<Button label="Button" onclick={async_fn} />

		<Button icon="i-lucide:arrow-up" onclick={async_fn} />
		```
	{/snippet}
</CodeSnippet>

<h3>Link</h3>

<p>You can pass <code>href</code> to render as a link, as well as any anchor property.</p>

<CodeSnippet>
	<Button href="/components" label="Components" class={ghost_class} />
	<Button href="https://github.com/ui-sv/uisv" icon="i-lucide:github" class={ghost_icon_class} />

	{#snippet code()}
		```svelte
		<Button href="/components" label="Components" />

		<Button href="https://github.com/ui-sv/uisv" icon="i-lucide:github" />
		```
	{/snippet}
</CodeSnippet>

<ApiReferences
	props={[
		{
			name: 'disabled',
			description:
				'The underlying DOM element being rendered. You can bind to this to get a reference to the element.',
			type: 'boolean',
			default: 'false',
		},
		{
			name: 'ref',
			description:
				'The underlying DOM element being rendered. You can bind to this to get a reference to the element.',
			type: 'HTMLButtonElement',
		},
		{
			name: 'label',
			description:
				'String version of the children snippet. Easier if you want to self close the button tag. ',
			type: 'string',
		},
		{
			name: 'icon',
			description: 'Icon name to render with iconify syntax naming.',
			type: 'string',
		},
		{
			name: 'iconposition',
			description: 'Which position you want to display the icon.',
			type: '"leading" | "trailing"',
		},
		{
			name: 'trailingicon',
			description: 'When you need a trailing icon.',
			type: 'string',
		},
		{
			name: 'href',
			description: 'An optional prop that when passed converts the button into an anchor tag.',
			type: 'string',
		},
		{
			name: 'loadingauto',
			description: 'Automatically set icon to a spinner icon.',
			type: 'boolean',
			default: 'true',
		},
	]}
	snippets={[
		{
			name: 'children',
			description: 'When you need more than just text.',
		},
		{
			name: 'trailing',
			description: 'An optional snippet when you want more than a trailing icon.',
		},
		{
			name: 'leading',
			description: 'An optional snippet when you want more than a leading icon.',
		},
	]}
	ui={[
		{
			name: 'base',
			class: 'uisv-button',
			attrs: ['data-disabled', 'data-loading'],
		},
		{
			name: 'icon',
			class: 'uisv-button-icon',
			attrs: ['data-disabled', 'data-loading'],
		},
		{
			name: 'leadingicon',
			class: 'uisv-button-icon-leading',
			attrs: ['data-disabled', 'data-loading'],
		},
		{
			name: 'trailingicon',
			class: 'uisv-button-icon-trailing',
			attrs: ['data-disabled', 'data-loading'],
		},
	]}
/>
