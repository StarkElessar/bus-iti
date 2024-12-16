import type { CODE_COUNTRY } from './model/code-country';

export interface InternationalPhoneMaskOptions {
	initialCountry: CountryCode;
	lazy: boolean;
	maskLoaderText: string;
}

export type CountryCode = typeof CODE_COUNTRY[keyof typeof CODE_COUNTRY];

export type MaskItem = {
	code: CountryCode;
	country: string;
	prefix: string;
	mask: string;
};

export type MaskListMap = Record<CountryCode, MaskItem>;
