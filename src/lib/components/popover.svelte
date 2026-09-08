<script module lang="ts">
	import type { Snippet } from 'svelte';
	import { Popover, type PopoverArrowProps, type PopoverContentProps } from 'bits-ui';
	import { tv, type ClassValue } from 'tailwind-variants';
	import { type ButtonBaseProps, Button } from '../index.js';

	export type PopoverContentSnippet = {
		props: Record<string, unknown>;
		open: boolean;
		wrapperProps: Record<string, unknown>;
	};

	export type PopoverProps = ButtonBaseProps & {
		/**
		 * The display mode of the popover.
		 */
		mode?: 'hover' | 'click';
		/**
		 * The props for the content of popover.
		 */
		contentprops?: PopoverContentProps;
		children?: Snippet<[]>;
		/**
		 * Display an arrow alongside the popover.
		 */
		arrow?: boolean | PopoverArrowProps;
		/**
		 * Render the popover in a portal.
		 */
		// portal?: string | false | true | HTMLElement;
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
			content?: ClassValue;
			arrow?: ClassValue;
			trigger?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		mode = 'click',
		contentprops = { side: 'bottom', sideOffset: 8, collisionPadding: 8 },
		children,
		arrow = false,
		dismissible = true,
		open = $bindable(false),
		opendelay = 0,
		closedelay = 0,
		ui = {},
		...rest
	}: PopoverProps = $props();

	const variants = $derived(
		tv({
			slots: {
				content: [
					'bg-surface-base z-30 w-full shadow-lg rounded-md border border-surface-accented p-4',
					'origin-(--bits-popover-content-transform-origin)',
					'',
				],
				arrow: 'text-surface-accented',
			},
		})({}),
	);
</script>

<Popover.Root bind:open>
	<Popover.Trigger openOnHover={mode === 'hover'} openDelay={opendelay} closeDelay={closedelay}>
		{#snippet child({ props })}
			<Button {...rest} {...props} ui={{ base: ui.trigger }} />
		{/snippet}
	</Popover.Trigger>

	<Popover.Portal>
		<Popover.Content
			{...contentprops}
			class={variants.content({ class: ui.content })}
			interactOutsideBehavior={dismissible ? 'close' : 'ignore'}
		>
			{@render children?.()}

			{#if arrow}
				<Popover.Arrow
					{...typeof arrow === 'object' ? arrow : {}}
					class={variants.arrow({ class: ui.arrow })}
				/>
			{/if}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
