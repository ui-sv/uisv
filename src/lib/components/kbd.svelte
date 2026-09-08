<script module lang="ts">
	import type { Snippet } from 'svelte';
	import { cn, type ClassValue } from 'tailwind-variants';

	export type KbdProps = {
		children?: Snippet;
		value?: string;
		class?: ClassValue;
	};

	export const KBD_KEYS = {
		meta: '',
		ctrl: '',
		alt: '',
		win: '⊞',
		command: '⌘',
		shift: '⇧',
		control: '⌃',
		option: '⌥',
		enter: '↵',
		delete: '⌦',
		backspace: '⌫',
		escape: 'Esc',
		tab: '⇥',
		capslock: '⇪',
		arrowup: '↑',
		arrowright: '→',
		arrowdown: '↓',
		arrowleft: '←',
		pageup: '⇞',
		pagedown: '⇟',
		home: '↖',
		end: '↘'
	};

	export type KbdKey = keyof typeof KBD_KEYS;
	export type KbdSpecificKey = 'meta' | 'alt' | 'ctrl';
</script>

<script lang="ts">
	const { children, value, class: classname }: KbdProps = $props();

	const macOS = $derived.by(() => {
		if (typeof navigator === 'undefined') return null;
		if (!navigator.userAgent) return null;
		return navigator.userAgent.match(/Macintosh;/);
	});

	const kbdKeysSpecificMap = $derived({
		meta: macOS ? KBD_KEYS.command : 'Ctrl',
		alt: macOS ? KBD_KEYS.command : 'Ctrl',
		ctrl: macOS ? KBD_KEYS.option : 'Alt'
	});

	function getKey(value?: KbdKey | string) {
		if (!value) {
			return;
		}

		if (['meta', 'alt', 'ctrl'].includes(value)) {
			return kbdKeysSpecificMap[value as KbdSpecificKey];
		}

		return KBD_KEYS[value as KbdKey] || value.toUpperCase();
	}
</script>

<kbd class={cn(classname)}>
	{#if value}
		{getKey(value)}
	{:else}
		{@render children?.()}
	{/if}
</kbd>
