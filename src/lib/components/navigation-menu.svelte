<script module lang="ts">
	import { mergeProps, NavigationMenu } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { ButtonProps } from './button.svelte';
	import type { PropColor } from '$lib/types.js';
	import { tv } from 'tailwind-variants';
	import { Button } from './index.js';

	export type NavigationMenuItem = Omit<ButtonProps, 'value'> & {
		children?: ButtonProps[];
		value?: string;
	};

	export type NavigationMenuProps = {
		items: NavigationMenuItem[];
		variant?: 'link' | 'pill';
		color?: PropColor;
		[k: `${string}-trailing`]: Snippet;
		[k: `${string}-leading`]: Snippet;
		[k: `${string}-label`]: Snippet;
		[k: `${string}-content`]: Snippet;
	};
</script>

<script lang="ts">
	let { items, variant = 'link', color = 'primary', ...rest }: NavigationMenuProps = $props();

	const variants = $derived(
		tv({
			slots: {
				root: 'relative flex gap-1.5 [&>div]:min-w-0',
				list: 'isolate min-w-0',
				label:
					'w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5',
				item: 'min-w-0',
				link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3',
				link_leading_icon: 'shrink-0 size-5',
				link_leading_avatar: 'shrink-0',
				link_leading_avatar_size: '2xs',
				link_leading_chip_size: 'sm',
				link_trailing: 'group ms-auto inline-flex gap-1.5 items-center',
				link_trailing_badge: 'shrink-0',
				link_trailing_badge_size: 'sm',
				link_trailing_icon:
					'size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200',
				link_label: 'truncate',
				link_label_external_icon: 'inline-block size-3 align-top text-dimmed',
				child_list: 'isolate',
				child_label: 'text-xs text-highlighted',
				child_item: '',
				child_link:
					'group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3',
				child_link_wrapper: 'min-w-0',
				child_link_icon: 'size-5 shrink-0',
				child_link_label: 'truncate',
				child_link_label_external_icon: 'inline-block size-3 align-top text-dimmed',
				child_link_description: 'text-muted',
				separator: 'px-2 h-px bg-border',
				viewport_wrapper: 'absolute top-full left-0 flex w-full',
				viewport:
					'relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left,right] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-1',
				content: '',
				indicator:
					'absolute left-0 data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-2 w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200',
				arrow:
					'relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-1 rounded-xs',
			},
			variants: {
				color: {
					primary: {
						link: 'before:outline-primary/25',
						child_link: 'before:outline-primary/25',
					},
					secondary: {
						link: 'before:outline-secondary/25',
						child_link: 'before:outline-secondary/25',
					},
					success: {
						link: 'before:outline-success/25',
						child_link: 'before:outline-success/25',
					},
					info: {
						link: 'before:outline-info/25',
						child_link: 'before:outline-info/25',
					},
					warning: {
						link: 'before:outline-warning/25',
						child_link: 'before:outline-warning/25',
					},
					error: {
						link: 'before:outline-error/25',
						child_link: 'before:outline-error/25',
					},
					neutral: {
						link: 'before:outline-inverted/25',
						child_link: 'before:outline-inverted/25',
					},
				},
				highlight_color: {
					primary: '',
					surface: '',
					success: '',
					info: '',
					warning: '',
					error: '',
				},
				variant: {
					pill: '',
					link: '',
				},
				orientation: {
					horizontal: {
						root: 'items-center justify-between',
						list: 'flex items-center',
						item: 'py-2',
						link: 'px-2.5 py-1.5 before:inset-x-px before:inset-y-0',
						child_list: 'grid p-2',
						child_link: 'px-3 py-2 gap-2 before:inset-x-px before:inset-y-0',
						child_linkLabel: 'font-medium',
						content: 'absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto',
					},
					vertical: {
						root: 'flex-col',
						link: 'flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0',
						childLabel: 'px-1.5 py-0.5',
						child_link: 'p-1.5 gap-1.5 before:inset-y-px before:inset-x-0',
					},
				},
				content_orientation: {
					horizontal: {
						viewportWrapper: 'justify-center',
						content:
							'data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]',
					},
					vertical: {
						viewport:
							'sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left) rtl:left-auto rtl:right-[calc(100%-var(--reka-navigation-menu-viewport-left)-var(--reka-navigation-menu-viewport-width))]',
					},
				},
				active: {
					true: {
						child_link: 'before:bg-elevated text-highlighted',
						child_linkIcon: 'text-default',
					},
					false: {
						link: 'text-muted',
						link_leading_icon: 'text-dimmed',
						child_link: [
							'hover:before:bg-elevated/50 text-default hover:text-highlighted',
							'transition-colors before:transition-colors',
						],
						child_linkIcon: ['text-dimmed group-hover:text-default', 'transition-colors'],
					},
				},
				disabled: {
					true: {
						link: 'cursor-not-allowed opacity-75',
					},
				},
				highlight: {
					true: '',
				},
				level: {
					true: '',
				},
				collapsed: {
					true: '',
				},
			},
			compoundVariants: [
				{
					orientation: 'horizontal',
					content_orientation: 'horizontal',
					class: {
						child_list: 'grid-cols-2 gap-2',
					},
				},
				{
					orientation: 'horizontal',
					content_orientation: 'vertical',
					class: {
						child_list: 'gap-1',
						content: 'w-60',
					},
				},
				{
					orientation: 'vertical',
					collapsed: false,
					class: {
						child_list: 'ms-5 border-s border-default',
						child_item: 'ps-1.5 -ms-px',
						content:
							'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=closed]:overflow-hidden',
					},
				},
				{
					orientation: 'vertical',
					collapsed: true,
					class: {
						link: 'px-1.5',
						link_label: 'hidden',
						link_trailing: 'hidden',
						content: 'shadow-sm rounded-sm min-h-6 p-1',
					},
				},
				{
					orientation: 'horizontal',
					highlight: true,
					class: {
						link: [
							'after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full',
							'after:transition-colors',
						],
					},
				},
				{
					orientation: 'vertical',
					highlight: true,
					level: true,
					class: {
						link: [
							'after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full',
							'after:transition-colors',
						],
					},
				},
				{
					disabled: false,
					active: false,
					variant: 'pill',
					class: {
						link: [
							'hover:text-highlighted hover:before:bg-elevated/50',
							'transition-colors before:transition-colors',
						],
						link_leading_icon: ['group-hover:text-default', 'transition-colors'],
					},
				},
				{
					disabled: false,
					active: false,
					variant: 'pill',
					orientation: 'horizontal',
					class: {
						link: 'data-[state=open]:text-highlighted',
						link_leading_icon: 'group-data-[state=open]:text-default',
					},
				},
				{
					disabled: false,
					variant: 'pill',
					highlight: true,
					orientation: 'horizontal',
					class: {
						link: 'data-[state=open]:before:bg-elevated/50',
					},
				},
				{
					disabled: false,
					variant: 'pill',
					highlight: false,
					active: false,
					orientation: 'horizontal',
					class: {
						link: 'data-[state=open]:before:bg-elevated/50',
					},
				},
				{
					color: 'primary',
					variant: 'pill',
					active: true,
					class: {
						link: 'text-primary',
						link_leading_icon: 'text-primary group-data-[state=open]:text-primary',
					},
				},
				{
					color: 'neutral',
					variant: 'pill',
					active: true,
					class: {
						link: 'text-highlighted',
						link_leading_icon: 'text-highlighted group-data-[state=open]:text-highlighted',
					},
				},
				{
					variant: 'pill',
					active: true,
					highlight: false,
					class: {
						link: 'before:bg-elevated',
					},
				},
				{
					variant: 'pill',
					active: true,
					highlight: true,
					disabled: false,
					class: {
						link: ['hover:before:bg-elevated/50', 'before:transition-colors'],
					},
				},
				{
					disabled: false,
					active: false,
					variant: 'link',
					class: {
						link: ['hover:text-highlighted', 'transition-colors'],
						link_leading_icon: ['group-hover:text-default', 'transition-colors'],
					},
				},
				{
					disabled: false,
					active: false,
					variant: 'link',
					orientation: 'horizontal',
					class: {
						link: 'data-[state=open]:text-highlighted',
						link_leading_icon: 'group-data-[state=open]:text-default',
					},
				},
				{
					color: 'primary',
					variant: 'link',
					active: true,
					class: {
						link: 'text-primary',
						link_leading_icon: 'text-primary group-data-[state=open]:text-primary',
					},
				},
				{
					color: 'neutral',
					variant: 'link',
					active: true,
					class: {
						link: 'text-highlighted',
						link_leading_icon: 'text-highlighted group-data-[state=open]:text-highlighted',
					},
				},
				{
					highlight_color: 'primary',
					highlight: true,
					level: true,
					active: true,
					class: {
						link: 'after:bg-primary',
					},
				},
				{
					highlight_color: 'neutral',
					highlight: true,
					level: true,
					active: true,
					class: {
						link: 'after:bg-inverted',
					},
				},
			],
		})({ color, variant }),
	);
