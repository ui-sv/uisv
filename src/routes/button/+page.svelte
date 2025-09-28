<script lang="ts">
	import { Button, type PropColor, type ButtonProps, type ButtonVariant } from '$lib/index.js';
	import { pascalCase } from 'scule';
	import '@unocss/reset/tailwind.css';
	import './main.css';

	const BUTTON_COLORS: PropColor[] = [
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error'
	];

	const BUTTON_VARIANTS = ['link', 'solid', 'outline', 'soft', 'subtle', 'ghost'];

	let button_label = $state('Button');
	let button_variant = $state<ButtonVariant>('solid');
	let button_size = $state<ButtonProps['size']>('md');
	let button_icon = $state('i-solar:rocket-2-linear');
	let loading = $state(false);
	let trailing_icon = $state(false);
</script>

<div class="space-y-4 p-4">
	<h1>base</h1>
	<div>
		<Button>Button</Button>
	</div>
	<h1>label</h1>
	<div>
		<div>
			<input bind:value={button_label} type="text" placeholder="button's label" />
		</div>

		<Button label={button_label} />
	</div>

	<h1>color & variant</h1>

	<div>
		<div>
			<select bind:value={button_variant}>
				{#each BUTTON_VARIANTS as variant (variant)}
					<option value={variant}>{variant}</option>
				{/each}
			</select>
		</div>

		{@render buttons({
			variant: button_variant
		})}
	</div>

	<h1>Size</h1>

	<div>
		<div>
			<select bind:value={button_size}>
				{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
					<option value={size}>{size}</option>
				{/each}
			</select>
		</div>

		{@render buttons({
			size: button_size,
			variant: button_variant
		})}
	</div>

	<h1>Icon</h1>

	{@render buttons({
		icon: button_icon,
		size: button_size,
		variant: button_variant,
		trailingicon: true
	})}

	{@render buttons({
		icon: button_icon,
		size: button_size,
		variant: button_variant,
		trailingicon: true
	})}

	<h1>Icon only</h1>

	{@render buttons({ icon: button_icon, size: button_size, variant: button_variant }, true)}

	<h1>Loading</h1>

	<select bind:value={loading}>
		<option value={true}>true</option>
		<option value={false}>false</option>
	</select>

	<select bind:value={trailing_icon}>
		<option value={false}>left side icon</option>
		<option value={true}>right side icon</option>
	</select>

	{@render buttons({
		icon: button_icon,
		size: button_size,
		variant: button_variant,
		loading: loading,
		trailingicon: trailing_icon
	})}

	{@render buttons({
		icon: button_icon,
		size: button_size,
		variant: button_variant,
		trailingicon: trailing_icon,
		loadingauto: true,
		onclick() {
			return new Promise<void>((res) => setTimeout(res, 1000));
		}
	})}
</div>

{#snippet buttons(props: ButtonProps, notext?: boolean)}
	<div class="flex gap-1">
		{#each BUTTON_COLORS as color (color)}
			<Button {...props} {color}>
				{#if !notext}
					{pascalCase(color)}
				{/if}
			</Button>
		{/each}
	</div>
{/snippet}

<style>
	h1:not(:first-child) {
		padding-top: 2rem;
	}
</style>
