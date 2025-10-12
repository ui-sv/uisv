<script lang="ts">
	import { PinInput, type PinInputProps, type PropColor } from '$lib/index.js';

	const VARIANTS: PinInputProps['variant'][] = ['outline', 'soft', 'subtle', 'ghost', 'none'];
	const SIZES: PinInputProps['size'][] = ['xs', 'sm', 'md', 'lg', 'xl'];

	const BUTTON_COLORS: PropColor[] = [
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error'
	];

	let value = $state([]);
	let variant = $state<PinInputProps['variant']>('outline');
	let size = $state<PinInputProps['size']>('md');
</script>

<div class="space-y-4 p-4">
	<select bind:value={variant} name="variants" id="variants">
		{#each VARIANTS as v (v)}
			<option value={v}>{v}</option>
		{/each}
	</select>

	<select bind:value={size} name="sizes" id="sizes">
		{#each SIZES as s (s)}
			<option value={s}>{s}</option>
		{/each}
	</select>

	{@render components()}

	<h1>number</h1>

	{@render components({
		type: 'number'
	})}

	<h1>placeholder</h1>

	{@render components({
		type: 'number',
		placeholder: '○'
	})}

	<h1>mask</h1>

	{@render components({
		type: 'number',
		mask: true
	})}
</div>

{#snippet components(props?: PinInputProps, noval?: boolean)}
	{#each BUTTON_COLORS as color (color)}
		{#if noval}
			<PinInput {...props} {variant} {size} {color} />
		{:else}
			<PinInput {...props} bind:value {variant} {size} {color} />
		{/if}
	{/each}
{/snippet}
