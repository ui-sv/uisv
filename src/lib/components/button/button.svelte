<script lang="ts">
	// import { FORM_LOADING_CONTEXT_KEY } from '$lib/utils/keys.js';
	import { isSnippet, type ButtonProps, BUTTON_VARIANTS } from '$lib/index.js';

	// let form_loading = getContext<{ value: boolean } | undefined>(FORM_LOADING_CONTEXT_KEY);
	let {
		ref = $bindable(),
		size = 'md',
		variant = 'solid',
		color = 'primary',
		iconposition = 'left',
		children,
		// active,
		// activecolor,
		// activevariant,
		block,
		label,
		loadingauto,
		onclick,
		ui = {},
		disabled,
		href,
		icon,
		loading,
		loadingicon,
		target,
		type,
	}: ButtonProps = $props();

	let internal_loading = $state(false);
	const is_loading = $derived.by(() => {
		if (loading) return true;
		if (loadingauto) return internal_loading;
		return false;
	});

	const classes = $derived(
		BUTTON_VARIANTS({ variant, color, size, block, disabled: disabled || is_loading }),
	);

	const only_icon = $derived(!(children || label) && !!icon);

	async function onClickWrapper(event: MouseEvent) {
		if (!onclick) return;
		internal_loading = true;

		await onclick(event);

		internal_loading = false;
	}
</script>

{#if href}
	<a
		{href}
		{target}
		class={classes.base({
			class: [only_icon ? 'px-0 aspect-square justify-center' : '', 'cursor-pointer', ui.base],
		})}
		onclick={onClickWrapper}
	>
		{@render Content()}
	</a>
{:else}
	<button
		{type}
		disabled={disabled || is_loading}
		class={classes.base({
			class: [only_icon ? 'px-0 aspect-square justify-center' : '', ui.base],
		})}
		onclick={onClickWrapper}
	>
		{@render Content()}
	</button>
{/if}

{#snippet Content()}
	{#if iconposition === 'left'}
		{@render Icon()}
	{/if}

	{#if label}
		{label}
	{:else}
		{@render children?.()}
	{/if}

	{#if iconposition !== 'left'}
		{@render Icon()}
	{/if}
{/snippet}

{#snippet Icon()}
	{@const IconCom = is_loading ? loadingicon || '-ph-lucide-loader-circle' : icon}

	{#if IconCom}
		{#if typeof IconCom === 'string'}
			<div class={classes.icon({ class: [is_loading && 'animate-spin', IconCom, ui.icon] })}></div>
		{:else if isSnippet(IconCom)}
			{@render IconCom()}
		{:else}
			<IconCom />
		{/if}
	{/if}
{/snippet}
