<script module lang="ts">
	import { isSnippet, type ButtonProps, Button, Icon } from '../index.js';
	import type { Component, Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import { defu } from 'defu';
	import { getAppContext } from '../contexts.js';

	export type AlertProps = {
		title?: string | Snippet;
		description?: string | Snippet;
		icon?: string | Snippet | Component;
		actions?: ButtonProps[];
		close?: boolean | ButtonProps;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
			description?: ClassValue;
			title?: ClassValue;
			actions?: ClassValue;
			header?: ClassValue;
			wrapper?: ClassValue;
		};
		onclose?: () => unknown | Promise<() => unknown>;
		orientation?: 'horizontal' | 'vertical';
		button?: Snippet<[ButtonProps]>;
	};
</script>

<script lang="ts">
	let {
		title,
		description,
		close,
		icon,
		actions = [],
		ui = {},
		onclose = () => {},
		orientation = 'vertical',
		button
	}: AlertProps = $props();
</script>

<div class={cn(ui.base)}>
	<div class={cn(ui.wrapper)}>
		{#if isSnippet(icon)}
			{@render icon()}
		{:else}
			<Icon name={icon} class={cn(ui.icon)} />
		{/if}

		<div class={cn(ui.header)}>
			{#if title}
				<div class={cn(ui.title)}>
					{#if isSnippet(title)}
						{@render title()}
					{:else}
						{title}
					{/if}
				</div>
			{/if}

			{#if description}
				<div class={cn(ui.description)}>
					{#if isSnippet(description)}
						{@render description()}
					{:else}
						{description}
					{/if}
				</div>
			{/if}
		</div>

		{#if orientation === 'horizontal'}
			{@render actions_snippet()}
		{/if}

		{#if close}
			{@const props = defu(typeof close === 'boolean' ? {} : close, <ButtonProps>{
				icon: getAppContext().icons.close,
				onclick: onclose
			})}

			<div>
				{#if button}
					{@render button(props)}
				{:else}
					<Button {...props} />
				{/if}
			</div>
		{/if}
	</div>

	{#if orientation === 'vertical'}
		{@render actions_snippet()}
	{/if}
</div>

{#snippet actions_snippet()}
	{#if actions.length}
		<div class={cn(ui.actions)}>
			{#each actions as action, idx (idx)}
				{#if button}
					{@render button(action)}
				{:else}
					<Button {...action} />
				{/if}
			{/each}
		</div>
	{/if}
{/snippet}
