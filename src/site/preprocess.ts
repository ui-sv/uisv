import type { PreprocessorGroup } from 'svelte/compiler';
import { createHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';
// import dedent from 'dedent';

const BACKTICKS = '```';

// const html = highlighter.codeToHtml(code, {
// 								lang: lang || 'text',
// 								themes: {
// 									dark: 'one-dark-pro',
// 									light: 'one-light',
// 								},
// 							});

// 							return `{@html \`${escapeSvelte(html)}\` }`;

export type PreprocessOptions = {
	/**
	 * @default [".svelte"]
	 */
	extensions?: string[];
};

export default (options: PreprocessOptions = {}): PreprocessorGroup => {
	const { extensions = ['.svelte'] } = options;

	const highlighter = createHighlighter({
		themes: ['one-dark-pro', 'one-light'],
		langs: ['svelte', 'sh'],
	});

	return {
		name: 'uisv-md',
		async markup({ content, filename }) {
			if (!extensions.some((v) => filename?.endsWith(v))) return;

			let index = content.indexOf(BACKTICKS);

			while (index > -1) {
				const eol_idx = content.indexOf('\n', index);
				const lang = content.slice(index + 3, eol_idx);
				const ending_ticks = content.indexOf(BACKTICKS, index + 3);
				const code_block = content.slice(eol_idx + 1, ending_ticks);

				const highlighted_code = (await highlighter).codeToHtml(dedent(code_block).trim(), {
					lang,
					themes: {
						dark: 'one-dark-pro',
						light: 'one-light',
					},
				});

				content = `${content.slice(0, index)} {@html \`${escapeSvelte(highlighted_code)}\`}${content.slice(ending_ticks + 3)}`;

				index = content.indexOf(BACKTICKS, highlighted_code.length);
			}

			return { code: content };
		},
	};
};

function dedent(source: string) {
	const lines = source.split('\n');
	let indexes = Number.POSITIVE_INFINITY;

	lines.forEach((line) => {
		const idx = line.search(/\S/);
		if (indexes > idx && idx > -1) indexes = idx;
	});

	return lines.map((line) => line.slice(indexes)).join('\n');
}
