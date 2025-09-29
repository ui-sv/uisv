<script module lang="ts">
	import type { PropColor } from '$lib/types.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type ProgressProps = {
		value?: number;
		max?: number | string[];
		animation?: 'swing' | 'carousel' | 'carousel-inverse' | 'elastic';
		orientation?: 'horizontal' | 'veritcal';
		color?: PropColor;
		height?: number;
		inverted?: boolean;
		status?: boolean;
		ui?: {
			base?: ClassNameValue;
			header?: ClassNameValue;
			content?: ClassNameValue;
			footer?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		max,
		animation,
		inverted,
		status,
		value,
		orientation = 'horizontal',
		color = 'primary',
		height = '',
		ui = {}
	}: ProgressProps = $props();

	const percentage = $derived.by(() => {
		if (value === undefined) return null;
		if (Array.isArray(max)) return (value / (max.length - 1)) * 100;

		return (value / (max || 100)) * 100;
	});
	const indeterminate = $derived.by(() => {
		if (value === undefined || percentage === null) return true;
		if (value < 0) return true;
		if (percentage > 100) return true;

		return false;
	});
	const classes = $derived.by(() =>
		tv({
			slots: {
				root: 'relative w-full rounded-full overflow-hidden bg-secondary-300',
				status: '',
				indicator: 'absolute transition-all rounded-full',
				steps: ''
			},
			variants: {
				color: {
					primary: {
						indicator: 'bg-primary-500'
					},
					secondary: {
						indicator: 'bg-secondary-500'
					},
					info: {
						indicator: 'bg-info-500'
					},
					success: {
						indicator: 'bg-success-500'
					},
					warning: {
						indicator: 'bg-warning-500'
					},
					error: {
						indicator: 'bg-error-500'
					}
				},
				animation: {
					swing: [indeterminate ? 'animate-[swing_2s_ease-in-out_infinite' : ''],
					carousel: [indeterminate ? '' : ''],
					'carousel-inverse': [indeterminate ? '' : ''],
					elastic: [indeterminate ? '' : '']
				}
			},
			compoundVariants: []
		})({
			color,
			animation: animation ?? 'swing'
		})
	);
</script>

<div data-state-indeterminate={indeterminate}>
	<div class={classes.root({ class: [ui.base] })} style:height={`${height || 8}px`}>
		<span class={classes.indicator({ class: ['h-full left-0'] })} style:width={`${percentage}%`}>
		</span>
	</div>

	{#if Array.isArray(max)}
		<p
			class={[
				'text-right transition',
				value && value > 0 && max[value] ? 'text-primary-500' : 'text-secondary-500'
			]}
		>
			{(value && max[value]) || max[0]}
		</p>
	{/if}
</div>

<style>
	@keyframe swing {
		0% {
			width: 0%;
		}
		50% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
</style>
