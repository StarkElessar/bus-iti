export const listOptionsLoader = () => {
	const div = document.createElement('div');

	div.classList.add('bus-iti__options-wrap');
	div.innerHTML = `
		<div class="bus-iti__options-loader">
			Загрузка стран..
		</div>
	`;

	return div;
};
