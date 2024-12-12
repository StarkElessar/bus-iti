export interface BusItiOptions {
	initialCountry: Country;
}

export interface MaskValue {
	mask: string;
	placeholder: string;
	code: Country;
	country: string;
	prefix: string;
}


export const enum Country {
	RU = 'ru',
	BY = 'by',
	UA = 'ua',
	KZ = 'kz',
	CN = 'cn',
	CA = 'ca',
	BG = 'bg',
}
