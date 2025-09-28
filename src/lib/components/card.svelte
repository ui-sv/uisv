<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type ProgressProps = {
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
	let { header, children, footer, variant = 'solid', ui = {} }: ProgressProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				root: 'rounded-lg overflow-hidden',
				header: 'p-4 sm:px-6',
				body: 'p-4 sm:p-6',
				footer: 'p-4 sm:px-6'
			},
			variants: {
				variant: {
					solid: {
						root: 'bg-secondary-950 text-secondary-50'
					},
					outline: {
						root: 'bg-default ring ring-default divide-y divide-default'
					},
					soft: {
						root: 'bg-elevated/50 divide-y divide-default'
					},
					subtle: {
						root: 'bg-elevated/50 ring ring-default divide-y divide-default'
					}
				}
			},
			compoundVariants: []
		})({ variant })
	);
</script>

<div class={classes.base({ class: [ui.base] })}>
	{@render header?.()}
	{@render children?.()}

	{@render footer?.()}
</div>
