<script>
	import { COLORS } from '$internal/index.js';
	import { Badge, Card } from '$lib/index.js';
	import { pascalCase } from 'scule';

	const BUTTON_VARIANTS = ['solid', 'outline', 'soft', 'subtle'];

	let button_label = $state('Button');
	let button_variant = $state('solid');
	let button_size = $state('md');
	let button_icon = $state('i-lucide:rocket');
</script>

<Card variant="outline" ui={{ base: "" }}>
  what
</Card>
