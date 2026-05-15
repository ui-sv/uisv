<script module lang="ts">
	import { DEFAULT_ICONS, setAppIcons, type AppIcons } from '$lib/contexts.js';
	import { mode, ModeWatcher, type ModeWatcherProps } from '$lib/mode.js';
	import { Tooltip } from 'bits-ui';
	import defu from 'defu';
	import { type Snippet } from 'svelte';
	import { Toaster, type ToasterProps } from 'svelte-sonner';
	import { boxWith } from 'svelte-toolbelt';
	import { Icon } from './index.js';

	export type AppProps = {
		children?: Snippet;
		modewatcher?: ModeWatcherProps;
		toaster?: ToasterProps;
		tooltip?: Tooltip.ProviderProps;
		icons?: Partial<Record<AppIcons, `i-${string}:${string}`>>;
	};
</script>

<script lang="ts">
	let { children, modewatcher = {}, toaster = {}, tooltip = {}, icons = {} }: AppProps = $props();

	const _icons = boxWith(() => defu(icons, DEFAULT_ICONS));

	setAppIcons(_icons.current);
</script>

<ModeWatcher {...modewatcher} />

<Toaster
	theme={mode.current}
	{...defu(toaster, <ToasterProps>{
		visibleToasts: 5,
		toastOptions: { duration: 6000 },
	})}
>
	{#snippet infoIcon()}
		<Icon name={_icons.current.info} />
	{/snippet}

	{#snippet closeIcon()}
		<Icon name={_icons.current.close} />
	{/snippet}

	{#snippet errorIcon()}
		<Icon name={_icons.current.error} />
	{/snippet}

	{#snippet loadingIcon()}
		<Icon name={_icons.current.loading} />
	{/snippet}

	{#snippet successIcon()}
		<Icon name={_icons.current.success} />
	{/snippet}

	{#snippet warningIcon()}
		<Icon name={_icons.current.warning} />
	{/snippet}
</Toaster>

<Tooltip.Provider {...tooltip}>
	{@render children?.()}
</Tooltip.Provider>
