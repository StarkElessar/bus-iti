export const emptyData = () => {
	const element = document.createElement('li');
	element.className = 'bus-iti__options-item';
	element.textContent = 'Неверный код или страна 😢';
	return element;
};
