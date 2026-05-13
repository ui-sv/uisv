<script module lang="ts">
	import { app_icons, DEFAULT_ICONS, type AppIcons } from '$lib/contexts.js';
	import { ModeWatcher, type ModeWatcherProps } from '$lib/mode.js';
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
	let { children, modewatcher, toaster, tooltip, icons = {} }: AppProps = $props();

	const _icons = boxWith(() => defu(icons, DEFAULT_ICONS));

	app_icons.set(_icons.current);
</script>

<ModeWatcher {...modewatcher} />
<Toaster {...toaster}>
	{#snippet infoIcon()}
		<Icon name={app_icons.get().info} />
	{/snippet}

	{#snippet closeIcon()}
		<Icon name={app_icons.get().close} />
	{/snippet}

	{#snippet errorIcon()}
		<Icon name={app_icons.get().error} />
	{/snippet}

	{#snippet loadingIcon()}
		<Icon name={app_icons.get().loading} />
	{/snippet}

	{#snippet successIcon()}
		<Icon name={app_icons.get().success} />
	{/snippet}

	{#snippet warningIcon()}
		<Icon name={app_icons.get().warning} />
	{/snippet}
</Toaster>

<Tooltip.Provider {...tooltip}>
	{@render children?.()}
</Tooltip.Provider>
