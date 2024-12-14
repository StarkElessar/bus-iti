import type { MaskValue } from '../types';

type ButtonSelectCallback = () => void;

export class ButtonSelect {
	private readonly _button: HTMLButtonElement;
	private readonly _flagElement: HTMLSpanElement;
	private readonly _prefixElement: HTMLSpanElement;
	private _currentValue: MaskValue;
	private _toggleVisibleOptionsEvent: ButtonSelectCallback[] = [];

	constructor(value: MaskValue) {
		this._currentValue = value;
		this._button = document.createElement('button');

		this._button.type = 'button';
		this._button.classList.add('bus-iti__select');
		this._button.innerHTML = `
			<span class="bus-iti__select-flag" data-phonemask-flag="${this._currentValue.code}"></span>
			<span class="bus-iti__select-arrow"></span>
			<span class="bus-iti__select-prefix">${this._currentValue.prefix}</span>
		`;

		this._button.onclick = () => {
			this._toggleVisibleOptionsEvent.forEach(cb => cb());
		};

		this._flagElement = this._button.querySelector('.bus-iti__select-flag')!;
		this._prefixElement = this._button.querySelector('.bus-iti__select-prefix')!;
	}

	public get buttonSelect() {
		return this._button;
	}

	public set currentValue(value: MaskValue) {
		if (this._currentValue.code !== value.code) {
			this._currentValue = value;
			this._flagElement.setAttribute('data-phonemask-flag', value.code);
			this._prefixElement.textContent = value.prefix;
		}
	}

	public onClick(callback: () => void) {
		this._toggleVisibleOptionsEvent.push(callback);
	}
}
