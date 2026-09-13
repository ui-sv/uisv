<script lang="ts">
	type Props = {
		items: Array<{
			name: string;
			type: string;
			bindable?: false;
			default?: string;
			description: string;
		}>;
	};

	let { items }: Props = $props();
</script>

<table>
	<thead>
		<tr>
			<th>Prop</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each items as item, idx (idx)}
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
