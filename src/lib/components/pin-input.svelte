<script module lang="ts">
	import type { PropColor } from '$lib/index.js';
	import { onMount } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';

	export type PinInputProps = {
		value?: number[] | string[];
		color?: PropColor;
		variant?: 'outline' | 'soft' | 'subtle' | 'ghost' | 'none';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		length?: number;
		autofocus?: boolean | number;
		id?: string;
		mask?: boolean;
		name?: string;
		disabled?: boolean;
		otp?: boolean;
		placeholder?: string;
		required?: boolean;
		type?: 'text' | 'number';
		ui?: { root?: ClassNameValue; cell?: ClassNameValue };
	};
</script>

<script lang="ts">
	const KEYS_TO_IGNORE = [
		'ArrowLeft',
		'ArrowRight',
		'ArrowUp',
		'ArrowDown',
		'Home',
		'End',
		'Escape',
		'Enter',
		'Tab',
		'Shift',
		'Control',
		'Meta'
	];

	let {
		value = $bindable([]),
		color = 'primary',
		variant = 'outline',
		size = 'md',
		length = 5,
		autofocus,
		id,
		mask,
		name,
		disabled,
		otp,
		placeholder,
		required,
		type = 'text',
		ui = {}
	}: PinInputProps = $props();
	const internal_id = $props.id();
	let input_els = $state<HTMLInputElement[]>([]);

	const classes = $derived(
		tv({
			slots: { root: 'flex gap-2', cell: 'rounded text-center outline-none transition relative' },
			variants: {
				color: {
					primary: '',
					secondary: '',
					info: '',
					success: '',
					warning: '',
					error: ''
				},
				size: {
					xs: { root: '', cell: 'size-6' },
					sm: { root: '', cell: 'size-7' },
					md: { root: '', cell: 'size-8' },
					lg: { root: '', cell: 'size-9' },
					xl: { root: '', cell: 'size-10' }
				},
				variant: {
					outline: {
						cell: 'border border-secondary-300 focus:(border-2)'
					},
					soft: {
						cell: 'bg-secondary-50 hover:(bg-secondary-100) focus:(bg-secondary-100)'
					},
					subtle: { cell: 'border border-secondary-300 bg-secondary-100 focus:(border-2)' },
					ghost: { cell: 'hover:(bg-secondary-100) focus:(bg-secondary-100)' },
					none: { cell: '' }
				}
			},
			compoundVariants: [
				{
					variant: ['outline', 'subtle'],
					color: 'primary',
					class: { cell: 'focus:(border-primary-500)' }
				},
				{
					variant: ['outline', 'subtle'],
					color: 'secondary',
					class: { cell: 'focus:(border-secondary-900)' }
				},
				{
					variant: ['outline', 'subtle'],
					color: 'info',
					class: { cell: 'focus:(border-info-500)' }
				},
				{
					variant: ['outline', 'subtle'],
					color: 'success',
					class: { cell: 'focus:(border-success-500)' }
				},
				{
					variant: ['outline', 'subtle'],
					color: 'warning',
					class: { cell: 'focus:(border-warning-500)' }
				},
				{
					variant: ['outline', 'subtle'],
					color: 'error',
					class: { cell: 'focus:(border-error-500)' }
				}
			]
		})({ size, color, variant, class: ui.root })
	);

	onMount(() => {
		if (!autofocus || input_els.length === 0) return;

		input_els[0].focus();
	});
</script>

<div id={id || internal_id} class={classes.root({ class: ui.root })}>
	{#each { length }, i (i)}
		<input
			bind:this={input_els[i]}
			bind:value={
				() => (mask ? '•' : value[i]?.toString()?.slice(-1)),
				(v: string) => {
					try {
						value[i] = type === 'text' ? v.slice(-1) : parseInt(v.slice(-1));

						if (value[i] && input_els[i + 1]) input_els[i + 1].focus();
					} catch {
						return;
					}
				}
			}
			class={classes.cell({ class: ui.cell })}
			onkeydown={(e) => {
				if (KEYS_TO_IGNORE.includes(e.key)) e.preventDefault();
				if (type === 'number' && isNaN(parseInt(e.key))) e.preventDefault();
				const DIR: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 };
				if (!DIR[e.key] || !input_els[i + DIR[e.key]]) return;
				input_els[i + DIR[e.key]].focus();
			}}
			{placeholder}
		/>
	{/each}
</div>
