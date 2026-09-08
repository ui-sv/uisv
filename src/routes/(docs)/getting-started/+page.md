# Getting started

Add uisv to your Svelte project in minutes.

## Installation

```sh
bun install uisv
# pnpm add uisv
# npm install uisv
# yarn add uisv
```

## Setup

### with UnoCSS

UnoCSS is bundled with uisv and it is recommended because I think so.

```ts
// vite.config.ts
import uisv from 'uisv/vite';

export default defineConfig({
	plugins: [sveltekit(), uisv()],
});
```

Import `virtual:uno.css` in your top most layout.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	let { children } = $props();
	import 'virtual:uno.css';
</script>

{@render children()}
```

### with TailwindCSS

Install the package:

```sh
bun i tailwindcss @tailwindcss/vite
```

Add the Tailwind's vite plugin in your config:

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
});
```

Do some of this,

```css
/* src/lib/app.css */
@import 'tailwindcss';
```

and some of that.

```svelte
<!-- +layout.svelte -->
<script>
	let { children } = $props();
	import '$lib/app.css';
</script>

{@render children()}
```
