import { type ClassValue } from 'tailwind-variants';

export const defineVariants = <T extends VariantsConfig>(config: T) => config;

export type VariantsConfig = { [k: string]: Variant };

export type Variant = {
	extend?: Variant;
	slots?: {
		[k: string]: ClassValue;
	};
	variants?: {
		[k: string]: {
			[k: string]: ClassValue | { [k: string]: ClassValue };
		};
	};
	compoundVariants?: Array<{ [k: string]: ClassValue | { [k: string]: ClassValue } }>;
	compoundSlots?: Array<{ [k: string]: ClassValue }>;
	defaultVariants?: { [k: string]: unknown };
};
