<script module lang="ts">
	import {
		type PropColor,
		isSnippet,
		type ButtonProps,
		Button,
		type PropVariant,
		Icon,
	} from '$lib/index.js';
	import type { Component, Snippet } from 'svelte';
	import { tv, type ClassValue } from 'tailwind-variants';
	import { defu } from 'defu';
	import { getAppContext } from '$lib/contexts.js';

	export type AlertProps = {
		title?: string | Snippet;
		description?: string | Snippet;
		icon?: string | Snippet | Component;
		color?: PropColor;
		variant?: Exclude<PropVariant, 'none' | 'ghost'>;
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
			description?: ClassValue;
			title?: ClassValue;
		};
		onclose?: () => unknown | Promise<() => unknown>;
		orientation?: 'horizontal' | 'vertical';
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
		ui = {},
		onclose = () => {},
		orientation = 'vertical',
	}: AlertProps = $props();

	const variants = $derived.by(() =>
		tv({
			slots: {
				base: 'flex gap-2 font-sans p-4 rounded-lg',
				icon: 'pi size-6',
				actions: 'flex flex-wrap gap-1.5 shrink-0',
				description: 'opacity-90 text-sm',
				title: 'font-medium font-md',
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
						base: 'text-surface-base',
						description: 'text-surface-base/90',
					},
					outline: 'border',
					soft: '',
					subtle: 'border',
				},
				orientation: {
					horizontal: '',
					vertical: 'flex-col',
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
					class: 'border-primary-300 text-primary-500',
				},
				{
					variant: 'outline',
					color: 'surface',
					class: 'border-surface-accented text-surface-inverted',
				},
				{
					variant: 'outline',
					color: 'info',
					class: 'border-info-300 text-info-500',
				},
				{
					variant: 'outline',
					color: 'success',
					class: 'border-success-300 text-success-500',
				},
				{
					variant: 'outline',
					color: 'warning',
					class: 'border-warning-300 text-warning-500',
				},
				{
					variant: 'outline',
					color: 'error',
					class: 'border-error-300 text-error-500',
				},

				{
					variant: 'soft',
					color: 'primary',
					class: 'bg-primary-100 text-primary-500',
				},
				{
					variant: 'soft',
					color: 'surface',
					class: 'bg-surface-muted text-surface-inverted',
				},
				{
					variant: 'soft',
					color: 'info',
					class: 'bg-info-50 text-info-500',
				},
				{
					variant: 'soft',
					color: 'success',
					class: 'bg-success-50 text-success-500',
				},
				{
					variant: 'soft',
					color: 'warning',
					class: 'bg-warning-50 text-warning-500',
				},
				{
					variant: 'soft',
					color: 'error',
					class: 'bg-error-50 text-error-500',
				},

				{
					variant: 'subtle',
					color: 'primary',
					class: 'bg-primary-100 text-primary-500 border-primary-300',
				},
				{
					variant: 'subtle',
					color: 'surface',
					class: 'bg-surface-muted text-surface-inverted border-surface-accented',
				},
				{
					variant: 'subtle',
					color: 'info',
					class: 'bg-info-50 text-info-500 border-info-300',
				},
				{
					variant: 'subtle',
					color: 'success',
					class: 'bg-success-50 text-success-500 border-success-300',
				},
				{
					variant: 'subtle',
					color: 'warning',
					class: 'bg-warning-50 text-warning-500 border-warning-300',
				},
				{
					variant: 'subtle',
					color: 'error',
					class: 'bg-error-50 text-error-500  border-error-300',
				},
			],
		})({ color, variant, orientation }),
	);
</script>

<div class={variants.base({ class: [ui.base] })}>
	<div class="flex gap-2 flex-1">
		{#if isSnippet(icon)}
			{@render icon()}
		{:else}
			<Icon name={icon} class={variants.icon({ class: ui.icon })} />
		{/if}

		<div class="space-y-1 grow">
			{#if title}
				<div class={variants.title({ class: [ui.title] })}>
					{#if isSnippet(title)}
						{@render title()}
					{:else}
						{title}
					{/if}
				</div>
			{/if}

			{#if description}
				<div class={variants.description({ class: [ui.title] })}>
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
				<Button
					{...defu(typeof close === 'boolean' ? {} : close, {
						icon: getAppContext().icons.close,
						variant: 'link',
						color: 'surface',
						onclick: onclose,
					} as ButtonProps)}
				/>
			</div>
		{/if}
	</div>

	{#if actions.length}
		<div class="flex gap-2 items-center pl-8">
			{#each actions as action, idx (idx)}
				<Button
					{...defu(action, <ButtonProps>{
						size: 'xs',
					})}
				/>
			{/each}
		</div>
	{/if}
</div>
