<script lang="ts">
	type Props = {
		props?: Array<{
			name: string;
			type: string;
			bindable?: false;
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
						<p>
							<code>{item.name}</code>
							{#if item.bindable}
								<span class="text-primary text-xs">$bindable</span>
							{/if}
						</p>
					</td>
					<td>
						<p>
							<code>{item.type}</code>
						</p>
					</td>
					<td>
						{item.description}

						<p>
							Default:
							{#if item.default}
								<code>{item.default}</code>
							{:else}
								---
							{/if}
						</p>
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
							<p>
								<code>{item.name}</code>
							</p>
						</td>
						<td>
							<p>
								<code>{item.type}</code>
							</p>
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
						<p>
							<code>{item.name}</code>
						</p>
					</td>
					<td>
						<p>
							{#if item.props}
								<code>{item.props}</code>
							{:else}
								---
							{/if}
						</p>
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
			{#each props_list as item, idx (idx)}
				<tr>
					<td>
						<p>
							<code>{item.name}</code>
							{#if item.bindable}
								<span class="text-primary text-xs">$bindable</span>
							{/if}
						</p>
					</td>
					<td>
						<p>
							<code>{item.type}</code>
						</p>
					</td>
					<td>
						{item.description}

						<p>
							Default:
							{#if item.default}
								<code>{item.default}</code>
							{:else}
								---
							{/if}
						</p>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
