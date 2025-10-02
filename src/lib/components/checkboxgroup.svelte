<script module lang="ts">
	import { isComponent, isSnippet } from '$lib/utils/common.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import { Checkbox } from './index.js';
	import type { Component, Snippet } from 'svelte';
	import type { PropColor } from '$lib/types.js';

	/* eslint @typescript-eslint/no-explicit-any: 0 */

	export type CheckboxGroupProps = {
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		icon?: string | Snippet | Component;
		required?: boolean;
		indicator?: 'start' | 'end' | 'hidden';
		value?: any[];
		valuekey?: string;
		variant?: 'list' | 'card' | 'table';
		items: Array<any>;
		labelkey?: string;
		descriptionkey?: string;
		legend?: string | Snippet | Component;
		orientation?: 'horizontal' | 'vertical';
		ui?: {
			root?: ClassNameValue;
			container?: ClassNameValue;
			checkbox?: ClassNameValue;
		};
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
		...props
	}: CheckboxGroupProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: '',
				container: 'flex',
				checkbox: ''
			},
			variants: {
				color: {
					primary: {
						container: []
					},
					secondary: {
						container: []
					},
					info: {
						container: []
					},
					success: {
						container: []
					},
					warning: {
						container: []
					},
					error: {
						container: []
					}
				},
				size: {
					xs: {
						container: '',
						icon: 'size-3'
					},
					sm: {
						container: '',
						icon: 'size-3.5'
					},
					md: {
						container: '',
						icon: 'size-4'
					},
					lg: {
						container: '',
						icon: 'size-4.5'
					},
					xl: {
						container: '',
						icon: 'size-5'
					}
				},
				variant: {
					list: { container: 'gap-2' },
					card: { container: 'gap-2', checkbox: 'p-4 rounded-lg border border-neutral-200' },
					table: {
						container: 'gap-0 ',
						checkbox: 'border border-neutral-200 p-4 data-[state=checked]:z-1'
					}
				},
				orientation: {
					horizontal: {
						container: 'flex-row',
						checkbox:
							'[&:not(:last-child)]:(-me-px ms-0) first-of-type:rounded-s-lg last-of-type:rounded-e-lg'
					},
					vertical: {
						container: 'flex-col -space-y-px'
					}
				},
				selected: { true: '', false: '' }
			},
			compoundVariants: [
				{
					color: 'primary',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-primary-500'
					}
				},
				{
					color: 'secondary',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-secondary-500'
					}
				},
				{
					color: 'info',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-info-500'
					}
				},
				{
					color: 'success',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-success-500'
					}
				},
				{
					color: 'warning',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-warning-500'
					}
				},
				{
					color: 'error',
					selected: true,
					variant: ['table', 'card'],
					class: {
						checkbox: 'border-error-500'
					}
				},

				{
					color: 'primary',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-primary-100'
					}
				},
				{
					color: 'secondary',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-secondary-100'
					}
				},
				{
					color: 'info',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-info-100'
					}
				},
				{
					color: 'success',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-success-100'
					}
				},
				{
					color: 'warning',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-warning-100'
					}
				},
				{
					color: 'error',
					selected: true,
					variant: ['table'],
					class: {
						checkbox: 'bg-error-100'
					}
				}
			]
		})({ color, size, variant, orientation })
	);
</script>

<div class={classes.root({ class: [ui.root] })}>
	{#if typeof legend === 'string'}
		<legend>{legend}</legend>
	{:else if isSnippet(legend)}
		{@render legend()}
	{:else if isComponent(legend)}
		{@const Legend = legend}
		<Legend />
	{/if}

	<fieldset class={classes.container({ class: [ui.container] })}>
		{#each items as item, index (index)}
			{@const key = typeof item === 'object' ? item[valuekey] : item}

			<Checkbox
				{...props}
				{color}
				as={variant === 'list' ? 'div' : 'label'}
				ui={{
					root: classes.checkbox({
						class: [ui.checkbox],
						selected: value.includes(key)
					})
				}}
				bind:value={
					() => value.includes(key),
					(v) => {
						if (v) return value.push(key);
						const index = value.findIndex((x) => x === key);
						if (index < 0) return;
						value.splice(index, 1);
					}
				}
				description={typeof item === 'object' ? item[descriptionkey] : undefined}
				label={typeof item === 'object' ? item[labelkey] : item}
			/>
		{/each}
	</fieldset>
</div>
