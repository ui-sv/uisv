<script lang="ts">
	import Checkbox from '$lib/components/checkbox.svelte';
	import { Alert, Button, Select, type AlertProps } from '$lib/index.js';
	import { useId } from 'bits-ui';

	let title = $state('Heads up!');
	let description = $state('You can change the primary color in your app config.');
	let icon = $state('i-lucide:rocket');
	let color = $state<AlertProps['color']>('surface');
	let variant = $state<AlertProps['variant']>('outline');
	let close = $state(false);
	let actions = $state<Exclude<AlertProps['actions'], undefined>>([]);
	let horizontal = $state(false);
</script>

<input bind:value={title} type="text" placeholder="title" />

<br />

<input bind:value={description} type="text" placeholder="description" />

<br />

<input bind:value={icon} type="text" placeholder="icon" />

<br />

<Select
	bind:value={color}
	items={<AlertProps['color'][]>['primary', 'surface', 'info', 'success', 'warning', 'error']}
/>

<br />

<Select
	bind:value={variant}
	items={<AlertProps['variant'][]>['solid', 'outline', 'subtle', 'soft']}
/>

<br />

<Checkbox bind:value={close} label="Close button" />

<div>
	<Button
		label="Remove action"
		variant="outline"
		onclick={() => {
			actions.pop();
		}}
	/>
	<Button
		label="Add action"
		onclick={() => {
			actions.push({
				label: useId('alert'),
				variant: actions.length ? 'subtle' : undefined,
				color: actions.length ? 'surface' : undefined,
			});
		}}
	/>
</div>

<Checkbox bind:value={horizontal} label="Change orientation to horizontal" />

<Alert
	{title}
	{description}
	{icon}
	{color}
	{variant}
	{close}
	{actions}
	orientation={horizontal ? 'horizontal' : 'vertical'}
/>
