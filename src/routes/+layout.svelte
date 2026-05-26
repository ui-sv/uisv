<script lang="ts">
	import { page } from '$app/state';
	import { Button, App, Popover, Select, Icon, useStyle } from '$lib/index.js';
	import { links } from '$internal/index.js';
	import {
		COLORS_PRIMARY,
		COLORS_SURFACE,
		ICONS_PHOSPHOR,
		ICONS_TABLER,
	} from '$internal/customizationism.js';
	import { PersistedState } from 'runed';
	import 'virtual:uno.css';
	import { DEFAULT_ICONS } from '$lib/contexts.js';

	const ICONS_OBJ = {
		lucide: {
			icons: DEFAULT_ICONS,
			logo: 'i-simple-icons:lucide',
			extraicons: {
				github: 'i-lucide:github',
				swatchbook: 'i-lucide:swatch-book',
			},
		},
		phosphor: {
			icons: ICONS_PHOSPHOR,
			logo: 'i-simple-icons:phosphoricons',
			extraicons: {
				github: 'i-ph:github-logo',
				swatchbook: 'i-ph:swatches',
			},
		},
		tabler: {
			icons: ICONS_TABLER,
			logo: 'i-lucide:terminal',
			extraicons: {
				github: 'i-tabler:brand-github',
				swatchbook: 'i-tabler:color-swatch',
			},
		},
	};

	const { children } = $props();

	let nav_opened = $state(false);
	let search_opened = $state(false);
	let selected_primary = new PersistedState<keyof typeof COLORS_PRIMARY>(
		'selected_primary',
		'svelte',
	);
	let selected_surface = new PersistedState<keyof typeof COLORS_SURFACE>(
		'selected_surface',
		'neutral',
	);
	let selected_icon = new PersistedState<keyof typeof ICONS_OBJ>('selected-icons', 'lucide');

	const icons = $derived({
		...ICONS_OBJ[selected_icon.current].icons,
		...ICONS_OBJ[selected_icon.current].extraicons,
	});

	$effect(() => {
		if (typeof document === 'undefined') return;

		document.body.classList[nav_opened || search_opened ? 'add' : 'remove']('overflow-hidden');
	});

	useStyle(
		() => `:root, html, body {
		--colors-primary-DEFAULT: ${COLORS_PRIMARY[selected_primary.current][500]};
		--colors-primary-50: ${COLORS_PRIMARY[selected_primary.current][50]};
		--colors-primary-100: ${COLORS_PRIMARY[selected_primary.current][100]};
		--colors-primary-200: ${COLORS_PRIMARY[selected_primary.current][200]};
		--colors-primary-300: ${COLORS_PRIMARY[selected_primary.current][300]};
		--colors-primary-400: ${COLORS_PRIMARY[selected_primary.current][400]};
		--colors-primary-500: ${COLORS_PRIMARY[selected_primary.current][500]};
		--colors-primary-600: ${COLORS_PRIMARY[selected_primary.current][600]};
		--colors-primary-700: ${COLORS_PRIMARY[selected_primary.current][700]};
		--colors-primary-800: ${COLORS_PRIMARY[selected_primary.current][800]};
		--colors-primary-900: ${COLORS_PRIMARY[selected_primary.current][900]};
		--colors-primary-950: ${COLORS_PRIMARY[selected_primary.current][950]};

		--colors-surface-DEFAULT: ${COLORS_SURFACE[selected_surface.current][500]};
		--colors-surface-50: ${COLORS_SURFACE[selected_surface.current][50]};
		--colors-surface-100: ${COLORS_SURFACE[selected_surface.current][100]};
		--colors-surface-200: ${COLORS_SURFACE[selected_surface.current][200]};
		--colors-surface-300: ${COLORS_SURFACE[selected_surface.current][300]};
		--colors-surface-400: ${COLORS_SURFACE[selected_surface.current][400]};
		--colors-surface-500: ${COLORS_SURFACE[selected_surface.current][500]};
		--colors-surface-600: ${COLORS_SURFACE[selected_surface.current][600]};
		--colors-surface-700: ${COLORS_SURFACE[selected_surface.current][700]};
		--colors-surface-800: ${COLORS_SURFACE[selected_surface.current][800]};
		--colors-surface-900: ${COLORS_SURFACE[selected_surface.current][900]};
		--colors-surface-950: ${COLORS_SURFACE[selected_surface.current][950]};

        --colors-label-DEFAULT: var(--colors-surface-700);
  		--colors-label-dimmed: var(--colors-surface-400);
  		--colors-label-muted: var(--colors-surface-500);
  		--colors-label-toned: var(--colors-surface-600);
  		--colors-label-highlighted: var(--colors-surface-900);
  		--colors-label-inverted: white;
  		--colors-surface-base: white;
  		--colors-surface-muted: var(--colors-surface-50);
  		--colors-surface-elevated: var(--colors-surface-100);
  		--colors-surface-accented: var(--colors-surface-200);
  		--colors-surface-inverted: var(--colors-surface-900);

		.dark {
		    --colors-label-base: var(--colors-surface-200);
      		--colors-label-dimmed: var(--colors-surface-500);
      		--colors-label-muted: var(--colors-surface-400);
      		--colors-label-toned: var(--colors-surface-300);
      		--colors-label-highlighted: white;
      		--colors-label-inverted: var(--colors-surface-900);
      		--colors-surface-base: var(--colors-surface-900);
      		--colors-surface-muted: var(--colors-surface-800);
      		--colors-surface-elevated: var(--colors-surface-800);
      		--colors-surface-accented: var(--colors-surface-700);
      		--colors-surface-inverted: white;
		}
	}`,
	);
