<script lang="ts">
	type Props = {
		props?: Array<{
			name: string;
			type: string;
			bindable?: true;
			default?: string;
			description: string;
		}>;
		types?: Array<{
			label: string;
			items: Array<{
				name: string;
				type: string;
				description: string;
			}>;
		}>;
		snippets?: Array<{
			name: string;
			props?: string;
			description: string;
		}>;
		ui?: Array<{
			name: string;
			class: string;
			attrs: string[];
		}>;
	};

	let { props: props_list, types, snippets, ui }: Props = $props();
</script>

<h2>API References</h2>

{#if props_list}
	<h3>Props</h3>

	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each props_list as item, idx (idx)}
				<tr>
					<td>
						<code>{item.name}</code>
						{#if item.bindable}
							<span class="text-primary text-xs border border-primary px-1 font-medium"
								>$bindable</span
							>
						{/if}
					</td>
					<td>
						<code>{item.type}</code>
					</td>
					<td>
						{item.description}

						Default:
						{#if item.default}
							<code>{item.default}</code>
						{:else}
							---
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

{#if types}
	{#each types as t, idx (idx)}
		<h3>{t.label}</h3>

		<table>
			<thead>
				<tr>
					<th>Prop</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{#each t.items as item, idx (idx)}
					<tr>
						<td>
							<code>{item.name}</code>
						</td>
						<td>
							<code>{item.type}</code>
						</td>
						<td>
							{item.description}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/each}
{/if}

{#if snippets}
	<h3>Snippets</h3>

	<table>
		<thead>
			<tr>
				<th>Snippet</th>
				<th>Props</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each snippets as item, idx (idx)}
				<tr>
					<td>
						<code>{item.name}</code>
					</td>
					<td>
						{#if item.props}
							<code>{item.props}</code>
						{:else}
							---
						{/if}
					</td>
					<td>
						{item.description}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

{#if ui}
	<h3>UI</h3>

	<table>
		<thead>
			<tr>
				<th>Key</th>
				<th>Class</th>
				<th>Data attrs</th>
			</tr>
		</thead>
		<tbody>
			{#each ui as item, idx (idx)}
				<tr>
					<td>
						<code>{item.name}</code>
					</td>
					<td>
						<code>{item.class}</code>
					</td>
					<td>
						<div class="inline-flex gap-2 flex-wrap">
							{#each item.attrs as attr (attr)}
								<code>{attr}</code>
							{/each}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	code {
		@apply px-1;
	}
</style>
