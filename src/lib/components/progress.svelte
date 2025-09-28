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
					swing: '',
					carousel: '',
					'carousel-inverse': '',
					elastic: '',
					indicator: 'left-0 w-([var(--ui-progress-width)])'
				}
			},
			compoundVariants: []
		})({
			color,
			animation: animation ?? 'swing'
		})
	);
</script>

<div data-state={value === undefined || value < 0 || percentage! > 100 ? 'interderminate' : ''}>
	<div class={classes.root({ class: [ui.base] })} style:height={`${height || 8}px`}>
		<span
			class={classes.indicator({ class: ['h-full'] })}
			style:--ui-progress-width={`${percentage}%`}
		>
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
		width: 1/3;
	}
</style>
