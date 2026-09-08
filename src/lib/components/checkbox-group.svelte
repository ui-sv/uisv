<script module lang="ts">
	import { cn, tv, type ClassValue } from 'tailwind-variants';
	import type { Component, Snippet } from 'svelte';
	import {
		type PropColor,
		isComponent,
		isSnippet,
		Checkbox,
		type CheckboxProps
	} from '../index.js';

	export type CheckboxGroupProps = {
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		icon?: string | Snippet | Component;
		required?: boolean;
		indicator?: 'start' | 'end' | 'hidden';
		value?: string[];
		valuekey?: string;
		variant?: 'list' | 'card' | 'table';
		items: Array<string>;
		labelkey?: string;
		descriptionkey?: string;
		legend?: string | Snippet | Component;
		orientation?: 'horizontal' | 'vertical';
		ui?: {
			root?: ClassValue;
			container?: ClassValue;
			checkbox?: ClassValue;
		};
		checkbox?: Snippet<[CheckboxProps]>;
	};
</script>

<script lang="ts">
	let {
		value = $bindable([]),
		valuekey = 'value',
		color = 'primary',
		size = 'md',
		variant = 'list',
		items = [],
		labelkey = 'label',
		descriptionkey = 'description',
		legend,
		orientation = 'horizontal',
		ui = {},
		checkbox,
		icon,
		indicator,
		required
	}: CheckboxGroupProps = $props();
</script>

<div class={cn(ui.root)}>
	{#if typeof legend === 'string'}
		<legend>{legend}</legend>
	{:else if isSnippet(legend)}
		{@render legend()}
	{:else if isComponent(legend)}
		{@const Legend = legend}
		<Legend />
	{/if}

	<fieldset class={cn(ui.container)}>
		{#each items as item, index (index)}
			{@const key = typeof item === 'object' ? item[valuekey] : item}

			{#if checkbox}
				{@render checkbox({
					as: variant === 'list' ? 'div' : 'label',
					value: {
						get: () => value.includes(key),
						set: (v) => {
							if (v) return value.push(key);
							const index = value.findIndex((x) => x === key);
							if (index < 0) return;
							value.splice(index, 1);
						}
					},
					description: typeof item === 'object' ? item[descriptionkey] : undefined,
					label: typeof item === 'object' ? item[labelkey] : item
				})}
			{:else}
				<Checkbox />
			{/if}
		{/each}
	</fieldset>
</div>
