<script>
	import { Card, Input } from '$lib/index.js';

	let placeholder = $state('Search...')
</script>

## Usage
Use the `bind:value` directive to control the value of the Input.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0"}}>
  <Input />

  {#snippet footer()}
```svelte
<script lang="ts">
  import { Input } from 'uisv'
  
  let value = $state('')
</script>

<template>
  <Input bind:value />
</template>
```
  {/snippet}
</Card>

### Placeholder
Use the `placeholder` prop to set a placeholder text.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0"}}>
  {#snippet header()}
    <Input bind:value={placeholder} placeholder="placeholder" />
  {/snippet}

  <Input {placeholder} />

  {#snippet footer()}
```svelte
<script lang="ts">
  import { Input } from 'uisv'
  
  let value = $state('')
</script>

<template>
  <Input bind:value placeholder="Search..." />
</template>
```
  {/snippet}
</Card>

### Color and Variant
Use the `color` prop to change the ring color when the Input is focused. Use the `variant` prop to change the variant of the Input.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0"}}>
  {#snippet header()}
    <Input bind:value={placeholder} placeholder="placeholder" />
  {/snippet}

  <Input {placeholder} />

  {#snippet footer()}
```svelte
<script lang="ts">
  import { Input } from 'uisv'
  
  let value = $state('')
</script>

<template>
  <Input bind:value placeholder="Search..." />
</template>
```
  {/snippet}
</Card>
