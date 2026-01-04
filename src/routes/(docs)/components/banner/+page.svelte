<script lang="ts">
	import { Banner, type BannerProps, COLORS } from '$lib/index.js';

	const BUTTON_VARIANTS = ['solid', 'outline', 'soft', 'subtle'];

	let button_variant = $state<BannerProps['variant']>('subtle');
	let button_icon = $state('i-lucide-terminal');
</script>

<div class="space-y-4 p-4">
	<h1>title</h1>

	<Banner title="Banner" />

	<h1>color & variant</h1>

	<div>
		<select bind:value={button_variant}>
			{#each BUTTON_VARIANTS as variant (variant)}
				<option value={variant}>{variant}</option>
			{/each}
		</select>
	</div>

	{@render components({
		variant: button_variant
	})}

	<h1>Icon</h1>

	{@render components({
		icon: button_icon,
		variant: button_variant
	})}

	<h1>Close</h1>

	{@render components({
		icon: button_icon,
		variant: button_variant,
		close: true
	})}

	<h1>Custom close icon</h1>

	{@render components({
		icon: button_icon,
		variant: button_variant,
		close: {
			icon: 'i-lucide-rocket'
		}
	})}

	<h1>Actions</h1>

	{@render components({
		icon: button_icon,
		variant: button_variant,
		actions: [{ label: 'Accept' }, { label: 'Cancel', color: 'surface', variant: 'subtle' }]
	})}

	<h1>Href</h1>

	{@render components({
		icon: button_icon,
		variant: button_variant,
		href: 'https://github.com/ui-sv/uisv',
		target: '_blank'
	})}
</div>

{#snippet components(props: Omit<BannerProps, 'title'>, text?: string)}
	{#each COLORS as color (color)}
		<Banner
			{...props}
			{color}
			title={text ? text : `This ${color} banner has an important message!`}
		/>
	{/each}
{/snippet}

<style>
	h1:not(:first-child) {
		padding-top: 2rem;
	}
</style>
