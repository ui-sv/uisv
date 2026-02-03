import { glob, readFile } from 'node:fs/promises';
import { exists } from 'files';
import { resolve } from 'node:path';

export async function load({ url }) {
	for await (const entry of glob('**/*.md', { cwd: 'src/content' })) {
		let normalized = entry.replace(/(index\.md|.md)$/, '');
		if (normalized.endsWith('/')) normalized = normalized.slice(0, -1);

		if (`/${normalized}` !== url.pathname) continue;

		let path = resolve(import.meta.dirname, '../../content', normalized + '.md');
		if (!(await exists(path))) path = path.replace(/\.md$/, '/index.md');

		if (!exists(path)) return;

		return {
			md: await readFile(path, 'utf8'),
		};
	}
}
