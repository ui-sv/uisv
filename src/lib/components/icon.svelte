<script module lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { Component } from 'svelte';
	import { useStyle, isComponent } from '$lib/index.js';

	export type IconProps = SvelteHTMLElements['base'] & {
		name: string | Component;
	};
</script>

<script lang="ts">
	let { class: classname, name, ...rest }: IconProps = $props();

	let css_style = $state('');

	async function resolve() {
		if (typeof name !== 'string') return (css_style = '');
		const url = `https://api.iconify.design/${name.replace(/^i-/, '')}.svg`;
		let svg = await (await fetch(url)).text();
		css_style = `.${name.replace(':', '\\:')} {
	    --un-icon: url('data:image/svg+xml,${svg
				.replaceAll(/[\n\t]/g, '')
				.replaceAll('"', '\"')
				.replace('<', '%3C')
				.replace('>', '%3E')}');
		display: inline-block;
		width: 1em;
		height: 1em;
		background-color: currentColor;
		-webkit-mask-image: var(--un-icon);
		mask-image: var(--un-icon);
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 100% 100%;
		mask-size: 100% 100%;
	}`;
	}

	$effect(() => {
		name;
		resolve();
	});

	useStyle(() => css_style);
</script>

{#if typeof name === 'string' && name.length > 0}
	<div {...rest as SvelteHTMLElements['div']} class={[name, classname]}></div>
{:else if isComponent(name)}
	{@const Icon = name}
	<Icon {...rest} />
{/if}
