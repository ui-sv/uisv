<script module lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { Component } from 'svelte';
	import { useStyle, isComponent } from '$lib/index.js';
	import { useDebounce, watch } from 'runed';

	export type IconProps = SvelteHTMLElements['base'] & {
		name?: string | Component;
	};
</script>

<script lang="ts">
	let { class: classname, name, ...rest }: IconProps = $props();

	let css_style = $state('');

	const resolve = useDebounce(async () => {
		if (typeof name !== 'string') return (css_style = '');
		const url = `https://api.iconify.design/${name.replace(/^i-/, '')}.svg`;
		let svg = await (await fetch(url)).text();
		if (svg === 'Not found') return (css_style = '');
		css_style = `@layer components {
		.${name.replace(':', '\\:')} {
   	        --un-icon: url('data:image/svg+xml,${svg
							.replaceAll(/[\n\t]/g, '')
							.replaceAll('"', '\"')
							.replace('<', '%3C')
							.replace('>', '%3E')}');
    		width: 1em;
    		height: 1em;
    		background-color: currentColor;
    		-webkit-mask-image: var(--un-icon);
    		mask-image: var(--un-icon);
    		-webkit-mask-repeat: no-repeat;
    		mask-repeat: no-repeat;
    		-webkit-mask-size: 100% 100%;
    		mask-size: 100% 100%;
     	}
	}`;
	});

	watch(
		() => name,
		() => {
			resolve();
		},
	);

	$inspect(isComponent(name), name);

	useStyle(() => css_style);
</script>

{#if typeof name === 'string' && name.length > 0}
	<div {...rest as SvelteHTMLElements['div']} class={[name, classname]}></div>
{:else if isComponent(name)}
	{@const Icon = name}
	<Icon {...rest} class={classname} />
{/if}
