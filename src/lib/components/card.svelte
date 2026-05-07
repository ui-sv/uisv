<script module lang="ts">
	import type { PropVariant } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import { tv, type ClassValue } from 'tailwind-variants';

	export type CardProps = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		variant?: Exclude<PropVariant, 'none' | 'ghost'>;
		ui?: {
			base?: ClassValue;
			header?: ClassValue;
			content?: ClassValue;
			footer?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let { header, children, footer, variant = 'solid', ui = {} }: CardProps = $props();

	const variants = $derived.by(() =>
		tv({
			slots: {
				base: 'rounded overflow-hidden',
				header: 'p-4 sm:px-6',
				content: 'p-4 sm:p-6',
				footer: 'p-4 sm:px-6',
			},
			variants: {
				variant: {
					solid: {
						base: 'bg-surface-inverted text-label-inverted',
						header: 'border-transparent',
						footer: 'border-transparent',
					},
					outline: {
						base: 'border border-surface-accented divide-y divide-surface-accented',
					},
					soft: {
						base: 'bg-surface/10 divide-y divide-surface-accented',
					},
					subtle: {
						base: 'bg-surface/10 border-surface-accented border divide-y divide-surface-accented',
					},
				},
			},
			compoundVariants: [],
		})({ variant }),
	);
</script>

<div class={variants.base({ class: [ui.base] })}>
	{#if header}
		<div class={variants.header({ class: [ui.header] })}>
			{@render header()}
		</div>
	{/if}

	<div class={variants.content({ class: ui.content })}>
		{@render children()}
	</div>

	{#if footer}
		<div class={variants.header({ class: [ui.header] })}>
			{@render footer()}
		</div>
	{/if}
</div>
