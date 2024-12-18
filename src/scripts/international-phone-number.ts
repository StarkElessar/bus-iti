import { type InputMask } from 'imask';
import type { InternationalPhoneMaskOptions, MaskItem, CountryCode } from './types';
import { maskList } from './model/mask-list';
import { CODE_COUNTRY } from './model/code-country';
import { ButtonSelect } from './factory-elements/button-select';
import { listOptionsLoader } from './factory-elements/list-options-loader';
import { SearchInput } from './factory-elements/search-input';
import { emptyData } from './factory-elements/empty-data';

const initialOptions: InternationalPhoneMaskOptions = {
	initialCountry: CODE_COUNTRY.UA,
	lazy: true,
	maskLoaderText: 'Loading...',
};

const CLASS_NAMES = <const> {
	wrapper: 'ipn',
	input: 'ipn__input',
	optionsWrapper: 'ipn__options-wrap',
	listItems: 'ipn__options-list',
	selectedItem: 'ipn__options-item_active',
	visibleOptions: 'ipn-visible-options',
	loadingIMask: 'ipn-loading',
}

export class InternationalPhoneNumber {
	private _IMask: typeof import('imask') | null = null;
	private _instanceMask: InputMask | null = null;

	private _currentCode: CountryCode;

	private readonly _options: InternationalPhoneMaskOptions;
	private readonly _input: HTMLInputElement;
	private readonly _wrapper: HTMLDivElement;
	private readonly _buttonSelect: ButtonSelect;
	private readonly _listOptions: HTMLDivElement;
	private readonly _searchInput: SearchInput;

	constructor(inputId: string, options: Partial<InternationalPhoneMaskOptions> = {}) {
		this._options = Object.assign(initialOptions, options);
		this._currentCode = this._options.initialCountry;
		this._input = document.getElementById(inputId) as HTMLInputElement;
		this._wrapper = document.createElement('div');
		this._listOptions = document.createElement('div');
		this._buttonSelect = new ButtonSelect(maskList[this._currentCode]);
		this._searchInput = new SearchInput(maskList);

		this.init();
	}

	private init() {
		const { mask, code } = maskList[this._currentCode];

		this._input.parentNode!.insertBefore(this._wrapper, this._input);
		this._input.type = 'tel';
		this._input.className = CLASS_NAMES.input;
		this._input.placeholder = mask;
		this._input.dataset.phonemask = mask;
		this._input.dataset.countryCode = code;

		this._input.addEventListener('focus', this.initMask);
		this._input.addEventListener('change', this.onChangeInputHandle);

		this._wrapper.classList.add(CLASS_NAMES.wrapper);
		this._wrapper.append(this._buttonSelect.buttonSelect, this._input);

		this._buttonSelect.onClick(this.toggleOptions);
		this._searchInput.onSearch(this.searchAndScrollTop);
	}

	private async openOptions() {
		const search = this._searchInput.searchElement;

		if (!this._listOptions.children.length) {
			const loader = listOptionsLoader();

			this._wrapper.append(loader);
			this._listOptions.classList.add(CLASS_NAMES.optionsWrapper);
			this._listOptions.innerHTML = `<ul class="${CLASS_NAMES.listItems}"></ul>`;
			this._listOptions.prepend(search);
			await this.renderListOptions(this._searchInput.maskDataList);
			loader.remove();
		}
		else if (search.value) {
			search.value = '';
			await this.renderListOptions(this._searchInput.maskDataList);
		}

		this._wrapper.append(this._listOptions);
		this.scrollToSelected();
		search.focus();
	}

	private scrollToSelected() {
		const { selectedItem } = CLASS_NAMES;
		this._listOptions.querySelector(`.${selectedItem}`)?.classList.remove(selectedItem);
		this._listOptions.querySelector(`[data-phonemask-country-code=${this._currentCode}]`)?.classList.add(selectedItem);
		this._listOptions.querySelector(`.${selectedItem}`)?.scrollIntoView()
	}

	private searchAndScrollTop = (data: MaskItem[]) => {
		this.renderListOptions(data).then(() => {
			this._listOptions.querySelector(`.${CLASS_NAMES.listItems}`)
			    ?.scrollTo({ top: 0, behavior: 'smooth' });
		});
	};

	private renderListOptions = async (data: MaskItem[]) => {
		try {
			const { getOptionsItem } = await import('./factory-elements/options-item');
			const optionsFragment = document.createDocumentFragment();

			if (data.length) {
				data.forEach(maskItem => {
					optionsFragment.append(getOptionsItem({
						value: maskItem,
						onClick: this.onSelectCountry,
						isActive: maskItem.code === this._currentCode
					}));
				});
			}
			else {
				optionsFragment.append(emptyData());
			}

			this._listOptions.querySelector(`.${CLASS_NAMES.listItems}`)!.replaceChildren(optionsFragment);
		}
		catch (error) {
			console.error('Произошла ошибка при отрисовки списка стран', error);
		}
	}

	private closeOptions() {
		this._wrapper.classList.remove(CLASS_NAMES.visibleOptions);
		this._listOptions.remove();
	}

	private onChangeInputHandle = () => {
		this._input.dataset.value = maskList[this._currentCode].prefix + this._instanceMask?.unmaskedValue;
		this._input.toggleAttribute('data-invalid-phonemask', !this.isComplete);
	};

	private initMask = async () => {
		if (!this._IMask) {
			try {
				this._wrapper.classList.add(CLASS_NAMES.loadingIMask);
				this._input.value = this._options.maskLoaderText;
				this._IMask ??= await import('imask');
			}
			finally {
				this._wrapper.classList.remove(CLASS_NAMES.loadingIMask);
				this._input.value = '';
			}
		}

		if (this._IMask) {
			this._instanceMask?.destroy();
			this._instanceMask = this._IMask.default(this._input, {
				mask: maskList[this._currentCode].mask,
				lazy: this._options.lazy,
				definitions: { '9': /[0-9]/ }
			});

			if (!this._options.lazy) {
				const { setCursor } = await import('./utils/set-cursor');
				setCursor(this._input);
			}
			this.closeOptions();
		}
	};

	private toggleOptions = () => {
		if (this.visibleOptions) {
			this.closeOptions();
			document.removeEventListener('mousedown', this.handleOutsideClick);
		}
		else {
			this._wrapper.classList.add(CLASS_NAMES.visibleOptions);
			this.openOptions();
			document.addEventListener('mousedown', this.handleOutsideClick);
		}
	};

	private onSelectCountry = (currentValue: MaskItem) => {
		const { code, mask } = currentValue;

		this._buttonSelect.currentValue = currentValue;
		this._currentCode = code;

		this._input.value = '';
		this._input.placeholder = mask;
		this._input.dataset.value = '';
		this._input.dataset.phonemask = mask;
		this._input.dataset.countryCode = code;
		this._input.focus();
	};

	private handleOutsideClick = (event: MouseEvent) => {
		if (this._wrapper.contains(event.target as Node)) return;
		document.removeEventListener('mousedown', this.handleOutsideClick);
		this.closeOptions();
	};

	public get visibleOptions() {
		return this._wrapper.classList.contains(CLASS_NAMES.visibleOptions);
	}

	public get isComplete() {
		return this._instanceMask?.masked.isComplete;
	}
}
