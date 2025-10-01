<script module lang="ts">
	import { Slider } from 'bits-ui';
	import type { PropColor } from '$lib/types.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type SliderProps<T> = {
		value?: T;
		default?: number | number[];
		color?: PropColor;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		disabled?: boolean;
		thumblabel?: boolean;
		orientation?: 'vertical' | 'horizontal';
		step?: number;
		min?: number;
		max?: number;
		ui?: {
			root?: ClassNameValue;
			range?: ClassNameValue;
			thumb?: ClassNameValue;
		};
	};
</script>

<script lang="ts" generics="T extends number | number[]">
	let {
		value = $bindable(),
		default: def_value = 0,
		color = 'primary',
		size = 'md',
		disabled,
		thumblabel,
		orientation = 'horizontal',
		step,
		min,
		max,
		ui = {}
	}: SliderProps<T> = $props();

	const default_value = $derived.by(() => {
		if (typeof def_value === 'number') return [def_value];

		return def_value;
	});
	let slider_value = $derived({
		get() {
			if (typeof value === 'number') return [value];

			return (value as number[]) ?? default_value;
		},
		set(v: number[]) {
			value = (v?.length !== 1 ? v : v[0]) as T;
		}
	});
	const thumbs = $derived(slider_value.get()?.length ?? 1);
	const classes = $derived.by(() =>
		tv({
			slots: {
				root: [
					'relative w-full flex rounded-full bg-neutral-300',
					orientation === 'horizontal' ? 'items-center' : 'justify-center mx-1'
				],
				range: [
					'rounded-full bg-neutral-200 p-0.5 relative transition',
					orientation === 'horizontal' ? 'h-full' : 'w-full'
				],
				thumb: 'bg-white rounded-full border-2 outline-none transition',
				tick: ''
			},
			variants: {
				color: {
					primary: {
						root: '',
						range: 'bg-primary-500',
						thumb: 'border-primary-500'
					},
					secondary: {
						range: ['bg-neutral-900'],
						thumb: 'border-neutral-900'
					},
					info: {
						range: ['bg-info-500'],
						thumb: 'border-info-500'
					},
					success: {
						range: ['bg-success-500'],
						thumb: 'border-success-500'
					},
					warning: {
						range: ['bg-warning-500'],
						thumb: 'border-warning-500'
					},
					error: {
						range: ['bg-error-500'],
						thumb: 'border-error-500'
					}
				},
				size: {
					xs: {
						root: [orientation === 'horizontal' ? 'h-1.5' : ''],
						thumb: 'size-4',
						tick: 'size-2.5'
					},
					sm: {
						root: [orientation === 'horizontal' ? 'h-1.75' : ''],
						thumb: 'size-4.5',
						tick: 'size-3'
					},
					md: {
						root: [orientation === 'horizontal' ? 'h-2' : 'w-2 h-48'],
						thumb: 'size-5',
						tick: 'size-3.5'
					},
					lg: {
						root: [orientation === 'horizontal' ? 'h-2.5' : ''],
						thumb: 'size-5.5',
						tick: 'size-4'
					},
					xl: {
						root: [orientation === 'horizontal' ? 'h-3' : 'w-3'],
						thumb: 'size-6',
						tick: 'size-4.5'
					}
				},
				orientation: {
					horizontal: {
						root: '',
						thumb: '',
						tick: ''
					},
					vertical: {
						root: '',
						thumb: '',
						tick: ''
					}
				}
			},
			compoundVariants: []
		})({ color, size, orientation })
	);
</script>

<Slider.Root
	type="multiple"
	bind:value={slider_value.get, slider_value.set}
	{min}
	{max}
	{step}
	{orientation}
	{disabled}
	class={classes.root({ class: [disabled ? 'opacity-75 cursor-not-allowed' : '', ui.root] })}
>
	<Slider.Range class={classes.range({ class: [ui.range] })} />

	{#each { length: thumbs }, index (index)}
		<Slider.Thumb {index} class={classes.thumb({ class: ['group', ui.thumb] })}>
			{#if thumblabel}
				<Slider.ThumbLabel
					{index}
					position="bottom"
					class={[
						'opacity-0 transition pointer-events-none text-sm shadow-md px-2 h-6 flex items-center rounded-md mt-1 border border-secondary-200',
						'data-[active=""]:(opacity-100) group-hover:(opacity-100)'
					]}
				>
					{slider_value.get()[index]}
				</Slider.ThumbLabel>
			{/if}
		</Slider.Thumb>
	{/each}
</Slider.Root>
