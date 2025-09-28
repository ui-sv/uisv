import { defuFn } from 'defu';
import type { PluginOptions } from '$lib/vite.js';
import input from './input';

export default (options: Required<ModuleOptions>) => {
	return defuFn(
		{
			slots: {
				base: () => ['rounded-md', options.theme.transitions && 'transition-colors'],
				trailing:
					'group absolute inset-y-0 end-0 flex items-center disabled:cursor-not-allowed disabled:opacity-75',
				arrow: 'fill-default',
				content:
					'max-h-60 w-(--reka-combobox-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-combobox-content-transform-origin) pointer-events-auto flex flex-col',
				viewport: 'relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1',
				group: 'p-1 isolate',
				empty: 'text-center text-muted',
				label: 'font-semibold text-highlighted',
				separator: '-mx-1 my-1 h-px bg-border',
				item: [
					'group relative w-full flex items-center gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50',
					options.theme.transitions && 'transition-colors before:transition-colors'
				],
				itemLeadingIcon: [
					'shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default',
					options.theme.transitions && 'transition-colors'
				],
				itemLeadingAvatar: 'shrink-0',
				itemLeadingAvatarSize: '',
				itemLeadingChip: 'shrink-0',
				itemLeadingChipSize: '',
				itemTrailing: 'ms-auto inline-flex gap-1.5 items-center',
				itemTrailingIcon: 'shrink-0',
				itemLabel: 'truncate',
				tagsItem:
					'px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-accented bg-elevated text-default data-disabled:cursor-not-allowed data-disabled:opacity-75',
				tagsItemText: 'truncate',
				tagsItemDelete: [
					'inline-flex items-center rounded-xs text-dimmed hover:text-default hover:bg-accented/75 disabled:pointer-events-none',
					options.theme.transitions && 'transition-colors'
				],
				tagsItemDeleteIcon: 'shrink-0',
				tagsInput:
					'flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75'
			},
			variants: {
				multiple: {
					true: {
						root: 'flex-wrap'
					},
					false: {
						base: 'w-full border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75'
					}
				},
				size: {
					xs: {
						label: 'p-1 text-[10px]/3 gap-1',
						item: 'p-1 text-xs gap-1',
						itemLeadingIcon: 'size-4',
						itemLeadingAvatarSize: '3xs',
						itemLeadingChip: 'size-4',
						itemLeadingChipSize: 'sm',
						itemTrailingIcon: 'size-4',
						tagsItem: 'text-[10px]/3',
						tagsItemDeleteIcon: 'size-3',
						empty: 'p-1 text-xs'
					},
					sm: {
						label: 'p-1.5 text-[10px]/3 gap-1.5',
						item: 'p-1.5 text-xs gap-1.5',
						itemLeadingIcon: 'size-4',
						itemLeadingAvatarSize: '3xs',
						itemLeadingChip: 'size-4',
						itemLeadingChipSize: 'sm',
						itemTrailingIcon: 'size-4',
						tagsItem: 'text-[10px]/3',
						tagsItemDeleteIcon: 'size-3',
						empty: 'p-1.5 text-xs'
					},
					md: {
						label: 'p-1.5 text-xs gap-1.5',
						item: 'p-1.5 text-sm gap-1.5',
						itemLeadingIcon: 'size-5',
						itemLeadingAvatarSize: '2xs',
						itemLeadingChip: 'size-5',
						itemLeadingChipSize: 'md',
						itemTrailingIcon: 'size-5',
						tagsItem: 'text-xs',
						tagsItemDeleteIcon: 'size-3.5',
						empty: 'p-1.5 text-sm'
					},
					lg: {
						label: 'p-2 text-xs gap-2',
						item: 'p-2 text-sm gap-2',
						itemLeadingIcon: 'size-5',
						itemLeadingAvatarSize: '2xs',
						itemLeadingChip: 'size-5',
						itemLeadingChipSize: 'md',
						itemTrailingIcon: 'size-5',
						tagsItem: 'text-xs',
						tagsItemDeleteIcon: 'size-3.5',
						empty: 'p-2 text-sm'
					},
					xl: {
						label: 'p-2 text-sm gap-2',
						item: 'p-2 text-base gap-2',
						itemLeadingIcon: 'size-6',
						itemLeadingAvatarSize: 'xs',
						itemLeadingChip: 'size-6',
						itemLeadingChipSize: 'lg',
						itemTrailingIcon: 'size-6',
						tagsItem: 'text-sm',
						tagsItemDeleteIcon: 'size-4',
						empty: 'p-2 text-base'
					}
				}
			},
			compoundVariants: [
				{
					variant: 'soft',
					multiple: true,
					class: 'has-focus:bg-elevated'
				},
				{
					variant: 'ghost',
					multiple: true,
					class: 'has-focus:bg-elevated'
				},
				...(options.theme.colors || []).map((color: string) => ({
					color,
					multiple: true,
					variant: ['outline', 'subtle'],
					class: `has-focus-visible:ring-2 has-focus-visible:ring-${color}`
				})),
				{
					color: 'neutral',
					multiple: true,
					variant: ['outline', 'subtle'],
					class: 'has-focus-visible:ring-2 has-focus-visible:ring-inverted'
				}
			]
		},
		input(options)
	);
};
