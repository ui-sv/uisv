<script module lang="ts">
	import { type ButtonProps, Button } from '../index.js';
	import { Collapsible } from 'bits-ui';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { getAppContext } from '../contexts.js';
	import type { Snippet } from 'svelte';

	export type CollapsibleProps = ButtonProps & {
		open?: boolean;
		disabled?: boolean;
		class?: ClassValue;
		ui?: {
			root?: ClassValue;
			content?: ClassValue;
			trigger?: ClassValue;
		};
		button?: Snippet<[ButtonProps]>;
	};
</script>

<script lang="ts">
	let {
		open = $bindable(false),
		children,
		ui = {},
		class: root_class,
		button,
		...rest
	}: CollapsibleProps = $props();
</script>

<Collapsible.Root bind:open class={cn(root_class, ui.root)}>
	<Collapsible.Trigger>
		{#snippet child({ props })}
			{#if button}
				{@render button({ ...props, ...rest, class: [props.class, ui.trigger] })}
			{:else}
				<Button {...props} trailingicon={getAppContext().icons.chevrondown} {...rest} />
			{/if}
		{/snippet}
	</Collapsible.Trigger>

	<Collapsible.Content class={cn(ui.content)}>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>
