<script>
	import { Button, Modal, Placeholder } from '$lib/index.js';
</script>

<Modal
	title="Simple easy title"
	description="A bit longer explaination right under the title"
	trigger={{ label: 'Open menu' }}
>
	<Placeholder class="size-full" />

	hi!

	{#snippet footer({ close })}
		<Button label="Cancel" onclick={close} />

		<Modal
			title="Another modal"
			description="I don't know what to put here"
			trigger={{ label: 'What about a second modal?' }}
		>
			<Placeholder class="size-full" />
			hello?
		</Modal>
	{/snippet}
</Modal>
