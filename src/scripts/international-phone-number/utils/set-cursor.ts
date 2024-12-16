export const setCursor = (input: HTMLInputElement) => {
	if (input.value) {
		/**
		 * Находим индекс последнего "заполненного" символа маски
		 * */
		const lastMaskIndex = input.value.indexOf('_');
		/**
		 * Если подчеркивание найдено, ставим курсор перед ним, иначе в конец строки
		 *  */
		const position = lastMaskIndex !== -1 ? lastMaskIndex : input.value.length;
		input.setSelectionRange(position, position);
	}
}
