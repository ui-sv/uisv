import type { Component } from 'svelte';

/**
 * Checks if a value is a Svelte component
 * @param v - The value to check
 * @returns true if the value is a component, false otherwise
 */
export function isComponent(v: unknown): v is Component {
	if (typeof document !== 'undefined') return typeof v === 'function';
	return typeof v === 'function' && 'render' in v;
}
