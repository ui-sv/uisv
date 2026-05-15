<script module lang="ts">
	import type { PropColor } from '$lib/index.js';
	import { tv, type ClassValue } from 'tailwind-variants';

	export type ProgressProps = {
		value?: number;
		max?: number | string[];
		animation?: 'swing' | 'carousel' | 'carousel-inverse' | 'elastic';
		orientation?: 'horizontal' | 'vertical';
		color?: PropColor;
		size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		inverted?: boolean;
		status?: boolean;
		ui?: {
			base?: ClassValue;
			header?: ClassValue;
			content?: ClassValue;
			footer?: ClassValue;
			indicator?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		max,
		animation,
		inverted,
		status,
		value = 0,
		orientation = 'horizontal',
		color = 'primary',
		size = 'md',
		ui = {},
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
	const variants = $derived.by(() =>
		tv({
			slots: {
				root: 'relative w-full rounded-full overflow-hidden bg-surface-accented',
				status: '',
				indicator: 'absolute transition-all rounded-full',
				steps: '',
			},
			variants: {
				color: {
					primary: {
						indicator: 'bg-primary-500',
					},
					surface: {
						indicator: 'bg-label-muted',
					},
					info: {
						indicator: 'bg-info-500',
					},
					success: {
						indicator: 'bg-success-500',
					},
					warning: {
						indicator: 'bg-warning-500',
					},
					error: {
						indicator: 'bg-error-500',
					},
				},
				size: {
					'2xs': '',
					xs: '',
					sm: '',
					md: '',
					lg: '',
					xl: '',
					'2xl': '',
				},
				orientation: {
					vertical: { indicator: 'w-full top-0 h-(--ui-progress-percentage)' },
					horizontal: { indicator: 'h-full left-0 w-(--ui-progress-percentage)' },
				},
				animation: {
					swing: [indeterminate ? 'animate-[swing_2s_ease-in-out_infinite' : ''],
					carousel: [indeterminate ? '' : ''],
					'carousel-inverse': [indeterminate ? '' : ''],
					elastic: [indeterminate ? '' : ''],
				},
			},
			compoundVariants: [
				{ orientation: 'horizontal', size: '2xs', class: { root: 'h-px' } },
				{ orientation: 'horizontal', size: 'xs', class: { root: 'h-0.5' } },
				{ orientation: 'horizontal', size: 'sm', class: { root: 'h-1' } },
				{ orientation: 'horizontal', size: 'md', class: { root: 'h-2' } },
				{ orientation: 'horizontal', size: 'lg', class: { root: 'h-3' } },
				{ orientation: 'horizontal', size: 'xl', class: { root: 'h-4' } },
				{ orientation: 'horizontal', size: '2xl', class: { root: 'h-5' } },

				{ orientation: 'vertical', size: '2xs', class: { root: 'w-px' } },
				{ orientation: 'vertical', size: 'xs', class: { root: 'w-0.5' } },
				{ orientation: 'vertical', size: 'sm', class: { root: 'w-1' } },
				{ orientation: 'vertical', size: 'md', class: { root: 'w-2' } },
				{ orientation: 'vertical', size: 'lg', class: { root: 'w-3' } },
				{ orientation: 'vertical', size: 'xl', class: { root: 'w-4' } },
				{ orientation: 'vertical', size: '2xl', class: { root: 'w-5' } },
			],
		})({
			color,
			animation: animation ?? 'swing',
			size,
			orientation,
		}),
	);
</script>

<div data-state-indeterminate={indeterminate}>
	<div class={variants.root({ class: [ui.base] })}>
		<span
			class={variants.indicator({ class: ui.indicator })}
			style:--ui-progress-percentage={`${percentage}%`}
		>
		</span>
	</div>

	{#if Array.isArray(max)}
		<p
			class={[
				'text-right transition',
				value && value > 0 && max[value] ? 'text-primary-500' : 'text-label-muted',
			]}
		>
			{(value && max[value]) || max[0]}
		</p>
	{/if}
</div>

<style>
	:global {
		@keyframes swing {
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
	}
</style>
