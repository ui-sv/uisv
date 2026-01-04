<script lang="ts">
	import { Alert, type AlertProps, COLORS } from '$lib/index.js';
	import { pascalCase } from 'scule';

	const BUTTON_VARIANTS = ['solid', 'outline', 'soft', 'subtle'];

	let button_label = $state('Alert');
	let button_variant = $state<AlertProps['variant']>('subtle');
	let button_position = $state<AlertProps['position']>('bottom');
	let button_icon = $state('i-lucide-terminal');
</script>

<div class="space-y-4 p-4">
	<h1>title</h1>

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

	<h1>Close</h1>

	{@render alerts({
		icon: button_icon,
		variant: button_variant,
		close: true
	})}

	<h1>Custom close icon</h1>

	{@render alerts({
		icon: button_icon,
		variant: button_variant,
		close: {
			icon: 'i-lucide-rocket'
		}
	})}

	<h1>Actions</h1>

	<select bind:value={button_position}>
		{#each ['bottom', 'right'] as pos (pos)}
			<option value={pos}>{pos}</option>
		{/each}
	</select>

	{@render alerts({
		icon: button_icon,
		variant: button_variant,
		position: button_position,
		actions: [{ label: 'Accept' }, { label: 'Cancel', color: 'surface', variant: 'subtle' }]
	})}
</div>

{#snippet alerts(props: AlertProps, notext?: boolean)}
	{#each COLORS as color (color)}
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
