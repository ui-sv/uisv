<script lang="ts">
	import { Markdown } from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import { page } from '$app/state';
	import type { Plugin } from 'svelte-exmarkdown/types';

	const plugins: Plugin[] = [gfmPlugin()];
</script>

<Markdown md={page.data.md} {plugins} />
