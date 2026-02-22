<script module lang="ts">
	import type { ButtonProps, PropColor, PropSize, PropVariant } from '$lib/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { ClassNameValue } from 'tailwind-merge';

	export type InputNumberProps = Omit<SvelteHTMLElements['input'], 'size'> & {
		value?: number;
		placeholder?: string;
		color?: PropColor;
		variant?: Omit<PropVariant, 'solid'>;
		size?: PropSize;
		highlight?: boolean;
		fixed?: boolean;
		orientation?: 'vertical' | 'horizontal';
		increment?: boolean | Omit<ButtonProps, 'href'>;
		decrement?: boolean | Omit<ButtonProps, 'href'>;
		autofocus?: boolean | number;
		min?: number;
		max?: number;
		step?: number;
		stepsnapping?: number;
		disabled?: boolean;
		required?: boolean;
		id?: string;
		name?: string;
		format?: Intl.NumberFormatOptions;
		wheelchange?: boolean;
		invertwheelchange?: boolean;
		focusonchange?: boolean;
		autocomplete?: 'on' | 'off' | string;
		ui?: {
			root?: ClassNameValue;
			base?: ClassNameValue;
			increment?: ClassNameValue;
			decrement?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		value = $bindable(),
		placeholder,
		color = 'primary',
		variant = 'outline',
		size = 'md',
		highlight,
		fixed,
		orientation = 'horizontal',
		increment = true,
		decrement = true,
		autofocus,
		min,
		max,
		step,
		stepsnapping,
		disabled,
		required,
		format,
		wheelchange = true,
		invertwheelchange,
		focusonchange,
		autocomplete,
		ui = {},
		...rest
	}: InputNumberProps = $props();
</script>

<div>
	<input type="type" inputmode="decimal" {autocomplete} autocorrect="off" spellcheck="false" />
</div>
