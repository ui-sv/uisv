<script lang="ts">
	import { Alert, type BadgeProps, type PropColor } from '$lib/index.js';
	import { pascalCase } from 'scule';
	import '@unocss/reset/tailwind.css';

	const BUTTON_COLORS: PropColor[] = [
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error'
	];

	const BUTTON_VARIANTS = ['solid', 'outline', 'soft', 'subtle'];

	let button_label = $state('Button');
	let button_variant = $state<BadgeProps['variant']>('solid');
	let button_icon = $state('i-lucide-terminal');
</script>

<div class="space-y-4 p-4">
	<h1>title</h1>
	<div>
		<input bind:value={button_label} type="text" placeholder="button's label" />
	</div>

	<Alert title={button_label} />

	<h1>color & variant</h1>

	<div>
		<select bind:value={button_variant}>
			{#each BUTTON_VARIANTS as variant (variant)}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	</div>

	{@render alerts({
		variant: button_variant
	})}

	<h1>Icon</h1>

	{@render alerts({
		icon: button_icon,
		variant: button_variant
	})}
</div>

{#snippet alerts(props: BadgeProps, notext?: boolean)}
	{#each BUTTON_COLORS as color (color)}
		<Alert
			{...props}
			{color}
			title={!notext ? `${pascalCase(color)} alert!` : undefined}
			description="You can change the primary color in the uisv plugin."
		/>
	{/each}
{/snippet}

<style>
	h1:not(:first-child) {
		padding-top: 2rem;
	}
</style>
