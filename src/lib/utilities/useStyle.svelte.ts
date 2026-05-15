import { extract, type MaybeGetter } from 'runed';

let uisv_usestyle_id = 0;
/**
 * Inject reactive style element in head.
 * @param css string
 */
export function useStyle(css: MaybeGetter<string>) {
	const id = `uisv_styletag_${++uisv_usestyle_id}`;
	let el = $state<HTMLStyleElement>();

	$effect(() => {
		if (!el) {
			el = (document.getElementById(id) || document.createElement('style')) as HTMLStyleElement;

			if (!el.isConnected) {
				el.id = id;
				document.head.appendChild(el);
			}
		}

		el.textContent = extract(css);
	});

	return { id };
}
