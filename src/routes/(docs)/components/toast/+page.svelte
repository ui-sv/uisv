<script>
	import { Button, toast } from '$lib/index.js';
</script>

<Button
	label="Say hello"
	onclick={() => {
		toast.info('hello');
	}}
/>
