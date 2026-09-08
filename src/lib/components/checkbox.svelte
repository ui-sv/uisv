<script module lang="ts">
	import { getAppContext } from '../contexts.js';
	import { Icon } from '../index.js';
	import type { Snippet, Component } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	export type CheckboxProps = {
		value?: boolean | 'intermediate';
		disabled?: boolean;
		icon?: string | Component;
		intermediateicon?: string | Component;
		label?: string | Snippet;
		description?: string | Snippet;
		as?: string;
		ui?: {
			root?: ClassValue;
			container?: ClassValue;
			icon?: ClassValue;
			wrapper?: ClassValue;
			label?: ClassValue;
			description?: ClassValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(false),
		disabled,
		icon = getAppContext().icons.check,
		intermediateicon = getAppContext().icons.minus,
		label,
		description,
		as = 'div',
		ui = {}
	}: CheckboxProps = $props();
	const id = $props.id();
</script>

<svelte:element this={as} data-state={value ? 'checked' : 'unchecked'} class={cn(ui.root)}>
	<button
		{id}
		aria-label="checkbox"
		class={cn(ui.container)}
		onclick={() => {
			if (disabled) return;
			if (value === 'intermediate') return (value = true);
			value = !value;
		}}
	>
		<Icon name={value === 'intermediate' ? intermediateicon : value === true ? icon : undefined} />
	</button>

	{#if label}
		<div class={cn(ui.wrapper)}>
			<label for={id} class={cn(ui.label)}>
				{#if typeof label === 'string'}
					{label}
				{:else}
					{@render label()}
				{/if}
			</label>

			{#if description}
				<div class={cn(ui.description)}>
					{#if typeof description === 'string'}
						{description}
					{:else}
						{@render description()}
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</svelte:element>
