<script module lang="ts">
	import {
		isSnippet,
		type PropColor,
		type ButtonProps,
		Button,
		type PropVariant,
	} from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import { defu } from 'defu';

	export type BannerProps = {
		title: string | Snippet;
		icon?: string | Snippet | Component;
		color?: PropColor;
		variant?: Exclude<PropVariant, 'none' | 'ghost'>;
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
		onclose = () => {},
	}: BannerProps = $props();

	const classes = $derived.by(() =>
		tv({
			slots: {
				base: 'flex items-center gap-2 font-sans p-4',
				icon: 'pi size-6',
				actions: '',
				title: '',
			},
			variants: {
				color: {
					primary: '',
					surface: '',
					info: '',
					success: '',
					warning: '',
					error: '',
				},
				variant: {
					solid: {
						base: 'text-inverted',
						description: 'text-inverted/90',
					},
					outline: 'border',
					soft: '',
					subtle: 'border',
				},
			},
			compoundVariants: [
				{
					variant: 'solid',
					color: 'primary',
					class: 'bg-primary-500',
				},
				{
					variant: 'solid',
					color: 'surface',
					class: 'bg-surface-inverted',
				},
				{
					variant: 'solid',
					color: 'info',
					class: 'bg-info-500',
				},
				{
					variant: 'solid',
					color: 'success',
					class: 'bg-success-500',
				},
				{
					variant: 'solid',
					color: 'warning',
					class: 'bg-warning-500',
				},
				{
					variant: 'solid',
					color: 'error',
					class: 'bg-error-500',
				},

				{
					variant: 'outline',
					color: 'primary',
					class: 'border-primary/15 text-primary-500',
				},
				{
					variant: 'outline',
					color: 'surface',
					class: 'border-surface/15',
				},
				{
					variant: 'outline',
					color: 'info',
					class: 'border-info/15 text-info-500',
				},
				{
					variant: 'outline',
					color: 'success',
					class: 'border-success/15 text-success-500',
				},
				{
					variant: 'outline',
					color: 'warning',
					class: 'border-warning/15 text-warning-500',
				},
				{
					variant: 'outline',
					color: 'error',
					class: 'border-error/15 text-error-500',
				},

				{
					variant: 'soft',
					color: 'primary',
					class: 'bg-primary/10 text-primary-500',
				},
				{
					variant: 'soft',
					color: 'surface',
					class: 'bg-surface/10',
				},
				{
					variant: 'soft',
					color: 'info',
					class: 'bg-info/10 text-info-500',
				},
				{
					variant: 'soft',
					color: 'success',
					class: 'bg-success/10 text-success-500',
				},
				{
					variant: 'soft',
					color: 'warning',
					class: 'bg-warning/10 text-warning-500',
				},
				{
					variant: 'soft',
					color: 'error',
					class: 'bg-error/10 text-error-500',
				},

				{
					variant: 'subtle',
					color: 'primary',
					class: 'bg-primary/10 text-primary-500 border-primary/15',
				},
				{
					variant: 'subtle',
					color: 'surface',
					class: 'bg-surface/10 border-surface/15',
				},
				{
					variant: 'subtle',
					color: 'info',
					class: 'bg-info/10 text-info-500 border-info/15',
				},
				{
					variant: 'subtle',
					color: 'success',
					class: 'bg-success/10 text-success-500 border-success/15',
				},
				{
					variant: 'subtle',
					color: 'warning',
					class: 'bg-warning/10 text-warning-500 border-warning/15',
				},
				{
					variant: 'subtle',
					color: 'error',
					class: 'bg-error/10 text-error-500  border-error/15',
				},
			],
		})({ color, variant }),
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	{target}
	class={classes.base({ class: [ui.base] })}
>
	<div class="flex grow gap-2 text-sm items-center">
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
						color: 'surface',
					} as ButtonProps)}
				/>
			{/each}
		{/if}
	</div>

	{#if close}
		<div>
			<Button
				{...defu<ButtonProps, [ButtonProps]>(typeof close === 'boolean' ? {} : close, {
					icon: 'i-lucide-x',
					variant: 'ghost',
					color: 'surface',
					ui: {
						icon: variant === 'solid' ? 'text-inverted' : '',
					},
				})}
				onclick={onclose}
			/>
		</div>
	{/if}
</svelte:element>
