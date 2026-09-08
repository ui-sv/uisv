export interface UseRafFnCallbackArguments {
	/**
	 * Time elapsed between this and the last frame.
	 */
	delta: number;

	/**
	 * Time elapsed since the creation of the web page. See {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#the_time_origin Time origin}.
	 */
	timestamp: DOMHighResTimeStamp;
}

export interface UseRafFnOptions {
	/**
	 * Start the requestAnimationFrame loop immediately on creation
	 *
	 * @default true
	 */
	immediate?: boolean;
	/**
	 * The maximum frame per second to execute the function.
	 * Set to `-1` to disable the limit.
	 *
	 * @default -1
	 */
	fpslimit?: number;
	/**
	 * After the requestAnimationFrame loop executed once, it will be automatically stopped.
	 *
	 * @default false
	 */
	once?: boolean;
}

/**
 * Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
 *
 * @see https://vueuse.org/useRafFn
 * @param fn
 * @param options
 */
export function useRafFn(
	fn: (args: UseRafFnCallbackArguments) => void,
	options: UseRafFnOptions = {}
) {
	const { immediate = true, fpslimit = -1, once = false } = options;

	let is_active = $state(false);
	const interval_limit = $derived.by(() => {
		return fpslimit ? 1000 / fpslimit : null;
	});
	let previousFrameTimestamp = 0;
	let rafId: null | number = null;

	function loop(timestamp: DOMHighResTimeStamp) {
		if (!is_active || !window) return;

		if (!previousFrameTimestamp) previousFrameTimestamp = timestamp;

		const delta = timestamp - previousFrameTimestamp;

		if (interval_limit && delta < interval_limit) {
			rafId = window.requestAnimationFrame(loop);
			return;
		}

		previousFrameTimestamp = timestamp;
		fn({ delta, timestamp });
		if (once) {
			is_active = false;
			rafId = null;
			return;
		}
		rafId = window.requestAnimationFrame(loop);
	}

	function resume() {
		if (!is_active && window) {
			is_active = true;
			previousFrameTimestamp = 0;
			rafId = window.requestAnimationFrame(loop);
		}
	}

	function pause() {
		is_active = false;
		if (rafId != null && window) {
			window.cancelAnimationFrame(rafId);
			rafId = null;
		}
	}

	if (immediate) resume();

	return {
		is_active,
		pause,
		resume
	};
}
