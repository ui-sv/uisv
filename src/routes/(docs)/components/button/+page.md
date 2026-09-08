<script>
import { Button } from '$lib/index.js'
import CodeSnippet from '$site/code-snippet.svelte'

const ghost_class = "flex items-center gap-2 px-4 h-8 transition-all hover:bg-surface-muted active:translate-y-0.5 text-sm font-medium"
const ghost_icon_class = "size-8 grid place-items-center transition-all hover:bg-surface-muted active:translate-y-0.5"
const outline_class = "flex items-center gap-2 border px-4 h-8 border-surface-accented transition-all hover:bg-surface-muted active:translate-y-0.5 text-sm font-medium"
const outline_icon_class = "border size-8 grid place-items-center border-surface-accented transition-all hover:bg-surface-muted active:translate-y-0.5"
const primary_class = "flex items-center gap-2 border px-4 h-8 border-surface-accented transition-all bg-primary text-white hover:bg-primary/75 active:translate-y-0.5 text-sm font-medium"
const primary_icon_class = "border size-8 grid place-items-center border-surface-accented transition-all bg-primary text-white hover:bg-primary/75 active:translate-y-0.5"
const ui = { icon: 'data-[loading]:animate-spin'}


function load(idx) {
  return new Promise(resolve => setTimeout(resolve, 2000));
}
</script>

# Button

A component that can switch between a button and an anchor tag based on the `href` prop.

## Usage

<CodeSnippet>

<Button label="Ghost" class={ghost_class} />
<Button icon="i-lucide:arrow-up" class={ghost_icon_class} />

<Button label="Outline" class={outline_class} />
<Button icon="i-lucide:arrow-up" class={outline_icon_class} />

<Button label="Primary" class={primary_class} />
<Button icon="i-lucide:arrow-up" class={primary_icon_class} />

{#snippet code()}

```svelte
<script lang="ts">
	import { Button } from 'uisv';
</script>

<Button
	label="Button"
	class="border px-4 h-8 border-surface-accented transition-all text-sm font-medium
	hover:bg-surface-muted active:translate-y-0.5"
/>

<Button
	icon="i-lucide:arrow-up"
	class="border size-8 grid place-items-center border-surface-accented transition-all
	hover:bg-surface-muted active:translate-y-0.5"
/>
```

{/snippet}

</CodeSnippet>

### Loading state

Use `loadingauto` to automatically show a spinner while the `onclick` handler's Promise is pending.

<CodeSnippet>

<Button label="Ghost" class={ghost_class} onclick={load} ui={ui} />
<Button icon="i-lucide:arrow-up" class={ghost_icon_class} onclick={load} ui={ui} />

<Button label="Outline" class={outline_class} onclick={load} ui={ui} />
<Button icon="i-lucide:arrow-up" class={outline_icon_class} onclick={load} ui={ui} />

<Button label="Primary" class={primary_class} onclick={load} ui={ui} />
<Button icon="i-lucide:arrow-up" class={primary_icon_class} onclick={load} ui={ui} />

{#snippet code()}

```svelte
<Button label="Button" onclick={async_function} />

<Button icon="i-lucide:arrow-up" onclick={async_function} />
```

{/snippet}

</CodeSnippet>

### Link

You can pass `href` to render as a link, as well as any anchor property.

<CodeSnippet>
<Button href="/components" label="Components" class={ghost_class} />
<Button href="https://github.com/ui-sv/uisv" icon="i-lucide:github" class={ghost_icon_class} />

{#snippet code()}

```svelte
<Button href="/components" label="Components" />

<Button href="https://github.com/ui-sv/uisv" icon="i-lucide:github" />
```

{/snippet}

</CodeSnippet>
