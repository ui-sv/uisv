<script>
	import { Alert } from '$lib/index.js';
</script>

--- title: Alert desc: A callout to draw user's attention. code: components/alert.svelte docs:
components/alert/+page.md bits: docs/components/tabs --- ## Usage ### Title Use the `title` prop to
set the title of the Alert.

<div class="bg-error">
	<Alert
		title="Heads up!"
		description="You can change the primary color in your vite config."
		icon="lucide:terminal"
	/>

	```svelte
	<Alert
		title="Heads up!"
		description="You can change the primary color in your vite config."
		icon="lucide:terminal"
	/>
	```
</div>
