<script lang="ts" module>
	import type { Component, Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { type PropColor, type PropVariant, isSnippet } from '$lib/index.js';
	import type { ClassNameValue } from 'tailwind-merge';

	export type BadgeProps = {
		label?: string;
		color?: PropColor;
		variant?: Exclude<PropVariant, 'none' | 'ghost'>;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		icon?: string | Snippet | Component;
		trailingicon?: boolean;
		children?: Snippet;
		ui?: {
			base?: ClassNameValue;
			icon?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		icon,
		label,
		trailingicon,
		color = 'primary',
		size = 'md',
		variant = 'solid',
		ui = {},
		children,
	}: BadgeProps = $props();

	const classes = $derived.by(() => {
		return tv({
			slots: { icon: '', base: 'flex-inline items-center font-sans' },
			variants: {
				color: {
					primary: '',
					surface: '',
					error: '',
					success: '',
					info: '',
					warning: '',
				},
				variant: {
					link: '',
					solid: 'text-white',
					outline: 'border',
					soft: '',
					subtle: 'border',
					ghost: '',
				},
				size: {
					xs: {
						base: 'font-medium text-[0.5rem] px-1 h-4 rounded gap-1',
						icon: 'size-3',
					},
					sm: { base: 'font-medium text-[0.625rem] px-1 h-5 rounded gap-1', icon: 'size-3' },
					md: { base: 'font-medium text-xs rounded-md px-2 h-6 gap-2', icon: 'size-4' },
					lg: { base: 'font-medium text-sm px-2 h-7 rounded-md gap-2', icon: 'size-5' },
					xl: { base: 'font-medium px-3 h-8 rounded-md gap-2', icon: 'size-5' },
				},
			},
			compoundVariants: [
				{
					color: 'primary',
					variant: 'solid',
					class: 'bg-primary-400',
				},
				{
					color: 'surface',
					variant: 'solid',
					class: 'bg-surface-inverted text-inverted',
				},
				{
					color: 'info',
					variant: 'solid',
					class: 'bg-info-500',
				},
				{
					color: 'success',
					variant: 'solid',
					class: 'bg-success-500',
				},
				{
					color: 'error',
					variant: 'solid',
					class: 'bg-error-500',
				},
				{
					color: 'warning',
					variant: 'solid',
					class: 'bg-warning-500',
				},

				{
					color: 'primary',
					variant: 'outline',
					class: 'border-primary/50 text-primary',
				},
				{
					color: 'surface',
					variant: 'outline',
					class: 'border-surface-accented text-highlighted',
				},
				{
					color: 'info',
					variant: 'outline',
					class: 'border-info/50 text-info',
				},
				{
					color: 'success',
					variant: 'outline',
					class: 'border-green/50 text-success',
				},
				{
					color: 'error',
					variant: 'outline',
					class: 'border-error/50 text-error',
				},
				{
					color: 'warning',
					variant: 'outline',
					class: 'border-warning/50 text-warning',
				},

				{
					color: 'primary',
					variant: 'soft',
					class: ' bg-primary/10 text-primary-500',
				},
				{
					color: 'surface',
					variant: 'soft',
					class: 'bg-surface/10 text-highlighted',
				},
				{
					color: 'info',
					variant: 'soft',
					class: 'bg-info/10 text-info-500',
				},
				{
					color: 'success',
					variant: 'soft',
					class: 'bg-success/10 text-success-500',
				},
				{
					color: 'error',
					variant: 'soft',
					class: 'bg-error/10 text-error-500',
				},
				{
					color: 'warning',
					variant: 'soft',
					class: 'bg-warning/10 text-warning-500 ',
				},

				{
					color: 'primary',
					variant: 'subtle',
					class: 'bg-primary/10 text-primary-500 border-primary/20',
				},
				{
					color: 'surface',
					variant: 'subtle',
					class: 'bg-surface/10 text-highlighted border-surface/20 ',
				},
				{
					color: 'info',
					variant: 'subtle',
					class: 'bg-info/10 text-info-600 border-info/20',
				},
				{
					color: 'success',
					variant: 'subtle',
					class: 'bg-success/10 text-success-600 border-success/20',
				},
				{
					color: 'error',
					variant: 'subtle',
					class: 'bg-error/10 text-error-600 border-error/20',
				},
				{
					color: 'warning',
					variant: 'subtle',
					class: 'bg-warning/10 text-warning-600 border-warning/20',
				},
			],
		})({ variant, size, color });
	});
</script>

<span
	class={classes.base({
		class: [icon && !(children || label) ? 'px-0 aspect-square justify-center' : '', ui.base],
	})}
>
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
