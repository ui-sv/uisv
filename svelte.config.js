import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['one-dark-pro', 'one-light'],
	langs: ['svelte', 'typescript'],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			layout: './src/internal/layout.svelte',
			extensions: ['.md'],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
							themes: {
								light: 'one-light',
								dark: 'one-dark-pro',
							},
						}),
					);
					return `{@html \`${html}\` }`;
				},
			},
		}),
	],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$internal: './src/internal',
		},
	},
	compilerOptions: {
		warningFilter: ({ code }) => code !== 'state_referenced_locally',
	},
};

export default config;
