<script lang="ts">
	import { resolve } from '$app/paths';
	import { Slider, type SliderProps, type PropColor } from '$lib/index.js';

	/* eslint @typescript-eslint/no-explicit-any: "off" */

	let value = $state(0);
	let min = $state(0);
	let max = $state(100);
	let step = $state(1);
</script>

<div class="space-y-4 p-4">
	<a href={resolve('/switch')}>switch</a>

	<h1>Basic</h1>
	{@render components({})}

	<h1>Default value: 50</h1>
	{@render components({ default: 50 }, true)}

	<h1>Sizes</h1>
	{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
		{@render components({ size: size as SliderProps<number>['size'] })}
	{/each}

	<h1>Min Max</h1>
	<input bind:value={min} type="number" placeholder="min" />
	<input bind:value={max} type="number" placeholder="max" />

	{@render components({ min, max })}

	<h1>Step</h1>
	<input bind:value={step} type="number" placeholder="step" />

	{@render components({ step })}

	<h1>Multiple</h1>

	{@render components({ value: [5, 50, 75] }, true)}

	<h1>Verticle</h1>

	{@render components({ orientation: 'vertical' })}

	<h1>Labels</h1>

	{@render components({ thumblabel: true })}

	<h1>Disabled</h1>

	{@render components({ disabled: true })}
</div>

{#snippet components(props?: SliderProps<any>, novalue?: boolean)}
	<div class="flex gap-2">
		{#each ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as color (color)}
			{#if novalue}
				<Slider {...props} color={color as PropColor} />
			{:else}
				<Slider {...props} bind:value color={color as PropColor} />
			{/if}
		{/each}
	</div>
{/snippet}
