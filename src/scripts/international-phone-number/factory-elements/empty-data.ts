export const emptyData = () => {
	const element = document.createElement('li');
	element.className = 'ipn__options-item';
	element.textContent = 'Неверный код или страна 😢';
	return element;
};
