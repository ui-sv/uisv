```svelte
<script>
	import { Accordion } from 'uisv';

	const items = [
		{
			label: 'What is uisv?',
			content: 'uisv is an unstyled component library for Svelte.',
		},
		{
			label: 'Why is uisv?',
			content: why_is_uisv,
		},
	];
</script>

<Accordion {items} />

{#snippet why_is_uisv()}
	Because it simplifies customizing Bits UI components, or so I think.
{/snippet}
```
