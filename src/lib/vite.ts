import uno_plugin from 'unocss/vite';
import {
	transformerVariantGroup,
	transformerCompileClass,
	transformerDirectives,
	presetWind4,
	presetWebFonts,
	presetIcons,
} from 'unocss';
import { type WebFontsOptions } from '@unocss/preset-web-fonts';
import { defu } from 'defu';
import type { PropColor } from './index.js';
import { getColors } from 'theme-colors';

export type PluginOptions = {
	/**
	 * Colors as UnoCSS color name, hex color, or UnoCSS theme color object
	 * @example
	 * {
	 *  primary: 'orange',
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
			primary: 'orange',
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
		icons: {},
		theme: {
			radius: {
				base: `${options.radius || 0.375}rem`,
			},
		},
	} as PluginOptions);

	return [
		uno_plugin({
			theme: _opts.theme,
			preflights: [
				{
					getCSS: ({ theme }) => `
            body {
              @apply: var(--bg-surface-default);
            }
          `,
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
				if (!theme.colors) theme.colors = {};
				for (const [color, value] of Object.entries(_opts.colors!)) {
					if (typeof value !== 'string') {
						theme.colors[color] = value;
						continue;
					}

					const in_theme = theme.colors[value];
					theme.colors[color] = in_theme ? in_theme : getColors(value);
				}
				if (typeof theme.colors.surface !== 'object') return;
				if (typeof theme.colors.dark !== 'object') theme.colors.dark = {};

				theme.colors = defu(theme.colors, {
					default: theme.colors.surface[700] as string,
					dimmed: theme.colors.surface[400],
					muted: theme.colors.surface[500],
					toned: theme.colors.surface[600],
					highlighted: theme.colors.surface[900],
					inverted: 'white',
					surface: {
						default: 'white',
						muted: theme.colors.surface[50],
						elevated: theme.colors.surface[100],
						accented: theme.colors.surface[200],
						inverted: theme.colors.surface[900],
					},
					dark: {
						default: theme.colors.surface[700] as string,
						dimmed: theme.colors.surface[400],
						muted: theme.colors.surface[500],
						toned: theme.colors.surface[600],
						highlighted: theme.colors.surface[900],
						inverted: 'white',
						surface: {
							default: theme.colors.surface[900],
							muted: theme.colors.surface[800],
							elevated: theme.colors.surface[800],
							accented: theme.colors.surface[700],
							inverted: 'white',
						},
					},
				});
			},
		}),
	];
}
