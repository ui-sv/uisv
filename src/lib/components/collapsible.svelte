<script module lang="ts">
	import { type ButtonProps, Button } from '$lib/index.js';
	import { Collapsible } from 'bits-ui';
	import { defu } from 'defu';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type CollapsibleProps = ButtonProps & {
		open?: boolean;
		disabled?: boolean;
		class?: ClassNameValue;
		ui?: {
			root?: ClassNameValue;
			content?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		open = $bindable(false),
		children,
		ui = {},
		class: root_class,
		...rest
	}: CollapsibleProps = $props();

	const variants = $derived(
		tv({
			slots: {
				root: 'flex flex-col gap-2',
				content:
					'data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] space-y-2 overflow-hidden font-mono text-[15px] tracking-[0.01em] transition-all',
			},
		})(),
	);
</script>

<Collapsible.Root bind:open class={variants.root({ class: [root_class, ui.root] })}>
	<Collapsible.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				trailingicon="i-lucide-chevron-down"
				{...rest}
				block
				ui={defu(ui, { trailingicon: 'ms-auto' })}
			/>
		{/snippet}
	</Collapsible.Trigger>
	<Collapsible.Content class={variants.content({ class: ui.content })}>
		{@render children?.()}
	</Collapsible.Content>
</Collapsible.Root>

<style>
	:global {
		@keyframes collapsible-down {
			from {
				height: 0;
			}
			to {
				height: var(--bits-collapsible-content-height);
			}
		}

		@keyframes collapsible-up {
			from {
				height: var(--bits-collapsible-content-height);
			}
			to {
				height: 0;
			}
		}
	}
</style>
