import type { Snippet, Component } from 'svelte';
import { createTV } from 'tailwind-variants';

export const tv = createTV({});

/**
 * Checks if a value is a Svelte snippet
 * @param v - The value to check (should be Snippet | Component)
 * @returns true if the value is a snippet, false otherwise
 */
export const isSnippet = (v: unknown): v is Snippet => {
	return typeof v === 'object' && v !== null && '$$render' in v;
};

/**
 * Checks if a value is a Svelte component
 * @param v - The value to check (should be Snippet | Component)
 * @returns true if the value is a component, false otherwise
 */
export const isComponent = (v: unknown): v is Component => {
	return typeof v === 'function' || (typeof v === 'object' && v !== null && !('$$render' in v));
};