</script>

<App {icons}>
	<nav
		class="sticky top-0 z-5 bg-label-inverted backdrop-blur-lg w-full border-b border-surface-accented h-16 flex items-center"
	>
		<div class="container mx-auto flex items-center">
			<div class="flex-1 flex items-center">
				<Button variant="link" ui={{ base: 'px-0!' }} href="/">
					<img class="size-8" src="/favicon.svg" alt="logo" />
					<span class="font-quicksand font-lg text-2xl"> uisv </span>
				</Button>
			</div>

			<div class="flex-1 flex justify-center">
				{#each Object.entries(links) as [label] (label)}
					<Button
						{label}
						href="/{label}"
						variant="link"
						color="surface"
						ui={{
							base: [
								'capitalize',
								page.url.pathname.startsWith(`/${label}`) ? 'text-primary hover:text-primary' : '',
							],
						}}
					/>
				{/each}
			</div>

			<div class="flex-1 flex justify-end">
				<Button variant="ghost" color="surface" ui={{ base: 'text-primary' }} />
				<Popover
					variant="ghost"
					ui={{ trigger: 'text-primary', content: 'space-y-4' }}
					icon={icons.swatchbook}
				>
					<p class="text-xs mb-2 px-2">Primary</p>

					<div class="grid grid-cols-3 gap-1">
						{#each Object.entries(COLORS_PRIMARY) as [color, values] (color)}
							<Button
								size="sm"
								variant="outline"
								color="surface"
								ui={{
									base: [
										'capitalize pr-4 gap-2',
										selected_primary.current === color ? 'bg-surface/10' : '',
									],
								}}
								onclick={() => (selected_primary.current = color as keyof typeof COLORS_PRIMARY)}
							>
								<span class="size-1.5 rounded-full" style:background-color={values[500]}></span>

								{color}
							</Button>
						{/each}
					</div>

					<p class="text-xs mb-2 px-2">Surface</p>

					<div class="grid grid-cols-3 gap-1">
						{#each Object.entries(COLORS_SURFACE) as [color, values] (color)}
							<Button
								size="sm"
								variant="outline"
								color="surface"
								ui={{
									base: [
										'capitalize pr-4 gap-2',
										selected_surface.current === color ? 'bg-surface/10' : '',
									],
								}}
								onclick={() => (selected_surface.current = color as keyof typeof COLORS_SURFACE)}
							>
								<span class="size-1.5 rounded-full" style:background-color={values[500]}></span>

								{color}
							</Button>
						{/each}
					</div>

					<p class="text-xs mb-2 px-2">Icons</p>

					<Select
						bind:value={selected_icon.current}
						items={['lucide', 'phosphor', 'tabler']}
						ui={{ content: 'z-30', base: 'w-full', item: 'capitalize items-center' }}
					>
						{#snippet item({ item })}
							<Icon name={ICONS_OBJ[item as keyof typeof ICONS_OBJ].logo} />

							<span class="grow">
								{item}
							</span>

							<Icon name={icons.check} class={[item !== selected_icon.current && 'opacity-0']} />
						{/snippet}
					</Select>
				</Popover>

				<!-- <Button
					variant="ghost"
					color="surface"
					icon={mode.current === 'light' ? 'i-lucide-moon' : 'i-lucide-sun'}
					onclick={toggleMode}
				/> -->

				<Button
					href="https://github.com/ui-sv/uisv"
					target="_blank"
					variant="ghost"
					color="surface"
					icon={icons.github}
				/>

				<Button
					icon={nav_opened ? 'i-lucide-x' : 'i-lucide-menu'}
					variant="ghost"
					color="surface"
					ui={{ base: 'md:hidden' }}
					onclick={() => {
						nav_opened = !nav_opened;
					}}
				/>
			</div>
		</div>
	</nav>

	{@render children()}
</App>

<svelte:head>
	<title>UI Svelte</title>
</svelte:head>
