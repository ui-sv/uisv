<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type CardProps = {
		children: Snippet;
		header?: Snippet;
		footer?: Snippet;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		ui?: {
			base?: ClassNameValue;
			header?: ClassNameValue;
			content?: ClassNameValue;
			footer?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let { header, children, footer, variant = 'solid', ui = {} }: CardProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				base: 'rounded overflow-hidden',
				header: 'p-4 sm:px-6',
				content: 'p-4 sm:p-6',
				footer: 'p-4 sm:px-6'
			},
			variants: {
				variant: {
					solid: {
						base: 'bg-secondary-900 text-secondary-50',
						header: 'border-transparent',
						footer: 'border-transparent'
					},
					outline: {
						base: 'border border-secondary-300 divide-y divide-secondary-300'
					},
					soft: {
						base: 'bg-secondary-50 divide-y divide-secondary-300'
					},
					subtle: {
						base: 'bg-secondary-50 border-secondary-300 border divide-y divide-secondary-300'
					}
				}
			},
			compoundVariants: []
		})({ variant })
	);
</script>

<div class={classes.base({ class: [ui.base] })}>
	{#if header}
		<div class={classes.header({ class: [ui.header] })}>
			{@render header()}
		</div>
	{/if}

	<div class={classes.content({ class: ui.content })}>
		{@render children()}
	</div>

	{#if footer}
		<div class={classes.header({ class: [ui.header] })}>
			{@render footer()}
		</div>
	{/if}
</div>
