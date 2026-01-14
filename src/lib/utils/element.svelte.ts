import {
	extract,
	useMutationObserver,
	useResizeObserver,
	type MaybeGetter,
	type ElementSizeOptions,
} from 'runed';

/**
 * Returns a reactive value holding the dom rect of `node`s.
 *
 * Accepts an `options` object with the following properties:
 * - `initialSize`: The initial size of the element. Defaults to `{ width: 0, height: 0 }`.
 * - `box`: The box model to use. Can be either `"content-box"` or `"border-box"`. Defaults to `"border-box"`.
 *
 * @returns an array of dom rects.
 */
export function useElementRects(
	nodes: MaybeGetter<HTMLElement[]>,
	options: ElementSizeOptions = {},
) {
	const rects = $state<DOMRect[]>(extract(nodes).map((v) => v.getBoundingClientRect()));

	const elements = $derived(extract(nodes));

	const update = () => {
		if (!elements || elements.length === 0) return;
		elements.forEach((el, idx) => (rects[idx] = el.getBoundingClientRect()));
	};

	$effect(() => {
		const stops: Array<() => void> = [];
		elements.forEach((v) => {
			stops.push(useResizeObserver(() => v, update, { window: options.window }).stop);
			stops.push(
				useMutationObserver(() => v, update, {
					attributeFilter: ['style', 'class'],
					window: options.window,
				}).stop,
			);
		});

		return () => stops.forEach((v) => v());
	});

	return rects;
}
