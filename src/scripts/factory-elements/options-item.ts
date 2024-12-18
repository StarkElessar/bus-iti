import { type MaskItem } from '../types';
import { FLAGS_POSITION } from '../model/flags-position';

interface OptionsItemRenderProps {
	value: MaskItem;
	onClick: (data: MaskItem) => void;
	isActive: boolean;
}

export const getOptionsItem = ({ value, onClick, isActive }: OptionsItemRenderProps) => {
	const item = document.createElement('li');

	item.className = `ipn__options-item ${isActive ? 'ipn__options-item_active' : ''}`;
	item.dataset.phonemaskCountryCode = value.code;
	item.title = value.country;
	item.innerHTML = `
		<span class="ipn__options-flag" style="background-position: ${FLAGS_POSITION[value.code]}"></span>
		<span class="ipn__options-name">${value.country}</span>
		<span class="ipn__options-code">${value.prefix}</span>
	`;
	item.onclick = () => onClick(value);

	return item;
};
