import {
	transformerCompileClass,
	transformerVariantGroup,
	transformerDirectives,
	presetWebFonts,
	presetWind4,
	presetIcons,
	type UserConfig as UnocssConfig,
	type PresetOrFactoryAwaitable,
	type SourceCodeTransformer,
} from 'unocss';
import type { PresetWind4Options } from 'unocss/preset-wind4';
import type { WebFontsOptions } from 'unocss/preset-web-fonts';
import unocss_plugin from 'unocss/vite';
import type { Plugin } from 'vite';
import type { IconsOptions } from 'unocss/preset-icons';
import { defu } from 'defu';
import { getColors } from 'theme-colors';

type UnoCSSColorConfig = Record<
	string,
	ColorObject | string | Record<string, ColorObject | string>
>;

type ColorObject = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

export type KilobitsOptions = {
	colors?: Record<string, string | ColorObject> | false;
	wind4?: PresetWind4Options | false;
	fonts?: (Omit<WebFontsOptions, 'fonts'> & { families?: WebFontsOptions['fonts'] }) | false;
	icons?: IconsOptions | false;
	compile_class?: Parameters<typeof transformerCompileClass>['0'] | false;
	variant_group?: Parameters<typeof transformerVariantGroup>['0'] | false;
	directives?: Parameters<typeof transformerDirectives>['0'] | false;
	unocss?: Omit<UnocssConfig, 'presets' | 'transformers'> | false;
};

export default function (options: KilobitsOptions = {}): Plugin[] {
	const plugins: Plugin[] = [];

	if (options.unocss !== false) {
		const presets: PresetOrFactoryAwaitable[] = [];
		const transformers: SourceCodeTransformer[] = [];

		if (options.fonts !== false) {
			presets.push(
				presetWebFonts(
					defu(
						<WebFontsOptions>{
							...options.fonts,
							fonts: options.fonts?.families,
						},
						{
							fonts: { sans: 'Public Sans' },
						},
					),
				),
			);
		}

		if (options.wind4 !== false) {
			presets.push(
				presetWind4(defu(options.wind4, <PresetWind4Options>{ preflights: { reset: true } })),
			);
		}

		if (options.icons !== false) {
			presets.push(
				presetIcons(defu(options.icons, <IconsOptions>{ warn: false, autoInstall: true })),
			);
		}

		if (options.variant_group !== false) {
			transformers.push(transformerVariantGroup(options.variant_group));
		}

		if (options.compile_class !== false) {
			transformers.push(transformerCompileClass(options.compile_class));
		}

		if (options.directives !== false) {
			transformers.push(transformerDirectives(options.directives));
		}

		const config = defu(options.unocss, <UnocssConfig>{
			presets,
			transformers,
			preflights: [],
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
		});

		if (options.colors !== false) {
			const resolved_colors = defu(options.colors, <Record<string, string | ColorObject>>{
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
			});

			config.preflights?.push({
				getCSS({ theme }) {
					if (!('colors' in theme) || typeof theme.colors !== 'object') return;
					const colors = theme.colors as UnoCSSColorConfig;
					if (typeof colors.surface !== 'object') return '';

					return `
						body {
						  background-color: var(--colors-label-inverted);
						}

            .dark {
              --colors-label-base: ${colors.surface['200']};
      				--colors-label-dimmed: ${colors.surface['500']};
      				--colors-label-muted: ${colors.surface['400']};
      				--colors-label-toned: ${colors.surface['300']};
      				--colors-label-highlighted: white;
      				--colors-label-inverted: ${colors.surface['900']};

      				--colors-surface-base: ${colors.surface['900']};
      				--colors-surface-muted: ${colors.surface['800']};
      				--colors-surface-elevated: ${colors.surface['800']};
      				--colors-surface-accented: ${colors.surface['700']};
      				--colors-surface-inverted: white;
            }`;
				},
			});

			config.extendTheme = (theme: object) => {
				if (!('colors' in theme) || typeof theme.colors !== 'object') return;
				const colors = theme.colors as UnoCSSColorConfig;

				for (const [color, value] of Object.entries(resolved_colors)) {
					if (typeof value !== 'string') {
						colors[color] = value;
						continue;
					}
					const in_theme = colors[value];
					colors[color] = in_theme ? in_theme : getColors(value);
				}

				if (typeof colors.surface !== 'object') colors.surface = {};
				if (typeof colors.label === 'object') colors.label = {};

				colors.label = defu(colors.label, {
					base: colors.surface['700'],
					dimmed: colors.surface['400'],
					muted: colors.surface['500'],
					toned: colors.surface['600'],
					highlighted: colors.surface['900'],
					inverted: 'white',
				});

				colors['surface'] = defu(colors.surface, {
					base: 'white',
					muted: colors.surface['50'],
					elevated: colors.surface['100'],
					accented: colors.surface['200'],
					inverted: colors.surface['900'],
				});

				if (theme.colors) theme.colors = colors;
			};
		}

		plugins.push(...unocss_plugin(config));
	}

	return plugins;
}
