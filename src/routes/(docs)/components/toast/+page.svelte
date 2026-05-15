<script lang="ts">
	import { Button, toast } from '$lib/index.js';
</script>

<Button
	label="simple"
	onclick={() => {
		console.log(
			toast({
				title: 'Event has been dispatched',
				description: "Check the edge of your screen for the message you're reading",
			}),
		);
	}}
/>

<Button
	label="icon"
	onclick={() => {
		console.log(
			toast({
				title: 'Event has been dispatched',
				description: "Check the edge of your screen for the message you're reading",
				icon: 'i-lucide:rocket',
			}),
		);
	}}
/>

<Button
	label="icon with actions"
	onclick={() => {
		console.log(
			toast({
				title: 'Event has been dispatched',
				description: "Check the edge of your screen for the message you're reading",
				icon: 'i-lucide:rocket',
				actions: [{ label: 'Redispatch' }],
			}),
		);
	}}
/>
