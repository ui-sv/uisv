<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { Popover, type PopoverContentProps } from 'bits-ui';
	import { cn, tv } from 'tailwind-variants';
	import Button, { type ButtonProps } from './button.svelte';
	import type { PropColor } from '$lib/index.js';

	export type PopoverContentSnippet = {
		props: Record<string, unknown>;
		open: boolean;
		wrapperProps: Record<string, unknown>;
	};

	export type PopoverProps = {
		/**
		 * The display mode of the popover.
		 */
		mode?: 'hover' | 'click';
		/**
		 * The props for the content of popover.
		 */
		contentprops?: PopoverContentProps;
		content?: Snippet<[PopoverContentSnippet]>;
		children?: Snippet<[]>;
		/**
		 * Snippet if you want to implement your own trigger button
		 */
		trigger?: Snippet<[Record<string, unknown>]>;
		/**
		 * Display an arrow alongside the popover.
		 */
		arrow?: boolean;
		/**
		 * Render the popover in a portal.
		 */
		portal?: string | false | true | HTMLElement;
		/**
		 * The reference (or anchor) element that is being referred to for positioning. If not provided will use the current component as anchor.
		 */
		reference?:
			| Element
			| {
					getBoundingClientRect: () => DOMRect;
					getClientRects: () => DOMRect[];
					contextElement?: Element;
			  };
		/**
		 * When `false`, the popover will not close when clicking outside or pressing escape.
		 */
		dismissible?: boolean;
		/**
		 * The open state of the popover when it is initially rendered. Use when you do not need to control its open state.
		 */
		defaultopen?: boolean;
		/**
		 * The controlled open state of the popover.
		 */
		open?: boolean;
		/**
		 * The modality of the popover. When set to `true`, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
		 */
		modal?: boolean;
		/**
		 * The duration from when the mouse enters the trigger until the hover card opens.
		 */
		opendelay?: number;
		/**
		 * The duration from when the mouse leaves the trigger or content until the hover card closes.
		 */
		closedelay?: number;
		/**
		 *
		 */
		ui?: {
			content?: ClassNameValue;
			arrow?: ClassNameValue;
		};
		/**
		 * @default `outline`
		 */
		variant?: ButtonProps['variant'];
		/**
		 * @default primary
		 */
		color?: PropColor;
		/**
		 *
		 */
		class?: ClassNameValue;
	};
</script>

<script lang="ts">
	let {
		mode = 'click',
		contentprops = { side: 'bottom', sideOffset: 8, collisionPadding: 8 },
		content,
		children,
		trigger,
		arrow = true,
		portal = true,
		reference,
		dismissible = true,
		defaultopen,
		open = $bindable(false),
		modal = false,
		opendelay = 0,
		closedelay = 0,
		ui = {},
		variant = 'outline',
		color = 'primary',
		class: klass,
	}: PopoverProps = $props();

	const classes = $derived(
		tv({
			slots: {
				content:
					'bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto',
				arrow: 'fill-default',
			},
		})({}),
	);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			{#if trigger}
				{@render trigger(props)}
			{:else}
				<Button {...props} {variant} {color} ui={{ base: klass }} />
			{/if}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Overlay />
		<Popover.Content {...contentprops} class={classes.content({ class: ui.content })}>
			{#snippet child(props)}
				{#if content}
					{@render content(props)}
				{:else}
					{@render children?.()}
				{/if}
			{/snippet}

			<Popover.Arrow />
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
