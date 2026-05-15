import { toast as _toast } from 'svelte-sonner';
import Toast from './toast.svelte';
import { type Component } from 'svelte';
import { type ButtonProps, type ProgressProps, type PropColor } from '$lib/index.js';
import type { ClassValue } from 'tailwind-variants';

export type ToastOptions = {
	title: string;
	description?: string;
	icon?: string | Component;
	color?: PropColor;
	close?: boolean | ButtonProps;
	actions?: ButtonProps[];
	progress?: boolean | ProgressProps;
	duration?: number;
	orientation?: 'vertical' | 'horizontal';
	id?: string;
	ui?: {
		base?: ClassValue;
		wrapper?: ClassValue;
		title?: ClassValue;
		description?: ClassValue;
		icon?: ClassValue;
		avatar?: ClassValue;
		avatarSize?: ClassValue;
		actions?: ClassValue;
		progress?: ClassValue;
		close?: ClassValue;
	};
};

export function toast(opts: ToastOptions) {
	return _toast.custom(Toast, {
		componentProps: opts,
		id: opts.id,
	});
}

export const useToasts = _toast.getActiveToasts;
