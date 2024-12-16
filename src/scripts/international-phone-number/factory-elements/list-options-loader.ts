export const listOptionsLoader = () => {
	const div = document.createElement('div');

	div.classList.add('ipn__options-wrap');
	div.innerHTML = `
		<div class="ipn__options-loader">
			Загрузка стран..
		</div>
	`;

	return div;
};
