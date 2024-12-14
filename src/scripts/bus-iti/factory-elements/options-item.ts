import { type MaskValue } from '../types';

interface OptionsItemRenderProps {
	value: MaskValue;
	onClick: (data: MaskValue) => void;
}

export const getOptionsItem = ({ value, onClick }: OptionsItemRenderProps) => {
	const item = document.createElement('li');

	item.classList.add('bus-iti__options-item');
	item.dataset.phonemaskCountryCode = value.code;
	item.innerHTML = `
			<span class="bus-iti__options-flag bus-iti__options-flag_${value.code}"></span>
			<span class="bus-iti__options-name">${value.country}</span>
			<span class="bus-iti__options-code">${value.prefix}</span>
		`;
	item.onclick = () => onClick(value);

	return item;
};
