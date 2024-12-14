import { type InputMask } from 'imask';
import { type BusItiOptions, Country, MaskValue } from './types';
import { maskData } from './mask-data';
import { ButtonSelect } from './factory-elements/button-select';
import { listOptionsLoader } from './factory-elements/list-options-loader';

const initialOptions: BusItiOptions = {
	initialCountry: Country.RU,
	lazy: true,
	maskLoaderText: 'Loading...',
};

export class BusIti {
	private _IMask: typeof import('imask') | null = null;
	private _instanceMask: InputMask | null = null;

	private _currentCode: Country;

	private readonly _options: BusItiOptions;
	private readonly _input: HTMLInputElement;
	private readonly _wrapper: HTMLDivElement;
	private readonly _buttonSelect: ButtonSelect;
	private readonly _listOptions: HTMLDivElement;

	constructor(inputId: string, options: Partial<BusItiOptions> = {}) {
		this._options = Object.assign(initialOptions, options);
		this._currentCode = this._options.initialCountry;
		this._input = document.getElementById(inputId) as HTMLInputElement;
		this._wrapper = document.createElement('div');
		this._listOptions = document.createElement('div');
		this._buttonSelect = new ButtonSelect(maskData[this._currentCode]);

		this.init();
	}

	private init() {
		const { mask, placeholder, code } = maskData[this._currentCode];

		this._input.parentNode!.insertBefore(this._wrapper, this._input);
		this._input.type = 'tel';
		this._input.className = 'bus-iti__input';
		this._input.placeholder = placeholder;
		this._input.dataset.phonemask = mask;
		this._input.dataset.countryCode = code;

		this._input.addEventListener('focus', this.initMask);
		this._input.addEventListener('change', this.onChangeInputHandle);

		this._wrapper.classList.add('bus-iti');
		this._wrapper.append(this._buttonSelect.buttonSelect, this._input);

		this._buttonSelect.onClick(this.toggleOptions);
	}

	private renderList() {
		if (!this._listOptions.children.length) {
			const loader = listOptionsLoader();
			this._wrapper.append(loader);

			import('./factory-elements/options-item').then(m => {
				loader.remove();
				const optionsFragment = document.createDocumentFragment();

				Object.keys(maskData).forEach(key => {
					optionsFragment.append(m.getOptionsItem({
						value: maskData[key as keyof typeof maskData],
						onClick: this.onSelectCountry
					}));
				});

				this._listOptions.classList.add('bus-iti__options-wrap');
				this._listOptions.innerHTML = '<ul class="bus-iti__options-list"></ul>';
				this._listOptions.children[0].append(optionsFragment);
			});
		}

		this._wrapper.append(this._listOptions);
	}

	private closeOptions() {
		this._wrapper.classList.remove('bus-iti-visible-options');
		this._listOptions.remove();
	}

	private onChangeInputHandle = () => {
		this._input.dataset.value = maskData[this._currentCode].prefix + this._instanceMask?.unmaskedValue;
		this._input.toggleAttribute('data-invalid-phonemask', !this.isComplete);
	};

	private initMask = async () => {
		if (!this._IMask) {
			try {
				this._wrapper.classList.add('bus-iti-loading');
				this._input.value = this._options.maskLoaderText;
				this._IMask ??= await import('imask');
			}
			finally {
				this._wrapper.classList.remove('bus-iti-loading');
				this._input.value = '';
			}
		}

		if (this._IMask) {
			this._instanceMask?.destroy();
			this._instanceMask = this._IMask.default(this._input, {
				mask: maskData[this._currentCode].mask,
				lazy: this._options.lazy,
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
			this._wrapper.classList.add('bus-iti-visible-options');
			this.renderList();
			document.addEventListener('mousedown', this.handleOutsideClick);
		}
	};

	private onSelectCountry = (currentValue: MaskValue) => {
		const { code, placeholder, mask  } = currentValue;

		this._buttonSelect.currentValue = currentValue;
		this._currentCode = code;

		this._input.value = '';
		this._input.placeholder = placeholder;
		this._input.dataset.value = '';
		this._input.dataset.phonemask = mask;
		this._input.dataset.countryCode = code;
		this._input.focus();
	};

	private handleOutsideClick = (event: MouseEvent) => {
		document.removeEventListener('mousedown', this.handleOutsideClick);
		if (this._wrapper.contains(event.target as Node)) return;
		this.closeOptions();
	};

	public get visibleOptions() {
		return this._wrapper.classList.contains('bus-iti-visible-options');
	}

	public get isComplete() {
		return this._instanceMask?.masked.isComplete;
	}
}
