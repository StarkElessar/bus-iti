import { type MaskValue } from '../types';

type OptionsItemCallback = (data: MaskValue) => void;

export class OptionsItem {
	private _selectMaskEvent: OptionsItemCallback[] = [];

	render(value: MaskValue) {
		const item = document.createElement('li');

		item.classList.add('bus-iti__options-item');
		item.dataset.phonemaskCountryCode = value.code;
		item.innerHTML = `
			<span class="bus-iti__options-flag bus-iti__options-flag_${value.code}"></span>
			<span class="bus-iti__options-name">${value.country}</span>
			<span class="bus-iti__options-code">${value.prefix}</span>
		`;
		item.onclick = () => {
			this._selectMaskEvent.forEach(callback => callback(value));
		};

		return item;
	}

	public onClick(callback: OptionsItemCallback) {
		this._selectMaskEvent.push(callback);
	}
}
