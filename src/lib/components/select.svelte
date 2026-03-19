<script module lang="ts">
	import type { PropColor, PropVariant } from '$lib/index.js';
	import { Select } from 'bits-ui';
	import type { Component, Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
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
		variant?: Exclude<PropVariant, 'solid'>;
		highlight?: boolean;
		placeholder?: string;
		ui?: {
			base?: ClassNameValue;
			leading?: ClassNameValue;
			leadingIcon?: ClassNameValue;
			leadingAvatar?: ClassNameValue;
			leadingAvatarSize?: ClassNameValue;
			trailing?: ClassNameValue;
			trailingIcon?: ClassNameValue;
			value?: ClassNameValue;
			placeholder?: ClassNameValue;
			arrow?: ClassNameValue;
			content?: ClassNameValue;
			viewport?: ClassNameValue;
			group?: ClassNameValue;
			empty?: ClassNameValue;
			label?: ClassNameValue;
			separator?: ClassNameValue;
			item?: ClassNameValue;
			itemLeadingIcon?: ClassNameValue;
			itemLeadingAvatar?: ClassNameValue;
			itemLeadingAvatarSize?: ClassNameValue;
			itemLeadingChip?: ClassNameValue;
			itemLeadingChipSize?: ClassNameValue;
			itemTrailing?: ClassNameValue;
			itemTrailingIcon?: ClassNameValue;
			itemWrapper?: ClassNameValue;
			itemLabel?: ClassNameValue;
			itemDescription?: ClassNameValue;
		};
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
		ui = {},
	}: SelectProps<T> = $props();

	const classes = $derived(
		tv({
			slots: {
				base: [
					'relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
					'transition-colors',
				],
				leading: 'absolute inset-y-0 start-0 flex items-center',
				leadingIcon: 'shrink-0 text-dimmed',
				leadingAvatar: 'shrink-0',
				leadingAvatarSize: '',
				trailing: 'absolute inset-y-0 end-0 flex items-center',
				trailingIcon: 'shrink-0 text-dimmed',
				value: 'truncate pointer-events-none',
				placeholder: 'truncate text-dimmed',
				arrow: 'fill-bg stroke-default',
				content:
					'max-h-60 w-(--bits-select-anchor-width) bg-inverted shadow-lg rounded-md ring ring-surface-accented overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--bits-select-content-transform-origin) pointer-events-auto flex flex-col',
				viewport: 'relative divide-y divide-base scroll-py-1 overflow-y-auto flex-1',
				group: 'p-1 isolate',
				empty: 'text-center text-muted',
				label: 'font-semibold text-highlighted',
				separator: '-mx-1 my-1 h-px bg-border',
				item: [
					'group relative w-full flex items-start select-none outline-none before:absolute before:content-[""] before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-[data-disabled]:before:bg-surface-elevated/50',
					'transition-colors before:transition-colors',
				],
				itemLeadingIcon: [
					'shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default',
					'transition-colors',
				],
				itemLeadingAvatar: 'shrink-0',
				itemLeadingAvatarSize: '',
				itemLeadingChip: 'shrink-0',
				itemLeadingChipSize: '',
				itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
				itemTrailingIcon: 'shrink-0',
				itemWrapper: 'flex-1 flex flex-col min-w-0',
				itemLabel: 'truncate',
				itemDescription: 'truncate text-muted',
			},
			variants: {
				fieldGroup: {
					horizontal:
						'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
					vertical:
						'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]',
				},
				size: {
					xs: {
						base: 'px-2 py-1 text-xs gap-1',
						leading: 'ps-2',
						trailing: 'pe-2',
						leadingIcon: 'size-4',
						leadingAvatarSize: '3xs',
						trailingIcon: 'size-4',
						label: 'p-1 text-[10px]/3 gap-1',
						item: 'p-1 text-xs gap-1',
						itemLeadingIcon: 'size-4',
						itemLeadingAvatarSize: '3xs',
						itemLeadingChip: 'size-4',
						itemLeadingChipSize: 'sm',
						itemTrailingIcon: 'size-4',
						empty: 'p-2 text-xs',
					},
					sm: {
						base: 'px-2.5 py-1.5 text-xs gap-1.5',
						leading: 'ps-2.5',
						trailing: 'pe-2.5',
						leadingIcon: 'size-4',
						leadingAvatarSize: '3xs',
						trailingIcon: 'size-4',
						label: 'p-1.5 text-[10px]/3 gap-1.5',
						item: 'p-1.5 text-xs gap-1.5',
						itemLeadingIcon: 'size-4',
						itemLeadingAvatarSize: '3xs',
						itemLeadingChip: 'size-4',
						itemLeadingChipSize: 'sm',
						itemTrailingIcon: 'size-4',
						empty: 'p-2.5 text-xs',
					},
					md: {
						base: 'px-2.5 py-1.5 text-sm gap-1.5',
						leading: 'ps-2.5',
						trailing: 'pe-2.5',
						leadingIcon: 'size-5',
						leadingAvatarSize: '2xs',
						trailingIcon: 'size-5',
						label: 'p-1.5 text-xs gap-1.5',
						item: 'p-1.5 text-sm gap-1.5',
						itemLeadingIcon: 'size-5',
						itemLeadingAvatarSize: '2xs',
						itemLeadingChip: 'size-5',
						itemLeadingChipSize: 'md',
						itemTrailingIcon: 'size-5',
						empty: 'p-2.5 text-sm',
					},
					lg: {
						base: 'px-3 py-2 text-sm gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						leadingIcon: 'size-5',
						leadingAvatarSize: '2xs',
						trailingIcon: 'size-5',
						label: 'p-2 text-xs gap-2',
						item: 'p-2 text-sm gap-2',
						itemLeadingIcon: 'size-5',
						itemLeadingAvatarSize: '2xs',
						itemLeadingChip: 'size-5',
						itemLeadingChipSize: 'md',
						itemTrailingIcon: 'size-5',
						empty: 'p-3 text-sm',
					},
					xl: {
						base: 'px-3 py-2 text-base gap-2',
						leading: 'ps-3',
						trailing: 'pe-3',
						leadingIcon: 'size-6',
						leadingAvatarSize: 'xs',
						trailingIcon: 'size-6',
						label: 'p-2 text-sm gap-2',
						item: 'p-2 text-base gap-2',
						itemLeadingIcon: 'size-6',
						itemLeadingAvatarSize: 'xs',
						itemLeadingChip: 'size-6',
						itemLeadingChipSize: 'lg',
						itemTrailingIcon: 'size-6',
						empty: 'p-3 text-base',
					},
				},
				variant: {
					outline:
						'text-highlighted bg-default ring ring-inset ring-surface-accented hover:bg-surface-elevated disabled:bg-surface-default',
					soft: 'text-highlighted bg-surface-elevated/50 hover:bg-surface-elevated focus:bg-surface-elevated disabled:bg-surface-elevated/50',
					subtle:
						'text-highlighted bg-surface-elevated ring ring-inset ring-accented hover:bg-surface-accented/75 disabled:bg-surface-elevated',
					ghost:
						'text-highlighted bg-transparent hover:bg-surface-elevated focus:bg-surface-elevated disabled:bg-transparent dark:disabled:bg-transparent',
					none: 'text-highlighted bg-transparent',
				},
				color: {
					primary: '',
					surface: '',
					success: '',
					info: '',
					warning: '',
					error: '',
				},
				leading: {
					true: '',
				},
				trailing: {
					true: '',
				},
				loading: {
					true: '',
				},
				highlight: {
					true: '',
				},
				fixed: {
					false: '',
				},
				type: {
					file: 'file:me-1.5 file:font-medium file:text-muted file:outline-none',
				},
			},
			compoundVariants: [
				{
					color: 'primary',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-primary',
				},
				{
					color: 'primary',
					highlight: true,
					class: 'ring ring-inset ring-primary',
				},
				{
					color: 'surface',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-surface-inverted',
				},
				{
					color: 'surface',
					highlight: true,
					class: 'ring ring-inset ring-surface-inverted',
				},
				{
					color: 'error',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-error',
				},
				{
					color: 'error',
					highlight: true,
					class: 'ring ring-inset ring-error',
				},
				{
					color: 'info',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-info',
				},
				{
					color: 'info',
					highlight: true,
					class: 'ring ring-inset ring-info',
				},
				{
					color: 'success',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-success',
				},
				{
					color: 'success',
					highlight: true,
					class: 'ring ring-inset ring-success',
				},
				{
					color: 'warning',
					variant: ['outline', 'subtle'],
					class: 'focus:ring-2 focus:ring-inset focus:ring-warning',
				},
				{
					color: 'warning',
					highlight: true,
					class: 'ring ring-inset ring-warning',
				},
				{
					leading: true,
					size: 'xs',
					class: 'ps-7',
				},
				{
					leading: true,
					size: 'sm',
					class: 'ps-8',
				},
				{
					leading: true,
					size: 'md',
					class: 'ps-9',
				},
				{
					leading: true,
					size: 'lg',
					class: 'ps-10',
				},
				{
					leading: true,
					size: 'xl',
					class: 'ps-11',
				},
				{
					trailing: true,
					size: 'xs',
					class: 'pe-7',
				},
				{
					trailing: true,
					size: 'sm',
					class: 'pe-8',
				},
				{
					trailing: true,
					size: 'md',
					class: 'pe-9',
				},
				{
					trailing: true,
					size: 'lg',
					class: 'pe-10',
				},
				{
					trailing: true,
					size: 'xl',
					class: 'pe-11',
				},
				{
					loading: true,
					leading: true,
					class: {
						leadingIcon: 'animate-spin',
					},
				},
				{
					loading: true,
					leading: false,
					trailing: true,
					class: {
						trailingIcon: 'animate-spin',
					},
				},
				{
					fixed: false,
					size: 'xs',
					class: 'md:text-xs',
				},
				{
					fixed: false,
					size: 'sm',
					class: 'md:text-xs',
				},
				{
					fixed: false,
					size: 'md',
					class: 'md:text-sm',
				},
				{
					fixed: false,
					size: 'lg',
					class: 'md:text-sm',
				},
			],
		})({ size, color, variant, highlight }),
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
	<Select.Trigger class={classes.base({ class: ui.base })}>
		{value || placeholder}
		<div class="i-lucide-chevron-down size-4"></div>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class={classes.content({ class: ui.content })}
			preventScroll={true}
			sideOffset={8}
		>
			<Select.ScrollUpButton />
			<Select.Viewport>
				{#each items as item, idx (idx)}
					{#if Array.isArray(item)}
						<Select.Group>
							<Select.GroupHeading />

							{#each item as group_item, gidx (gidx)}
								<Select.Item class={classes.item({ class: ui.item })} value=""></Select.Item>
							{/each}
						</Select.Group>
					{:else}
						{@const is_object = typeof item === 'object' && item !== null && 'value' in item}
						<Select.Item
							class={classes.item({ class: ui.item })}
							value={(is_object ? item.value : item) as string}
						>
							{item}
						</Select.Item>
					{/if}
				{/each}

				<Select.ScrollDownButton />
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
