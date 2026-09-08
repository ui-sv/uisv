import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import uisv from './src/lib/vite.ts';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import autolink from 'rehype-autolink-headings';

const highlighter = await createHighlighter({
	themes: ['one-dark-pro', 'one-light'],
	langs: ['svelte', 'sh'],
});

export default defineConfig({
	plugins: [
		uisv({
			unocss: {
				theme: {
					colors: {
						svelte: '#FF3E00',
					},
				},
			},
			fonts: {
				families: {
					sans: {
						name: 'Geist',
						weights: [400, 500, 600, 700, 800],
					},
					mono: {
						name: 'Geist Mono',
						weights: [400, 500],
					},
				},
			},
		}),
		sveltekit({
			extensions: ['.md', '.svelte'],
			alias: {
				$site: './src/site',
				$velite: './.velite',
				content: './.content-collections/generated',
			},
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes({ filename }) {
					return filename.split(/[/\\]/).includes('node_modules') ? undefined : true;
				},
				warningFilter(warning) {
					if (['state_referenced_locally'].includes(warning.code)) return false;
					return true;
				},
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			preprocess: [
				mdsvex({
					rehypePlugins: [
						() => {
							const link = autolink();
							return (tree) => link(tree as Parameters<typeof link>['0']);
						},
					],
					extensions: ['.md'],
					highlight: {
						async highlighter(code, lang) {
							const html = highlighter.codeToHtml(code, {
								lang: lang || 'text',
								themes: {
									dark: 'one-dark-pro',
									light: 'one-light',
								},
							});

							return `{@html \`${escapeSvelte(html)}\` }`;
						},
					},
				}),
			],
		}),
	],
});
