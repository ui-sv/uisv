```svelte
<script>
	import { Tabs } from 'uisv';
</script>

<Tabs items={['overview', 'setting']}>
	{#snippet content_1()}
		Settings content
	{/snippet}
</Tabs>

{#snippet content_0()}
	Overview content
{/snippet}
```
