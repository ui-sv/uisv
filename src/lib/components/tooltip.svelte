<script module lang="ts">
	import type { TooltipContentProps, TooltipArrowProps, PortalProps } from 'bits-ui';
	import { Tooltip } from 'bits-ui';
	import { type KbdProps, type ButtonProps, isSnippet, Button, Kbd } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { tv, type ClassValue } from 'tailwind-variants';

	export type TooltipProps = {
		children?: Snippet;
		open?: boolean;
		kbds?: KbdProps['value'][] | KbdProps[];
		trigger?: ButtonProps | Snippet<[Record<string, unknown>]>;
		disabled?: boolean;
		portal?: PortalProps;
		content?: TooltipContentProps;
		ui?: {
			content?: ClassValue;
			wrapper?: ClassValue;
			kbds?: ClassValue;
			arrow?: ClassValue;
		};
		arrow?: boolean | TooltipArrowProps;
	};
</script>

<script lang="ts">
	let {
		children,
		open = $bindable(false),
		kbds,
		trigger,
		disabled,
		portal,
		content,
		ui = {},
		arrow,
		...rest
	}: TooltipProps = $props();

	const variants = $derived(
		tv({
			slots: {
				content: '',
				wrapper: '',
				kbds: '',
				kbdsize: '',
				arrow: '',
			},
		})(),
	);
</script>

<Tooltip.Root bind:open disabled={!(children || kbds?.length) || disabled}>
	{#if !!trigger}
		<Tooltip.Trigger {...rest}>
			{#snippet child({ props })}
				{#if isSnippet(trigger)}
					{@render trigger(props)}
				{:else}
					<Button {...props} {...trigger} />
				{/if}
			{/snippet}
		</Tooltip.Trigger>
	{/if}

	<Tooltip.Portal {...portal}>
		<Tooltip.Content {...content} forceMount>
			{#snippet child({ props, wrapperProps })}
				<div {...wrapperProps} class={variants.wrapper({ class: [ui.wrapper] })}>
					<div {...props} class={variants.content({ class: [ui.content] })} transition:fly>
						{@render children?.()}

						{#if kbds?.length}
							<span class={variants.kbds({ class: ui.kbds })}>
								{#each kbds as kbd, idx (idx)}
									<Kbd {...typeof kbd === 'string' ? { value: kbd } : kbd} />
								{/each}
							</span>
						{/if}
					</div>
				</div>
			{/snippet}
			children

			{#if arrow}
				<Tooltip.Arrow
					{...typeof arrow === 'boolean' ? {} : arrow}
					class={variants.arrow({ class: ui.arrow })}
				/>
			{/if}
		</Tooltip.Content>
	</Tooltip.Portal>
</Tooltip.Root>
