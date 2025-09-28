import uno_plugin from 'unocss/vite';
import {
	transformerVariantGroup,
	transformerCompileClass,
	transformerDirectives,
	presetWind3,
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
};

// export function uisv(opts: PluginOptions = {}) {
// 	const _opts: PluginOptions = defu(opts, {
// 		primary: 'orange',
// 		neutral: 'neutral',
// 		unocss: true,
// 		transitions: true
// 	} as PluginOptions);

// 	const uisv_plugin: Plugin = {
// 		name: 'vite-plugin-uisv',
// 		enforce: 'pre',
// 		async load(id) {
// 			if (id === '$theme/button') {
// 				return `export default ${JSON.stringify(useButtonTheme(_opts))}`;
// 			}
// 		},
// 		resolveId(source) {
// 			if (source.startsWith('$theme')) return source;
// 		}
// 	};

// 	return [
// 		uisv_plugin,
// 		_opts.unocss! &&
// 			unocss({
// 				presets: [preset_wind3, presetWebFonts(_opts.fonts)],
// 				transformers: [
// 					transformerVariantGroup(),
// 					transformerCompileClass(),
// 					transformerDirectives()
// 				],
// 				extendTheme: (theme, config) => {
// 					console.log(theme, config);
// 				}
// 			})
// 	];
// }

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

	return uno_plugin({
		theme: {},
		presets: [presetWind3({}), presetWebFonts(_opts.fonts), presetIcons()],
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
	});
}
