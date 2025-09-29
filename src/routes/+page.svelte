<script lang="ts">
	import { Badge, type BadgeProps, type PropColor } from '$lib/index.js';
	import { pascalCase } from 'scule';

	const BUTTON_COLORS: PropColor[] = [
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error'
	];

	const BUTTON_VARIANTS = ['solid', 'outline', 'soft', 'subtle'];

	let button_label = $state('Button');
	let button_variant = $state<BadgeProps['variant']>('solid');
	let button_size = $state<BadgeProps['size']>('md');
	let button_icon = $state('i-lucide:rocket');
</script>

<div class="space-y-4 p-4">
	<h1>base</h1>
	<div>
		<Badge>Button</Badge>
	</div>
	<h1>label</h1>
	<div>
		<div>
			<input bind:value={button_label} type="text" placeholder="button's label" />
		</div>

		<Badge label={button_label} />
	</div>

	<h1>color & variant</h1>

	<div>
		<div>
			<select bind:value={button_variant}>
				{#each BUTTON_VARIANTS as variant (variant)}
					<option value={variant}>{variant}</option>
				{/each}
			</select>
		</div>

		{@render badges({
			variant: button_variant
		})}
	</div>

	<h1>Size</h1>

	<div>
		<div>
			<select bind:value={button_size}>
				{#each ['xs', 'sm', 'md', 'lg', 'xl'] as size (size)}
					<option value={size}>{size}</option>
				{/each}
			</select>
		</div>

		{@render badges({
			size: button_size,
			variant: button_variant
		})}
	</div>

	<h1>Icon</h1>

	{@render badges({
		icon: button_icon,
		size: button_size,
		variant: button_variant
	})}

	{@render badges({
		icon: button_icon,
		size: button_size,
		variant: button_variant,
		trailingicon: true
	})}

	<h1>Icon only</h1>

	{@render badges({ icon: button_icon, size: button_size, variant: button_variant }, true)}
</div>

{#snippet badges(props: BadgeProps, notext?: boolean)}
	<div class="flex gap-1">
		{#each BUTTON_COLORS as color (color)}
			<Badge {...props} {color} label={!notext ? pascalCase(color) : undefined} />
		{/each}
	</div>
{/snippet}
