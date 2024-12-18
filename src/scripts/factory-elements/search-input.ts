import type { MaskItem, MaskListMap } from '../types';

type OnSearchCallback = (data: MaskItem[]) => void;

export class SearchInput {
	private readonly _searchElement: HTMLInputElement;
	private readonly _maskDataList: MaskItem[];
	private _searchEvents: OnSearchCallback[] = [];

	constructor(maskData: MaskListMap) {
		this._maskDataList = Object.values(maskData);
		this._searchElement = document.createElement('input');

		this._searchElement.type = 'text';
		this._searchElement.placeholder = 'Страна или код страны'
		this._searchElement.className = 'ipn__options-search';

		this._searchElement.oninput = (event) => {
			const target = event.target as HTMLInputElement;
			const value = target.value.toLowerCase().trim();

			const data = this.maskDataList.filter(({ prefix, country }) =>
				country.toLowerCase().includes(value) || prefix.includes(value));

			this._searchEvents.forEach(callback => callback(data));
		};
	}

	public onSearch(callback: OnSearchCallback) {
		this._searchEvents.push(callback);
	}

	public get searchElement() {
		return this._searchElement;
	}

	public get maskDataList(): MaskItem[] {
		return this._maskDataList;
	}
}
