<script lang="ts">
	import { Progress, type ProgressProps, type PropColor } from '$lib/index.js';
	import '@unocss/reset/tailwind.css';

	const BUTTON_COLORS: PropColor[] = [
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error'
	];

	let value = $state(0);
	let max = $state(100);
</script>

<div class="space-y-4 p-4">
	<h1>title</h1>

	<Progress {value} />

	<h1>value</h1>

	<input bind:value type="number" />

	{@render components()}

	<h1>max & status</h1>

	<input bind:value={max} type="number" />

	{@render components({ max, status: true })}

	<div>['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!']</div>

	{@render components({
		max: ['Waiting...', 'Cloning...', 'Migrating...', 'Deploying...', 'Done!'],
		status: true
	})}

	<h1>animation</h1>

	{@render components({
		animation: 'carousel'
	})}
	{@render components({
		animation: 'carousel-inverse'
	})}
	{@render components({
		animation: 'elastic'
	})}
	{@render components({
		animation: 'swing'
	})}
</div>

{#snippet components(props?: Partial<ProgressProps>)}
	{#each BUTTON_COLORS as color (color)}
		<Progress {...props} {value} {color} />
	{/each}
{/snippet}

<style>
	h1:not(:first-child) {
		padding-top: 2rem;
	}
</style>
