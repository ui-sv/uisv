<script lang="ts" module>
	import type { Component, Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';
	import {} from '../index.js';
	import Icon from './icon.svelte';

	export type BadgeProps = {
		label?: string;
		icon?: string | Component;
		iconposition?: 'leading' | 'trailing';
		children?: Snippet;
		leading?: Snippet;
		trailing?: Snippet;
		ui?: {
			base?: ClassValue;
			icon?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		icon,
		label,
		iconposition = 'leading',
		ui = {},
		children,
		leading,
		trailing
	}: BadgeProps = $props();
</script>

<span class={cn(ui.base)}>
	{#if leading}
		{@render leading()}
	{:else if iconposition === 'leading'}
		<Icon name={icon} class={cn(ui.icon)} />
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if trailing}
		{@render trailing()}
	{:else if iconposition === 'trailing'}
		<Icon name={icon} class={cn(ui.icon)} />
	{/if}
</span>
