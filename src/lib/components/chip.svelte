<script module lang="ts">
	import type { PropColor } from '$lib/types.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type ChipProps = {
		children: Snippet;
		text?: string;
		color?: PropColor;
		position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
		size?: number;
		ui?: {
			base?: ClassNameValue;
			chip?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		children,
		text,
		color = 'primary',
		position = 'top-right',
		size = 8,
		ui = {}
	}: ChipProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				base: 'relative inline-flex items-center justify-center shrink-0',
				chip: [
					'absolute rounded-full ring ring-white flex items-center justify-center text-white font-medium whitespace-nowrap',
					'-translate-y-1/2 translate-x-1/2 px-0.5'
				]
			},
			variants: {
				color: {
					primary: {
						chip: 'bg-primary'
					},
					secondary: {
						chip: 'bg-secondary'
					},
					success: {
						chip: 'bg-success'
					},
					info: {
						chip: 'bg-info'
					},
					warning: {
						chip: 'bg-warning'
					},
					error: {
						chip: 'bg-error'
					}
				},
				position: {
					'top-right': { chip: 'top-0 right-0' },
					'bottom-right': { chip: 'bottom-0 right-0' },
					'top-left': { chip: 'top-0 left-0' },
					'bottom-left': { chip: 'bottom-0 left-0' }
				}
			}
		})({ color, position })
	);
</script>

<div class={classes.base({ class: [ui.base] })}>
	{@render children()}

	<span
		class={classes.chip({ class: ui.chip })}
		style:height="{size}px"
		style:min-width="{size}px"
		style:font-size="{size}px"
	>
		{text}
	</span>
</div>
