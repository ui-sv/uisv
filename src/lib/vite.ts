import uno_plugin from 'unocss/vite';
import {
	transformerVariantGroup,
	transformerCompileClass,
	transformerDirectives,
	presetWind4,
	presetWebFonts
} from 'unocss';
import { type WebFontsOptions } from '@unocss/preset-web-fonts';
import { presetIcons } from 'unocss';
import { defu } from 'defu';
import type { PropColor } from './types.js';
import { getColors } from 'theme-colors';

export type PluginOptions = {
	/**
	 * Colors as UnoCSS color name, hex color, or UnoCSS theme color object
	 * @example
	 * {
	 *  primary: 'orange',
	 *  secondary: 'neutral',
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
	 * Options for the UnoCSS web fonts plugin
	 */
	fonts?: WebFontsOptions;
	/**
	 * Corner radius for every* component
	 */
	radius?: number;
};

export function uisv(options: Required<PluginOptions>) {
	const _opts: PluginOptions = defu(options, {
		colors: {
			primary: 'orange',
			secondary: 'neutral',
			info: 'blue',
			success: 'green',
			warning: 'yellow',
			error: 'red'
		},
		fonts: {
			fonts: {
				sans: 'Public Sans:400,500,600'
			}
		}
	} as PluginOptions);

	return [
		uno_plugin({
			theme: {
				radius: {
					base: `${_opts.radius || 0.25}rem`
				}
			},
			preflights: [
				{
					getCSS: () => 'body { font-size: var(--font-sans);}'
				}
			],
			presets: [
				presetWind4({
					preflights: {
						reset: true
					}
				}),
				presetWebFonts(_opts.fonts),
				presetIcons()
			],
			transformers: [transformerVariantGroup(), transformerCompileClass(), transformerDirectives()],
			extendTheme: (theme) => {
				for (const [color, value] of Object.entries(_opts.colors!)) {
					if (typeof value !== 'string') {
						theme.colors[color] = value;
						continue;
					}

					const in_theme = theme.colors[value];
					theme.colors[color] = in_theme ? in_theme : getColors(value);
				}
			}
		})
	];
}
