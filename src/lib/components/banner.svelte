<script module lang="ts">
	import { isSnippet, type PropColor } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import Button, { type ButtonProps } from './button.svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import { defu } from 'defu';
	import { useId } from 'bits-ui';

	export type BannerProps = {
		title: string | Snippet;
		icon?: string | Snippet | Component;
		color?: PropColor;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
		href?: string;
		target?: string;
		ui?: {
			base?: ClassNameValue;
			icon?: ClassNameValue;
			description?: ClassNameValue;
			title?: ClassNameValue;
		};
		onclose?: () => void | Promise<void>;
	};
</script>

<script lang="ts">
	let {
		title,
		close,
		icon,
		href,
		target,
		actions = [],
		color = 'primary',
		variant = 'solid',
		ui = {},
		onclose = () => {}
	}: BannerProps = $props();
	const id = useId();

	const close_props = $derived.by(() => {
		return defu(typeof close === 'boolean' ? {} : close, {
			icon: 'i-lucide-x',
			variant: 'link',
			color: variant === 'solid' ? 'surface' : color,
			ui: {
				icon: variant === 'solid' ? 'text-white' : ''
			}
		} as ButtonProps);
	});
	const classes = $derived.by(() =>
		tv({
			slots: {
				base: 'flex items-center gap-2 font-sans p-4',
				icon: 'pi size-6',
				actions: '',
				title: ''
			},
			variants: {
				color: {
					primary: '',
					surface: '',
					info: '',
					success: '',
					warning: '',
					error: ''
				},
				variant: {
					solid: {
						base: 'text-white',
						description: 'text-white/90'
					},
					outline: 'border',
					soft: '',
					subtle: 'border'
				}
			},
			compoundVariants: [
				{
					variant: 'solid',
					color: 'primary',
					class: 'bg-primary-500'
				},
				{
					variant: 'solid',
					color: 'surface',
					class: 'bg-surface-900'
				},
				{
					variant: 'solid',
					color: 'info',
					class: 'bg-info-500'
				},
				{
					variant: 'solid',
					color: 'success',
					class: 'bg-success-500'
				},
				{
					variant: 'solid',
					color: 'warning',
					class: 'bg-warning-500'
				},
				{
					variant: 'solid',
					color: 'error',
					class: 'bg-error-500'
				},

				{
					variant: 'outline',
					color: 'primary',
					class: 'border-primary-300 text-primary-500'
				},
				{
					variant: 'outline',
					color: 'surface',
					class: 'border-surface-300 text-surface-900'
				},
				{
					variant: 'outline',
					color: 'info',
					class: 'border-info-300 text-info-500'
				},
				{
					variant: 'outline',
					color: 'success',
					class: 'border-success-300 text-success-500'
				},
				{
					variant: 'outline',
					color: 'warning',
					class: 'border-warning-300 text-warning-500'
				},
				{
					variant: 'outline',
					color: 'error',
					class: 'border-error-300 text-error-500'
				},

				{
					variant: 'soft',
					color: 'primary',
					class: 'bg-primary-100 text-primary-500'
				},
				{
					variant: 'soft',
					color: 'surface',
					class: 'bg-surface-50 text-surface-900'
				},
				{
					variant: 'soft',
					color: 'info',
					class: 'bg-info-50 text-info-500'
				},
				{
					variant: 'soft',
					color: 'success',
					class: 'bg-success-50 text-success-500'
				},
				{
					variant: 'soft',
					color: 'warning',
					class: 'bg-warning-50 text-warning-500'
				},
				{
					variant: 'soft',
					color: 'error',
					class: 'bg-error-50 text-error-500'
				},

				{
					variant: 'subtle',
					color: 'primary',
					class: 'bg-primary-100 text-primary-500 border-primary-300'
				},
				{
					variant: 'subtle',
					color: 'surface',
					class: 'bg-surface-50 text-surface-900 border-surface-300'
				},
				{
					variant: 'subtle',
					color: 'info',
					class: 'bg-info-50 text-info-500 border-info-300'
				},
				{
					variant: 'subtle',
					color: 'success',
					class: 'bg-success-50 text-success-500 border-success-300'
				},
				{
					variant: 'subtle',
					color: 'warning',
					class: 'bg-warning-50 text-warning-500 border-warning-300'
				},
				{
					variant: 'subtle',
					color: 'error',
					class: 'bg-error-50 text-error-500  border-error-300'
				}
			]
		})({ color, variant })
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{target}
	class={classes.base({ class: [ui.base] })}
>
	<div class="flex flex-grow gap-2 text-sm items-center">
		{#if icon}
			<div class="size-6">
				{#if typeof icon === 'string'}
					<div class={classes.icon({ class: [icon] })}></div>
				{:else if isSnippet(icon)}
					{@render icon()}
				{:else}
					{@const Icon = icon}
					<Icon />
				{/if}
			</div>
		{/if}

		<div class={classes.title({ class: [ui.title] })}>
			{#if isSnippet(title)}
				{@render title()}
			{:else}
				{title}
			{/if}
		</div>

		{#if actions.length > 0}
			{#each actions as action (action.label)}
				<Button
					{...defu(action, {
						size: 'xs',
						color: 'surface'
					} as ButtonProps)}
				/>
			{/each}
		{/if}
	</div>

	{#if close}
		<div>
			<Button {...close_props} onclick={onclose} />
		</div>
	{/if}
</svelte:element>
