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

export type PluginOptions = {
	transitions?: boolean;
	colors?: string[];
	primary?: string;
	neutral?: string;
	/**
	 * Use the UnoCSS vite plugin
	 * @default true
	 */
	unocss?: boolean;
	/**
	 * Use the UnoCSS web fonts plugin
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

export function unocss(options: Required<PluginOptions>) {
	const _opts: PluginOptions = defu(options, {
		primary: 'orange',
		neutral: 'neutral',
		fonts: {
			fonts: {
				sans: 'Public Sans'
			}
		}
	});

	return uno_plugin({
		presets: [presetWind3({}), presetWebFonts(_opts.fonts), presetIcons()],
		transformers: [transformerVariantGroup(), transformerCompileClass(), transformerDirectives()],
		extendTheme: (theme) => {
			theme.colors.secondary = theme.colors[_opts.neutral!];
			theme.colors.primary = theme.colors[_opts.primary!];
		}
	});
}
