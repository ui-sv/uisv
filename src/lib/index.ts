export * from './components/index.js';
export * from './utils/common.js';
export * from './utils/element.svelte.js';

export type PropColor = 'primary' | 'surface' | 'info' | 'success' | 'warning' | 'error';
export const COLORS: PropColor[] = ['primary', 'surface', 'info', 'success', 'warning', 'error'];
