<script lang="ts">
	const sections: {
		label: '';
		items: Array<{
			href: '';
			label: '';
			desc: '';
		}>;
	}[] = [{ label: '', items: [] }];
</script>

<h1>Components</h1>

<p>
	Build beautiful, accessible, and responsive user interfaces with 125+ Svelte components powered by
	UnoCSS and Bits UI.
</p>

{#each sections as section (section.label)}
	<div></div>
{/each}
