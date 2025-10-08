<script lang="ts">
	import { Switch, type SwitchProps, type PropColor, Button } from '$lib/index.js';

	let value = $state(false);
</script>

<div class="space-y-4 p-4">
	<Button href="/slider">slider</Button>

	<h1>Basic</h1>
	{@render components({})}

	<h1>sizes</h1>
	{@render components({
		size: 'xs'
	})}
	{@render components({
		size: 'sm'
	})}
	{@render components({})}
	{@render components({
		size: 'lg'
	})}
	{@render components({
		size: 'xl'
	})}

	<h1>Icon</h1>
	{@render components({
		uncheckedicon: 'i-lucide-x',
		checkedicon: 'i-lucide-check'
	})}

	<h1>Loading</h1>
	{@render components({ loading: true })}

	<p>Custom icon</p>
	{@render components({ loading: true, loadingicon: 'i-lucide-loader' })}

	<h1>Label</h1>
	<Switch bind:value label="Switch to Svelte" />

	<p>with description</p>
	<Switch bind:value label="Switch to Svelte" description="web development for the rest of us" />

	<p>and required</p>
	<Switch
		bind:value
		label="Switch to Svelte"
		description="web development for the rest of us"
		required
	/>
</div>

{#snippet components(props: SwitchProps)}
	<div class="flex gap-2">
		{#each ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as color (color)}
			<Switch bind:value {...props} color={color as PropColor} />
		{/each}
	</div>
{/snippet}
