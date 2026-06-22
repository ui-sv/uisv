<script module lang="ts">
	import type { PropColor, PropSize, PropVariant } from '$lib/types.js';
	import { RadioGroup } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	export type RadioGroupItem =
		| {
				label?: string;
				description?: string;
				value?: string;
				[k: string | number | symbol]: unknown;
		  }
		| string;

	export type RadioGroupProps = {
		value?: string;
		items: RadioGroupItem[];
		valuekey?: string;
		variant?: 'list' | 'card' | 'table';
		color?: PropColor;
		size?: PropSize;
		orientation?: 'horizontal' | 'vertical';
		indicator?: 'start' | 'end' | 'hidden';
		disabled?: boolean;
		item?: Snippet<[{ item: RadioGroupItem }]>;
		loop?: boolean;
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		items,
		valuekey = 'value',
		variant = 'list',
		color = 'primary',
		size = 'md',
		orientation = 'vertical',
		indicator = 'end',
		disabled,
		item: item_snippet,
		loop,
	}: RadioGroupProps = $props();

	const variants = $derived(
		tv({
			slots: {
				base: 'flex',
				item: '',
				indicator: '',
				wrapper: '',
			},
			variants: {
				color: {},
				variant: {
					list: {},
					card: { item: 'border border-surface-muted rounded-lg' },
					table: { item: 'border border-surface-muted' },
				},
				orientation: {
					horizontal: {
						base: 'flex-row',
					},
					vertical: {
						base: 'flex-col',
					},
				},
			},
		})({}),
	);
</script>

<RadioGroup.Root class={variants.base({})} {orientation} {loop}>
	{#each items as item, idx (idx)}
		{@const is_obj = typeof item === 'object'}
		<div class={variants.item({})}>
			{#if indicator === 'start'}
				{@render indicator_snippet(item)}
			{/if}

			{#if item_snippet}
				{@render item_snippet({ item })}
			{:else}
				<div class={variants.wrapper({})}>
					<label for="">{is_obj ? item.label : item}</label>
				</div>
			{/if}

			{#if indicator === 'start'}
				{@render indicator_snippet(item)}
			{/if}
		</div>
	{/each}
</RadioGroup.Root>

{#snippet indicator_snippet(item: RadioGroupItem)}
	<RadioGroup.Item
		value={typeof item === 'string' ? item : (item[valuekey] as string)}
		class={variants.indicator({})}
	/>
{/snippet}
