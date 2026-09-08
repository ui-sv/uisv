<script module lang="ts">
	import { Dialog, type DialogContentProps, type PortalProps } from 'bits-ui';
	import { tv, type ClassValue } from 'tailwind-variants';
	import { Button, isComponent, isSnippet, type ButtonProps } from '../index.js';
	import type { Component, Snippet } from 'svelte';
	import defu from 'defu';
	import { fade, scale } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { getAppContext } from '../contexts.js';

	export type ModalProps = {
		open?: boolean;
		trigger?: ButtonProps;
		ui?: {
			overlay?: ClassValue;
			content?: ClassValue;
			header?: ClassValue;
			body?: ClassValue;
			footer?: ClassValue;
			title?: ClassValue;
			description?: ClassValue;
		};
		children?: Snippet;
		title?: string | Snippet<[Record<string, unknown>]> | Component;
		description?: string | Snippet<[Record<string, unknown>]> | Component;
		footer?: Snippet<[{ close: () => void }]>;
		close?: boolean | ButtonProps;
		transition?: boolean;
		overlay?: boolean;
		fullscreen?: boolean;
		dismissable?: boolean;
		portal?: PortalProps;
		content?: DialogContentProps;
	};
</script>

<script lang="ts">
	let {
		open = $bindable(false),
		trigger,
		ui = {},
		children,
		title,
		description,
		footer,
		close = true,
		transition = true,
		overlay = true,
		fullscreen,
		dismissable = true,
		portal,
		content,
	}: ModalProps = $props();

	let content_element = $state<HTMLDivElement | null>(null);

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

<Dialog.Root bind:open>
	{#if trigger}
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button {...props} {...trigger} />
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal {...portal}>
		<Dialog.Overlay forceMount>
			{#snippet child({ props })}
				{#if overlay && open}
					<div
						{...props}
						class={variants.overlay({
							class: [ui.overlay],
						})}
						transition:fade={{ duration: transition ? 200 : 0 }}
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>

		<Dialog.Content
			{...content}
			forceMount
			escapeKeydownBehavior={dismissable ? 'close' : 'ignore'}
			interactOutsideBehavior={dismissable ? 'close' : 'ignore'}
			onInteractOutside={(e) => {
				if (content_element?.contains(e.target as Node)) e.preventDefault();
				if (content?.onInteractOutside) content.onInteractOutside(e);
			}}
		>
			{#snippet child({ props })}
				{#if open}
					<div
						bind:this={content_element}
						{...props}
						class={variants.content({ class: ui.content })}
						transition:scale={{
							duration: transition ? 200 : 0,
							easing: cubicIn,
							start: 0.95,
							opacity: 0,
						}}
					>
						{#if title || description}
							<div class={variants.header({ class: ui.header })}>
								<div class="flex-1">
									{#if typeof title === 'string'}
										<h1 class={variants.title({ class: ui.title })}>{title}</h1>
									{:else if isSnippet(title)}
										{@render title({ class: variants.title({ class: ui.title }) })}
									{:else if isComponent(title)}
										{@const Comp = title}

										<Comp class={variants.title({ class: ui.title })} />
									{/if}

									{#if typeof description === 'string'}
										<h1 class={variants.description({ class: ui.description })}>{description}</h1>
									{:else if isSnippet(description)}
										{@render description({
											class: variants.description({ class: ui.description }),
										})}
									{:else if isComponent(title)}
										{@const Comp = description}

										<Comp class={variants.description({ class: ui.description })} />
									{/if}
								</div>

								{#if close}
									<Button
										{...props}
										{...defu(typeof close === 'boolean' ? {} : close, <ButtonProps>{
											variant: 'ghost',
											color: 'surface',
											icon: getAppContext().icons.close,
											onclick() {
												open = false;
											},
										})}
									/>
								{/if}
							</div>
						{/if}

						<div class={variants.body({ class: ui.body })}>
							{@render children?.()}
						</div>

						{#if footer}
							<div class={variants.footer({ class: ui.footer })}>
								{@render footer({
									close: () => (open = false),
								})}
							</div>
						{/if}
					</div>
				{/if}
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
