import { type MaskItem } from '../types';
import { FLAGS_POSITION } from '../model/flags-position';

interface OptionsItemRenderProps {
	value: MaskItem;
	onClick: (data: MaskItem) => void;
	isActive: boolean;
}

export const getOptionsItem = ({ value, onClick, isActive }: OptionsItemRenderProps) => {
	const item = document.createElement('li');

	item.className = `bus-iti__options-item ${isActive ? 'bus-iti__options-item_active' : ''}`;
	item.dataset.phonemaskCountryCode = value.code;
	item.title = value.country;
	item.innerHTML = `
		<span class="bus-iti__options-flag" style="background-position: ${FLAGS_POSITION[value.code]}"></span>
		<span class="bus-iti__options-name">${value.country}</span>
		<span class="bus-iti__options-code">${value.prefix}</span>
	`;
	item.onclick = () => onClick(value);

	return item;
};
