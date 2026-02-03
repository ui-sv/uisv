<script module lang="ts">
	import { ColorTranslator } from 'colortranslator';
	import { tv } from 'tailwind-variants';

	export type ColorPickerProps = {
		throttle?: number;
		disabled?: boolean;
		value?: string;
		format?: 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	};
</script>

<script lang="ts">
	let {
		throttle = 50,
		disabled,
		value = $bindable('#FFF'),
		format = 'hex',
		size = 'md',
	}: ColorPickerProps = $props();

	const translated = $derived(new ColorTranslator(value));

	const classes = $derived(
		tv({
			slots: {
				root: '',
				picker: '',
				select: '',
				track: '',
				thumb: '',
			},
			variants: {
				size: {
					xs: {},
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
			},
		})({ size }),
	);
</script>

<!-- linear-gradient(0deg,red,#f0f 17%,#00f 33%,#0ff,#0f0 67%,#ff0 83%,red) -->
<div></div>
