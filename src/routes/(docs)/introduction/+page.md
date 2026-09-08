# Introduction

uisv is an unstyled component library for Svelte. It gives you the interactive behavior, accessibility semantics, and keyboard handling for common UI patterns - without imposing any styles.

You own the markup. You own the styles. uisv handles the hard parts.

## Philosophy

Most UI libraries bundle behavior and design together. That's great for getting started, but it creates friction the moment your design deviates from their default.

uisv takes the opposite approach:

- **Zero default styles.**
- **Svelte-native snippets API.**
- **Composable, not opinionated.** *Other than how the component's are structured.

## Design decisions

**Why this instead of sub-components?**

It is repeatitive to write sub-components and I just want to style into reusable components easily.

**Why no default styles at all?**

Every project should be different and stand out.

**Why the name uisv**

User Interface SVelte? heh? It is all lowercase because `UISv`, `UiSv`, `UISV`, `uiSV`, `uiSv`, `Uisv`, `UIsv`, and etc looks weird to me.

## Example

That is an example of how I would style and structure it with `uisv` to make it reusable intead of rewriting the whole code for every project like in [Modal's code](https://github.com/ui-sv/uisv/blob/main/src/lib/components/modal.svelte)

```svelte
<script lang="ts">
	import { Modal, type ModalProps } from 'uisv';
	import { tv } from 'tailwind-variants';

	let { open = $bindable(), fullscreen, ui = {}, ...rest }: ModalProps = $props();

	const variants = $derived(
		tv({
			slots: {
				content:
					'z-[calc(var(--bits-dialog-depth)*10+11)] fixed bg-surface-base border border-surface-accented rounded-md divide-y divide-surface-accented flex flex-col overflow-hidden pointer-events-auto',
				overlay: 'fixed inset-0 bg-surface-elevated/75 z-[calc(var(--bits-dialog-depth)*10+10)] ',
				header: 'flex items-center gap-1.5 p-4 sm:px-6',
				body: 'flex-1 p-4 sm:p-6 overflow-y-auto',
				footer: 'flex items-center gap-1.5 p-4 sm:px-6',
				title: 'text-label-highlighted font-semibold select-all',
				description: 'mt-1 text-label-muted text-sm',
			},
			variants: {
				fullscreen: {
					true: {
						content: 'inset-0',
					},
					false: {
						content:
							'-translate-1/2 top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] max-w-lg w-full',
					},
				},
			},
		})({ fullscreen }),
	);
</script>

<Modal
	bind:open
	{...rest}
	ui={{
		content: variants.content({ class: ui.content }),
		overlay: variants.overlay({ class: ui.overlay }),
		header: variants.header({ class: ui.header }),
		body: variants.body({ class: ui.body }),
		footer: variants.footer({ class: ui.footer }),
		title: variants.title({ class: ui.title }),
		description: variants.description({ class: ui.description }),
	}}
/>
```
