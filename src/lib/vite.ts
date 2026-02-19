import uno_plugin from 'unocss/vite';
import {
	transformerVariantGroup,
	transformerCompileClass,
	transformerDirectives,
	presetWebFonts,
	presetIcons,
	presetWind4,
} from 'unocss';
import { type WebFontsOptions } from '@unocss/preset-web-fonts';
import { defu } from 'defu';
import type { PropColor } from './index.js';
import { getColors } from 'theme-colors';
// import type { Plugin } from 'vite';
// import { resolve } from 'node:path';

export type Colors = Record<string, string | Record<string, string>>;

export type NestedObject<K extends string, V> = {
	[key in K]: NestedObject<K, V> | V;
};

export type PluginOptions = {
	/**
	 * Colors as UnoCSS color name, hex color, or UnoCSS theme color object
	 * @example
	 * {
	 *  primary: '#FF3E00',
	 *  surface: 'neutral',
	 *  info: '#00F',
	 *  success: '#0F0',
	 *  warning: 'FF0',
	 *  error: {
	 *    50: '#fef2f2';
	 *    100: '#fee2e2';
	 *    200: '#fecaca';
	 *    300: '#fca5a5';
	 *    400: '#f87171';
	 *    500: '#ef4444';
	 *    600: '#dc2626';
	 *    700: '#b91c1c';
	 *    800: '#991b1b';
	 *    900: '#7f1d1d';
	 *    950: '#450a0a';
	 *  }
	 * }
	 */
	colors?: Partial<Record<PropColor, string | Record<number, string>>>;
	/**
	 * UnoCSS theme object for shared configuration between rules
	 */
	theme?: object;
	/**
	 * Options for the UnoCSS web fonts preset
	 */
	fonts?: WebFontsOptions;
	/**
	 * Corner radius for every* component
	 */
	radius?: number;
	/**
	 * Options for the UnoCSS icon preset
	 */
	icons?: Parameters<typeof presetIcons>[0];
};

export function uisv(options: PluginOptions) {
	const _opts: PluginOptions = defu(options, {
		colors: {
			primary: {
				DEFAULT: '#FF3E00',
				50: '#FFECE5',
				100: '#FFD8CC',
				200: '#FFB299',
				300: '#FF8B66',
				400: '#FF6533',
				500: '#FF3E00',
				600: '#CC3200',
				700: '#992500',
				800: '#661900',
				900: '#330C00',
				950: '#1A0600',
			},
			surface: 'neutral',
			info: 'blue',
			success: 'green',
			warning: 'yellow',
			error: 'red',
		},
		fonts: {
			fonts: {
				sans: 'Public Sans:400,500,600',
			},
		},
		icons: {
			autoInstall: true,
		},
		theme: {
			radius: {
				base: `${options.radius || 0.375}rem`,
			},
		},
	} as PluginOptions);

	// const theme_plugin: Plugin = {
	// 	name: 'vite-plugin-uisv',
	// 	enforce: 'pre',
	// 	async configResolved() {
	// 		const path = resolve('node_modules/uisv/theme.js');

	// 		console.log(await write(path, `export const button = {}`));
	// 	},
	// 	resolveId(source, importer, options) {
	// 		if (source === '$build') return resolve('node_modules/uisv/theme.js');
	// 	},
	// };

	return [
		uno_plugin({
			content: {
				pipeline: {
					include: [
						// the default
						/\.(vue|svelte|[jt]sx|vine.ts|mdx?|astro|elm|php|phtml|marko|html)($|\?)/,
						// include js/ts files
						'src/**/*.{js,ts}',
					],
				},
			},
			theme: _opts.theme,
			preflights: [
				{
					getCSS({ theme }) {
						if (!('colors' in theme) || typeof theme.colors !== 'object') return;
						const colors = theme.colors as Colors;
						if (typeof colors.surface !== 'object') return '';

						const variables = `
              --colors-DEFAULT: ${colors.surface['200']};
      				--colors-dimmed: ${colors.surface['500']};
      				--colors-muted: ${colors.surface['400']};
      				--colors-toned: ${colors.surface['300']};
      				--colors-highlighted: white;
      				--colors-inverted: ${colors.surface['900']};

      				--colors-surface-DEFAULT: ${colors.surface['900']};
      				--colors-surface-muted: ${colors.surface['800']};
      				--colors-surface-elevated: ${colors.surface['800']};
      				--colors-surface-accented: ${colors.surface['700']};
      				--colors-surface-inverted: white;
            `;

						return `
						body {
						  background-color: var(--colors-inverted);
						}

            .dark {
              ${variables}
            }
            `;
					},
				},
			],

			presets: [
				presetWind4({
					dark: 'media',
					preflights: {
						reset: true,
					},
				}),
				presetWebFonts(_opts.fonts),
				presetIcons(_opts.icons),
			],
			transformers: [transformerVariantGroup(), transformerCompileClass(), transformerDirectives()],
			extendTheme: (theme) => {
				if (!('colors' in theme) || typeof theme.colors !== 'object') theme.colors = {};
				const colors = theme.colors as Colors;

				for (const [color, value] of Object.entries(_opts.colors!)) {
					if (typeof value !== 'string') {
						colors[color] = value;
						continue;
					}
					const in_theme = colors[value];
					colors[color] = in_theme ? in_theme : getColors(value);
				}

				if (typeof colors.surface === 'object') {
					colors['DEFAULT'] = colors.surface['700'];
					colors['dimmed'] = colors.surface['400'];
					colors['muted'] = colors.surface['500'];
					colors['toned'] = colors.surface['600'];
					colors['highlighted'] = colors.surface['900'];
					colors['inverted'] = 'white';
					colors['surface'] = defu(colors.surface, {
						DEFAULT: 'white',
						muted: colors.surface['50'],
						elevated: colors.surface['100'],
						accented: colors.surface['200'],
						inverted: colors.surface['900'],
					});
				}

				if (theme.colors) theme.colors = colors;
			},
		}),
	];
}
