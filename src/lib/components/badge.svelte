<script lang="ts" module>
	import type { Component, Snippet } from 'svelte';

	export type BadgeProps = {
		label?: string;
		color?: ButtonColor;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		icon?: string | Snippet | Component;
		trailingicon?: boolean;
		children?: Snippet;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
		};
	};
</script>

<script lang="ts">
	import type { ButtonColor } from './button.svelte';
	import { tv } from 'tailwind-variants';
	import type { ClassValue } from 'svelte/elements';
	import { isSnippet } from '$lib/utils/common.js';

	let {
		icon,
		label,
		trailingicon,
		color = 'primary',
		size = 'md',
		variant = 'solid',
		ui = {},
		children
	}: BadgeProps = $props();

	const classes = $derived.by(() => {
		return tv({
			slots: { icon: '', base: 'flex-inline items-center' },
			variants: {
				color: {
					primary: '',
					secondary: '',
					error: '',
					success: '',
					info: '',
					warning: ''
				},
				variant: {
					link: '',
					solid: 'text-white',
					outline: 'border',
					soft: '',
					subtle: 'border',
					ghost: ''
				},
				size: {
					xs: {
						base: 'font-medium text-[0.5rem] px-1 h-4 rounded gap-1',
						icon: 'size-3'
					},
					sm: { base: 'font-medium text-xs px-1 h-5 rounded gap-1', icon: 'size-3' },
					md: { base: 'font-medium text-sm rounded-md px-2 h-6 gap-2', icon: 'size-4' },
					lg: { base: 'font-medium text-sm px-2 h-7 rounded-md gap-2', icon: 'size-5' },
					xl: { base: 'font-medium px-3 h-8 rounded-md gap-2', icon: 'size-5' }
				}
			},
			compoundVariants: [
				{
					color: 'primary',
					variant: 'solid',
					class: 'bg-primary-500'
				},
				{
					color: 'secondary',
					variant: 'solid',
					class: 'bg-secondary-900'
				},
				{
					color: 'info',
					variant: 'solid',
					class: 'bg-blue-500'
				},
				{
					color: 'success',
					variant: 'solid',
					class: 'bg-green-500'
				},
				{
					color: 'error',
					variant: 'solid',
					class: 'bg-red-500'
				},
				{
					color: 'warning',
					variant: 'solid',
					class: 'bg-yellow-500'
				},

				{
					color: 'primary',
					variant: 'outline',
					class: 'border-primary-500 text-primary-500'
				},
				{
					color: 'secondary',
					variant: 'outline',
					class: 'border-secondary-900 text-secondary-500'
				},
				{
					color: 'info',
					variant: 'outline',
					class: 'border-blue-500 text-blue-500'
				},
				{
					color: 'success',
					variant: 'outline',
					class: 'border-green-500 text-green-500'
				},
				{
					color: 'error',
					variant: 'outline',
					class: 'border-red-500 text-red-500'
				},
				{
					color: 'warning',
					variant: 'outline',
					class: 'border-yellow-500 text-yellow-500'
				},

				{
					color: 'primary',
					variant: 'soft',
					class: ' bg-primary-50 text-primary-500'
				},
				{
					color: 'secondary',
					variant: 'soft',
					class: 'bg-secondary-100 text-secondary-800'
				},
				{
					color: 'info',
					variant: 'soft',
					class: 'bg-blue-100 text-blue-500'
				},
				{
					color: 'success',
					variant: 'soft',
					class: 'bg-green-100 text-green-500'
				},
				{
					color: 'error',
					variant: 'soft',
					class: 'bg-red-100 text-red-500'
				},
				{
					color: 'warning',
					variant: 'soft',
					class: 'bg-yellow-100 text-yellow-500 '
				},

				{
					color: 'primary',
					variant: 'subtle',
					class: 'bg-primary-50 text-primary-500 border-primary-200 '
				},
				{
					color: 'secondary',
					variant: 'subtle',
					class: 'bg-secondary-50 text-secondary-800 border-secondary-300 '
				},
				{
					color: 'info',
					variant: 'subtle',
					class: 'bg-blue-50 text-blue-600 border-blue-200'
				},
				{
					color: 'success',
					variant: 'subtle',
					class: 'bg-green-100 text-green-600 border-green-300'
				},
				{
					color: 'error',
					variant: 'subtle',
					class: 'bg-red-50 text-red-600 border-red-200'
				},
				{
					color: 'warning',
					variant: 'subtle',
					class: 'bg-yellow-50 text-yellow-600 border-yellow-300'
				}
			]
		})({ variant, size, color });
	});

	$inspect(children, label);
</script>

<span class={[classes.base(), icon && !(children || label) ? 'px-0 aspect-square' : '', ui.base]}>
	{#if !trailingicon}
		{@render Icon()}
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if trailingicon}
		{@render Icon()}
	{/if}
</span>

{#snippet Icon()}
	{#if icon}
		{#if typeof icon === 'string'}
			<div class={['pi', icon, classes.icon(), ui.icon]}></div>
		{:else if isSnippet(icon)}
			{@render icon()}
		{:else}
			{@const Icon = icon}
			<Icon />
		{/if}
	{/if}
{/snippet}
