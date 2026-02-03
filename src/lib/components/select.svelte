<script module lang="ts">
	import type { PropColor } from '$lib/index.js';
	import { Select } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	export type SelectItem<T> =
		| T
		| {
				icon?: string | Component;
				label: string | Component;
				value: T;
		  };

	export type SelectProps<T> = {
		items: (SelectItem<T> | SelectItem<T>[])[];
		defaultvalue?: T;
		item?: Snippet<[{ item: SelectItem<T> }]>;
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none';
		highlight?: boolean;
		placeholder?: string;
	} & (
		| {
				value?: T;
				type?: 'single';
		  }
		| {
				value?: T[];
				type?: 'multiple';
		  }
	);
</script>

<script lang="ts" generics="T extends unknown">
	let {
		value = $bindable(),
		items,
		type = 'single',
		defaultvalue,
		item,
		color = 'primary',
		size = 'md',
		variant = 'outline',
		highlight,
		placeholder,
	}: SelectProps<T> = $props();

	const classes = $derived(
		tv({
			slots: {
				trigger: 'transition-all rounded w-48 flex items-center justify-between',
			},
			variants: {
				color: {
					primary: {
						trigger: 'outline-primary focus:(border-primary)',
					},
					surface: {
						trigger: 'outline-surface focus:(border-surface)',
					},
					info: {
						trigger: 'outline-info focus:(border-info)',
					},
					success: {
						trigger: 'outline-success focus:(border-success)',
					},
					warning: {
						trigger: 'outline-warning focus:(border-warning)',
					},
					error: {
						trigger: 'outline-error focus:(border-error)',
					},
				},
				size: {
					xs: {
						trigger: 'h-6 px-1 text-xs gap-1',
					},
					sm: {
						trigger: 'h-7 px-2 text-xs gap-1',
					},
					md: {
						trigger: 'h-8 px-2 text-sm gap-2 ',
					},
					lg: {
						trigger: 'h-9 px-3 text-sm gap-3',
					},
					xl: {
						trigger: 'h-10 px-3 gap-4',
					},
				},
				variant: {
					outline: {
						trigger: 'border border-surface-accented focus:(outline)',
					},
					soft: {
						trigger: 'bg-surface-elevated',
					},
					subtle: {
						trigger: 'bg-surface-elevated border border-surface-accented focus:(outline)',
					},
					ghost: {
						trigger: 'hover:bg-surface-elevated',
					},
					none: {},
				},
				placeholder: {
					true: { trigger: 'text-muted' },
					false: {},
				},
				highlight: {
					true: {
						trigger: 'border',
					},
					false: {},
				},
			},
			compoundVariants: [
				{ color: 'primary', highlight: true, class: { trigger: 'border-primary-500' } },
				{ color: 'surface', highlight: true, class: { trigger: 'border-surface-500' } },
				{ color: 'info', highlight: true, class: { trigger: 'border-info-500' } },
				{ color: 'success', highlight: true, class: { trigger: 'border-success-500' } },
				{ color: 'warning', highlight: true, class: { trigger: 'border-warning-500' } },
				{ color: 'error', highlight: true, class: { trigger: 'border-error-500' } },
			],
		})({ size, color, variant, placeholder: !!placeholder, highlight }),
	);
</script>

{/* @ts-expect-error idek */ null}
<Select.Root
	{type}
	bind:value={
		() => {
			if (type === 'single') return value as string | string[];
			return value as string | string[];
		},
		(v) => (value = v as T | T[] | undefined)
	}
>
	<Select.Trigger class={classes.trigger()}>
		{value || placeholder}
		<div class="i-lucide-chevron-down size-4"></div>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content class="bg-red">
			<Select.ScrollUpButton />
			<Select.Viewport>
				{#each items as item, idx (idx)}
					{#if Array.isArray(item)}
						<Select.Group>
							<Select.GroupHeading />

							{#each item as group_item, gidx (gidx)}
								<Select.Item value=""></Select.Item>
							{/each}
						</Select.Group>
					{:else}
						{@const is_object = typeof item === 'object' && item !== null && 'value' in item}
						<Select.Item value={(is_object ? item.value : item) as string}>
							{item}
						</Select.Item>
					{/if}
				{/each}

				<Select.ScrollDownButton />
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
