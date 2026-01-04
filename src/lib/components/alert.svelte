<script module lang="ts">
	import { type PropColor, isSnippet } from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import Button, { type ButtonProps } from './button.svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import { defu } from 'defu';

	export type AlertProps = {
		title?: string | Snippet;
		description?: string | Snippet;
		icon?: string | Snippet | Component;
		color?: PropColor;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		position?: 'bottom' | 'right';
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
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
		description,
		close,
		icon,
		actions = [],
		color = 'primary',
		variant = 'solid',
		position = 'bottom',
		ui = {},
		onclose = () => {}
	}: AlertProps = $props();

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
				base: 'flex gap-2 font-sans p-4 rounded-lg',
				icon: 'pi size-6',
				actions: '',
				description: 'text-opacity-50 text-sm',
				title: 'font-medium'
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
				},
				position: {
					right: {
						base: ''
					},
					bottom: {
						base: 'flex-col'
					}
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
		})({ color, variant, position })
	);
</script>

<div class={classes.base({ class: [position === 'bottom' ? '' : 'flex', ui.base] })}>
	<div class="flex gap-2 flex-grow">
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

		<div class="space-y-1 flex-grow">
			{#if title}
				<div class={classes.title({ class: [ui.title] })}>
					{#if isSnippet(title)}
						{@render title()}
					{:else}
						{title}
					{/if}
				</div>
			{/if}

			{#if description}
				<div class={classes.description({ class: [ui.title] })}>
					{#if isSnippet(description)}
						{@render description()}
					{:else}
						{description}
					{/if}
				</div>
			{/if}
		</div>

		{#if close}
			<div>
				<Button {...close_props} onclick={onclose} />
			</div>
		{/if}
	</div>

	{#if actions.length > 0}
		<div class="flex gap-2 items-center pl-8">
			{#each actions as action (action.label)}
				<Button
					{...defu(action, {
						size: 'xs'
					} as ButtonProps)}
				/>
			{/each}
		</div>
	{/if}
</div>
