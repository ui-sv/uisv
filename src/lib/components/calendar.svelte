<script lang="ts" module>
	import type { Component, Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';
	import { type PropColor, isSnippet } from '$lib/index.js';
	import type { ClassNameValue } from 'tailwind-merge';
	import { type DateValue, today } from '$lib/date.js';
	import { Calendar, type CalendarRootProps } from 'bits-ui';

	export type CalendarProps = CalendarRootProps & {
		color?: PropColor;
		variant?: 'solid' | 'outline' | 'soft' | 'subtle';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		ui?: {
			base?: ClassNameValue;
			icon?: ClassNameValue;
		};
	};
</script>

<script lang="ts">
	let {
		type,
		value = $bindable(),
		label,
		trailingicon,
		color = 'primary',
		size = 'md',
		variant = 'solid',
		ui = {},
		children,
	}: CalendarProps = $props();

	const classes = $derived.by(() => {
		return tv({
			slots: { icon: '', base: '' },
			variants: {
				color: {
					primary: '',
					surface: '',
					error: '',
					success: '',
					info: '',
					warning: '',
				},
				variant: {
					link: '',
					solid: '',
					outline: '',
					soft: '',
					subtle: '',
					ghost: '',
				},
				size: {
					xs: {},
					sm: {},
					md: {},
					lg: {},
					xl: {},
				},
			},
			compoundVariants: [],
		})({ variant, size, color });
	});
</script>

<Calendar.Root type={type as typeof type} bind:value>
	{#snippet children({ months, weekdays })}
		<Calendar.Header>
			<Calendar.PrevButton />
			<Calendar.Heading />
			<Calendar.NextButton />
		</Calendar.Header>

		{#each months as month}
			<Calendar.Grid>
				<Calendar.GridHead>
					<Calendar.GridRow>
						{#each weekdays as day, idx (idx)}
							<Calendar.HeadCell>
								{day}
							</Calendar.HeadCell>
						{/each}
					</Calendar.GridRow>
				</Calendar.GridHead>
				<Calendar.GridBody>
					{#each month.weeks as weekDates, wdidx (wdidx)}
						<Calendar.GridRow>
							{#each weekDates as date, didx (didx)}
								<Calendar.Cell {date} month={month.value}>
									<Calendar.Day />
								</Calendar.Cell>
							{/each}
						</Calendar.GridRow>
					{/each}
				</Calendar.GridBody>
			</Calendar.Grid>
		{/each}
	{/snippet}
</Calendar.Root>
