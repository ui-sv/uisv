<script lang="ts">
	import { isComponent, isSnippet } from '$lib/utilities.svelte.js';
	import { type InputProps, INPUT_VARIANTS } from './index.js';
	import { maska } from 'maska/svelte';

	let {
		type,
		value = $bindable(),
		color = 'primary',
		variant = 'outline',
		size = 'md',
		icon,
		iconposition,
		disabled,
		highlight,
		leading,
		loading,
		loadingicon = 'i-lucide-loader-circle',
		required,
		trailing,
		mask,
		ui = {},
		...rest
	}: InputProps = $props();
	const id = $props.id();

	const variants = $derived(
		INPUT_VARIANTS({
			size,
			color,
			variant,
			highlight,
			loading,
			leading: !!leading || (!!icon && iconposition === 'leading') || loading,
			trailing: !!trailing || (!!icon && iconposition === 'trailing'),
			type: type === 'file' ? 'file' : undefined,
		}),
	);
</script>

<div class={variants.root({ class: ui.root })}>
	{#if leading || (icon && iconposition === 'leading') || loading}
		{@const TrailingIcon = loading ? loadingicon : icon}

		<span class={variants.leading({ class: ui.leading })}>
			{#if !!leading && !loading}
				{#if typeof leading === 'string'}
					{leading}
				{:else if isSnippet(leading)}
					{@render leading()}
				{:else if isComponent(leading)}
					{@const Leading = leading}
					<Leading />
				{/if}
			{:else if typeof TrailingIcon === 'string'}
				<div
					class={variants.icon({
						class: [loading && 'animate-spin', TrailingIcon, ui.icon],
					})}
				></div>
			{:else if isSnippet(TrailingIcon)}
				{@render TrailingIcon()}
			{:else if isComponent(TrailingIcon)}
				<TrailingIcon class={variants.icon({ class: [ui.icon] })} />
			{/if}
		</span>
	{/if}

	<input
		{id}
		{type}
		{...rest}
		class={variants.base({ class: [ui.base] })}
		{...rest}
		use:maska={mask}
	/>

	{#if trailing || (icon && iconposition === 'trailing')}
		<span class={variants.trailing({ class: ui.trailing })}>
			{#if !!trailing}
				{#if typeof trailing === 'string'}
					{trailing}
				{:else if isSnippet(trailing)}
					{@render trailing()}
				{:else if isComponent(trailing)}
					{@const Trailing = trailing}
					<Trailing />
				{/if}
			{:else if typeof icon === 'string'}
				<div
					class={variants.icon({
						class: [icon, ui.icon],
					})}
				></div>
			{:else if isSnippet(icon)}
				{@render icon()}
			{:else if isComponent(icon)}
				{@const Icon = icon}
				<Icon class={variants.icon({ class: [ui.icon] })} />
			{/if}
		</span>
	{/if}
</div>
