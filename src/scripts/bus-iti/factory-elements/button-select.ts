import { Country } from '../types';

type ButtonSelectCallback = () => void;

export class ButtonSelect {
	private readonly _button: HTMLButtonElement;
	private readonly _flagElement: HTMLSpanElement;
	private _currentCode: Country;
	private _toggleVisibleOptionsEvent: ButtonSelectCallback[] = [];

	constructor(initialCode: Country) {
		this._currentCode = initialCode;
		this._button = document.createElement('button');

		this._button.type = 'button';
		this._button.classList.add('bus-iti__select');
		this._button.innerHTML = `
			<span class="bus-iti__select-flag" data-phonemask-flag="${this._currentCode}"></span>
			<span class="bus-iti__select-arrow"></span>
		`;

		this._button.onclick = () => {
			this._toggleVisibleOptionsEvent.forEach(cb => cb());
		};

		this._flagElement = this._button.querySelector('.bus-iti__select-flag')!;
	}

	public get buttonSelect() {
		return this._button;
	}

	public set currentCode(value: Country) {
		if (this._currentCode !== value) {
			this._currentCode = value;
			this._flagElement.setAttribute('data-phonemask-flag', value);
		}
	}

	public onClick(callback: () => void) {
		this._toggleVisibleOptionsEvent.push(callback);
	}
}