</script>

<NavigationMenu.Root class={variants.root({})}>
	<NavigationMenu.List class={variants.list({})}>
		{#each items as item, idx (idx)}
			{@render item_snippet(item, idx)}
		{/each}

		<NavigationMenu.Indicator class={variants.indicator({})} />
	</NavigationMenu.List>

	<NavigationMenu.Viewport class={variants.viewport({})} />
</NavigationMenu.Root>

{#snippet item_snippet(item: NavigationMenuItem, idx: number)}
	<NavigationMenu.Item>
		<NavigationMenu.Trigger />

		<NavigationMenu.Content />
	</NavigationMenu.Item>

	<NavigationMenu.Item>
		<NavigationMenu.Trigger />

		<NavigationMenu.Content>
			<NavigationMenu.Link />
		</NavigationMenu.Content>
	</NavigationMenu.Item>

	<NavigationMenu.Item></NavigationMenu.Item>

	<NavigationMenu.Item class={variants.item({})} value={item.value || String(idx)}>
		{#if item.href}
			<NavigationMenu.Link class={variants.link({})}>
				{#snippet child({ props })}
					{@render trigger_snippet({ props, item })}
				{/snippet}
			</NavigationMenu.Link>
		{:else}
			<NavigationMenu.Trigger class={variants.({})}>
				{#snippet child({ props })}
					{@render trigger_snippet({ props, item })}
				{/snippet}
			</NavigationMenu.Trigger>
		{/if}

		{#if item.children}
			<NavigationMenu.Content>
				<NavigationMenu.Sub>
					<NavigationMenu.List />
					<NavigationMenu.Viewport />
				</NavigationMenu.Sub>
			</NavigationMenu.Content>
		{/if}
	</NavigationMenu.Item>
{/snippet}

{#snippet trigger_snippet(options: { props?: Record<string, unknown>; item: NavigationMenuItem })}
	<Button {...mergeProps(options.props, options.item)}></Button>
{/snippet}
