<script>
	import { Alert, Button, Select, Card, Checkbox, toast } from '$lib/index.js';
	import { useId } from 'bits-ui';

	let title = $state('Heads up!');
	let description = $state('You can change the primary color in your app config.');
	let icon = $state('i-lucide:terminal');
	let color = $state('primary');
	let variant = $state('outline');
	let close = $state(true)
	const close_onclick = () => toast({ title: 'Alert close event.'})
	let actions = $state([]);
	let orientation = $state('vertical');
</script>

### Title and Description
Use the `title` and `description` prop to set the title and description of the Alert.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <input bind:value={title} placeholder="title" />
    <input bind:value={description} placeholder="description" />
  {/snippet}

  <Alert
    {title}
    {description}
    color="primary"
    variant="outline"
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
/>
```
  {/snippet}
</Card>

### Icon
Use the `icon` prop to show an Icon.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <input bind:value={icon} placeholder="icon" />
  {/snippet}

  <Alert
    {title}
    {description}
    {icon}
    color="primary"
    variant="outline"
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide:terminal"
/>
```
  {/snippet}
</Card>

### Color and Variant
Use the `color` and `variant` prop to change the color and variant of the Alert.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <Select bind:value={color} items={["primary","surface","info","success","warning","error"]} />
    <Select bind:value={variant} items={["solid","outline","soft","subtle"]} />
  {/snippet}

  <Alert
    {title}
    {description}
    {icon}
    {color}
    {variant}
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide:terminal"
    color="primary"
    variant="outline"
/>
```
  {/snippet}
</Card>

### Close
Use the `close` prop to display a Button to dismiss the Alert. You can pass any property from the Button component to customize it.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <Checkbox bind:value={close} label="Include close button" />
  {/snippet}

  <Alert
    {title}
    {description}
    {icon}
    {color}
    {variant}
    close={close ? { onclick: close_onclick } : false}
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide:terminal"
    color="primary"
    variant="outline"
    close
/>
```
  {/snippet}
</Card>

### Actions
Use the `actions` prop to add some Button actions to the Alert.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <Button label="Insert action" onclick={() => {
      const id = useId() 
      actions.push({ label: id, variant: actions.length ? 'outline' : 'solid', onclick() { toast({ title: id + ' action event.' })}})
    }} />

    <Button label="Delete action" variant="outline" onclick={() => actions.pop()} />
  {/snippet}

  <Alert
    {title}
    {description}
    {icon}
    {color}
    {variant}
    close={close ? { onclick: close_onclick } : false}
    {actions}
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide:terminal"
    color="primary"
    variant="outline"
    close
    actions={[{ label: uid() }]}
/>
```
  {/snippet}
</Card>

### Orientation
Use the `orientation` prop to change the orientation of the Alert.

<Card variant="outline" ui={{ footer: "p-0 sm:p-0" }}>
  {#snippet header()}
    <Select bind:value={orientation} items={["vertical","horizontal"]} />
  {/snippet}

  <Alert
    {title}
    {description}
    {icon}
    {color}
    {variant}
    close={close ? { onclick: close_onclick } : false}
    {actions}
    {orientation}
  />

  {#snippet footer()}
```svelte
<Alert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide:terminal"
    color="primary"
    variant="outline"
    close
    actions={[{ label: uid() }]}
    orientation="vertical"
/>
```
  {/snippet}
</Card>
