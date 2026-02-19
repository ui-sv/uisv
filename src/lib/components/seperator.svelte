<script module lang="ts">
	import type { PropColor } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { ClassNameValue } from 'tailwind-merge';
	import { tv } from 'tailwind-variants';
	import type { Component } from 'vitest-browser-svelte';

	export type SeperatorProps = {
		label?: string | Snippet<[ClassNameValue]> | Component;
		icon?: string | Snippet<[ClassNameValue]> | Component;
		color?: PropColor;
		type?: 'dashed' | 'solid' | 'dotted';
		children?: Snippet;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		orientation?: 'horizontal' | 'vertical';
		ui?: {
			root?: ClassNameValue;
			border?: ClassNameValue;
			icon?: ClassNameValue;
			label?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	import { isComponent, isSnippet } from '$lib/utilities.svelte.js';

	let {
		label,
		icon,
		children,
		color = 'primary',
		type = 'solid',
		size = 'xs',
		orientation = 'horizontal',
		ui = {},
	}: SeperatorProps = $props();

	const variants = $derived(
		tv({
			slots: {
				root: 'flex items-center justify-center text-center',
				border: '',
				icon: 'shrink-0 size-5',
				label: 'text-sm',
			},
			variants: {
				type: {
					solid: {
						border: 'border-solid',
					},
					dashed: {
						border: 'border-dashed',
					},
					dotted: {
						border: 'border-dotted',
					},
				},
				size: {
					xs: {
						root: 'gap-3',
					},
					sm: {
						root: 'gap-3',
					},
					md: {
						root: 'gap-4',
					},
					lg: {
						root: 'gap-5',
					},
					xl: {
						root: 'gap-5',
					},
				},
				color: {
					primary: {
						border: 'border-primary',
						label: 'text-primary',
						icon: 'text-primary',
					},
					surface: {
						border: 'border-surface',
						label: 'text-surface',
						icon: 'text-surface',
					},
					info: {
						border: 'border-info',
						label: 'text-info',
						icon: 'text-info',
					},
					success: {
						border: 'border-success',
						label: 'text-success',
						icon: 'text-success',
					},
					warning: {
						border: 'border-warning',
						label: 'text-warning',
						icon: 'text-warning',
					},
					error: {
						border: 'border-error',
						label: 'text-error',
						icon: 'text-error',
					},
				},
				orientation: {
					horizontal: {
						root: 'w-full flex-row',
						border: 'w-full',
					},
					vertical: {
						root: 'h-full flex-col',
						border: 'h-full',
					},
				},
			},
			compoundVariants: [
				{
					orientation: 'horizontal',
					size: 'xs',
					class: {
						border: 'border-t',
					},
				},
				{
					orientation: 'horizontal',
					size: 'sm',
					class: {
						border: 'border-t-2',
					},
				},
				{
					orientation: 'horizontal',
					size: 'md',
					class: {
						border: 'border-t-3',
					},
				},
				{
					orientation: 'horizontal',
					size: 'lg',
					class: {
						border: 'border-t-4',
					},
				},
				{
					orientation: 'horizontal',
					size: 'xl',
					class: {
						border: 'border-t-5',
					},
				},
				{
					orientation: 'vertical',
					size: 'xs',
					class: {
						border: 'border-s',
					},
				},
				{
					orientation: 'vertical',
					size: 'sm',
					class: {
						border: 'border-s-2',
					},
				},
				{
					orientation: 'vertical',
					size: 'md',
					class: {
						border: 'border-s-3',
					},
				},
				{
					orientation: 'vertical',
					size: 'lg',
					class: {
						border: 'border-s-4',
					},
				},
				{
					orientation: 'vertical',
					size: 'xl',
					class: {
						border: 'border-s-5',
					},
				},
			],
		})({ size, type, color, orientation }),
	);
</script>

<div class={variants.root({ class: ui.root })}>
	<span class={variants.border({ class: ui.border })}></span>

	{#if icon || label || children}
		{#if typeof icon === 'string' && icon.length > 0}
			<div class={variants.icon({ class: [icon, ui.icon] })}></div>
		{:else if isSnippet(icon)}
			{@render icon()}
		{:else if isComponent(icon)}
			{@const IconCom = icon}
			<IconCom class={variants.icon({ class: ui.icon })} />
		{:else if typeof label === 'string' && label.length > 0}
			<span class={variants.label({ class: ui.label })}>{label}</span>
		{:else if isSnippet(label)}
			{@render label()}
		{:else if isComponent(label)}
			{@const Label = label}
			<Label class={variants.label({ class: ui.label })} />
		{:else}
			{@render children?.()}
		{/if}

		<span class={variants.border({ class: ui.border })}></span>
	{/if}
</div>
