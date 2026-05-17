<script module lang="ts">
	import { DEFAULT_ICONS, setAppContext, type AppContext } from '$lib/contexts.js';
	import { mode, ModeWatcher } from '$lib/mode.js';
	import { Tooltip } from 'bits-ui';
	import defu from 'defu';
	import { type Snippet } from 'svelte';
	import { Toaster } from 'svelte-sonner';
	import { boxWith } from 'svelte-toolbelt';
	import { Icon } from './index.js';
	import type { VariantsConfig } from '$lib/theme/index.js';

	export type AppProps = Partial<AppContext> & {
		children?: Snippet;
		modewatcher?: ModeWatcherProps;
		toaster?: ToasterProps;
		tooltip?: Tooltip.ProviderProps;
		icons?: Partial<Record<AppIcons, `i-${string}:${string}`>>;
		theme?: VariantsConfig;
	};
</script>

<script lang="ts">
	let {
		children,
		modewatcher = {},
		toaster = {},
		tooltip = {},
		icons = {},
		theme,
	}: AppProps = $props();

	const context = boxWith(() =>
		defu({ icons, toaster, modewatcher, tooltip }, <AppContext>{
			icons: DEFAULT_ICONS,
			toaster: {
				visibleToasts: 5,
				duration: 6000,
				theme: mode.current,
			},
			modewatcher: {},
		}),
	);
	setAppContext(context.current);
</script>

<ModeWatcher {...context.current.modewatcher} />

<Toaster {...context.current.toaster}>
	{#snippet infoIcon()}
		<Icon name={context.current.icons.info} />
	{/snippet}

	{#snippet closeIcon()}
		<Icon name={context.current.icons.close} />
	{/snippet}

	{#snippet errorIcon()}
		<Icon name={context.current.icons.error} />
	{/snippet}

	{#snippet loadingIcon()}
		<Icon name={context.current.icons.loading} />
	{/snippet}

	{#snippet successIcon()}
		<Icon name={context.current.icons.success} />
	{/snippet}

	{#snippet warningIcon()}
		<Icon name={context.current.icons.warning} />
	{/snippet}
</Toaster>

<Tooltip.Provider {...context.current.tooltip}>
	{@render children?.()}
</Tooltip.Provider>
