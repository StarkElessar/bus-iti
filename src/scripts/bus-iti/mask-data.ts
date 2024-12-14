import { Country, type MaskValue } from './types';

export const maskData: Record<Country, MaskValue> = {
	[Country.RU]: {
		mask: '(000) 000-00-00',
		placeholder: '(999) 999-99-99',
		code: Country.RU,
		country: 'Россия',
		prefix: '+7',
	},
	[Country.BY]: {
		mask: '(00) 000-00-00',
		placeholder: '(99) 999-99-99',
		code: Country.BY,
		country: 'Беларусь',
		prefix: '+375',
	},
	[Country.UA]: {
		mask: '(00) 000-00-00',
		placeholder: '(99) 999-99-99',
		code: Country.UA,
		country: 'Украина',
		prefix: '+380',
	},
	[Country.KZ]: {
		mask: '(000) 000-00-00',
		placeholder: '(999) 999-99-99',
		code: Country.KZ,
		country: 'Казахстан',
		prefix: '+7',
	},
	[Country.CN]: {
		mask: '(000) 000-00-00',
		placeholder: '(999) 999-99-99',
		code: Country.CN,
		country: 'Китай',
		prefix: '+86',
	},
	[Country.CA]: {
		mask: '(000) 000-00-00',
		placeholder: '(999) 999-99-99',
		code: Country.CA,
		country: 'Канада',
		prefix: '+1',
	},
	[Country.BG]: {
		mask: '(000) 000-000',
		placeholder: '(999) 999-999',
		code: Country.BG,
		country: 'Болгария',
		prefix: '+359',
	},
};
