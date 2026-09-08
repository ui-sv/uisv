// import docs from 'content/allDocs.js';
// import { createRawSnippet } from 'svelte';

// export const prerender = true;

// export async function entries() {
// 	return docs.map((v) => ({
// 		slugid: v._meta.path,
// 	}));
// }

// export function load({ params: { slugid } }) {
// 	const doc = docs.find((v) => v._meta.path === slugid);
// 	if (!doc) return;

// 	console.log(doc.content.code);

// 	return { ...doc, md: createRawSnippet(() => ({ render: () => doc.content.code })) };
// }
