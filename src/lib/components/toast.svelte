<script module lang="ts">
    import {
        Button,
        Icon,
        Progress,
        type ButtonProps,
        type ProgressProps,
        type ToastOptions,
        useRafFn,
    } from "../index.js";
    import { boxWith } from "svelte-toolbelt";
    import { tv } from "tailwind-variants";
    import defu from "defu";
    import { onDestroy, onMount } from "svelte";
    import { getAppContext } from "../contexts.js";

    export type ToastProps = ToastOptions & {
        closeToast?: () => void;
        expanded?: boolean;
    };
</script>

<script lang="ts">
    let {
        title,
        description,
        closeToast = () => {},
        actions = [],
        close = true,
        color = "primary",
        duration = getAppContext().toaster.duration!,
        icon,
        progress = true,
        orientation = "vertical",
        expanded = false,
        ui = {},
    }: ToastProps = $props();

    let remaining = $state(boxWith(() => duration).current);

    const { pause, resume } = useRafFn(
        ({ delta }) => (remaining = remaining - delta),
    );

    const variants = $derived(
        tv({
            slots: {
                base: "overflow-hidden bg-surface-base shadow-lg rounded-lg border border-surface-accented space-y-4",
                wrapper: "m-4 flex gap-4",
                title: "text-sm font-medium text-labe-highlighted",
                description: "text-sm text-label-muted",
                icon: "shrink-0 size-5",
                avatar: "shrink-0",
                avatarSize: "2xl",
                actions: "flex gap-1.5 shrink-0 m-4",
                progress: "",
                close: "p-0",
            },
            variants: {
                color: {
                    primary: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                        icon: "text-primary",
                    },
                    surface: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted",
                        icon: "text-highlighted",
                    },
                    success: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success",
                        icon: "text-success",
                    },
                    info: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info",
                        icon: "text-info",
                    },
                    warning: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning",
                        icon: "text-warning",
                    },
                    error: {
                        base: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error",
                        icon: "text-error",
                    },
                },
                orientation: {
                    horizontal: {
                        base: "items-center",
                        actions: "items-center",
                    },
                    vertical: {
                        base: "items-start",
                        actions: "items-start mt-2.5",
                    },
                },
                title: {
                    true: {
                        description: "mt-1",
                    },
                },
            },
        })({ color, title: !!title, orientation }),
    );

    $effect(() => {
        if (expanded) pause();
        else resume();
    });

    onMount(resume);
    onDestroy(pause);
</script>

<div class={variants.base({ class: ui.base })}>
    <div class={variants.wrapper({ class: ui.wrapper })}>
        <Icon name={icon} class={variants.icon({ class: ui.icon })} />

        <div>
            <h1 class={variants.title({ class: ui.title })}>
                {title}
            </h1>

            {#if description}
                <p class={variants.description({ class: ui.description })}>
                    {description}
                </p>
            {/if}
        </div>

        {#if orientation === "horizontal"}
            {@render actions_snippet()}
        {/if}

        {#if close}
            <Button
                {...defu(typeof close === "boolean" ? {} : close, <ButtonProps>{
                    icon: getAppContext().icons.close,
                    color: "surface",
                    variant: "link",
                    onclick: closeToast,
                    ui: { base: variants.icon({ class: ui.icon }) },
                })}
            />
        {/if}
    </div>

    {#if orientation === "vertical"}
        {@render actions_snippet()}
    {/if}

    {#if progress}
        <Progress
            max={duration}
            value={remaining}
            {...defu(typeof progress === "object" ? progress : {}, <
                ProgressProps
            >{
                size: "sm",
                ui: { base: variants.progress({ class: ui.progress }) },
            })}
        />
    {/if}
</div>

{#snippet actions_snippet()}
    {#if actions.length > 0}
        <div class={variants.actions({ class: ui.actions })}>
            {#each actions as action, idx (idx)}
                <Button
                    {...defu(action, <ButtonProps>{
                        size: "xs",
                    })}
                />
            {/each}
        </div>
    {/if}
{/snippet}
