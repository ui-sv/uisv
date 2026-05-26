<script>
	import { RadioGroup, Button, Select, Card, Checkbox, toast } from '$lib/index.js';
	import { useId } from 'bits-ui';

	const items = [
	  {
			title: 'Svelte',
			description: 'Web development for the rest of us'
	  },
		{
			title: 'Vite',
			description: 'The Build Tool for the Web'
		},
  	{
  		title: 'UI Svelte',
  		description: 'ui library for the rest of us'
  	}
	]

</script>

### Items & Description
Use the `items` prop as an array of strings or numbers.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  <RadioGroup
    items={items.map(({ title }) => title)}
  />

  {#snippet footer()}
```svelte
<script>
    import { RadioGroup } from 'uisv';

    const items = ['Svelte', 'Vite', 'UISV']
    let value = $state('Svelte')
</script>

<Alert
    bind:value
    {items}
/>
```
  {/snippet}
</Card>
