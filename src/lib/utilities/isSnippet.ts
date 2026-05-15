import type { Snippet } from 'svelte';

/**
 * Checks if a value is a Svelte snippet
 * @param v - The value to check
 * @returns true if the value is a snippet, false otherwise
 */
export function isSnippet<T>(v: unknown): v is Snippet<[T]> {
	return typeof v === 'function' && !('render' in v);
}
