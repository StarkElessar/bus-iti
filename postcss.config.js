import autoprefixer from 'autoprefixer';
import sortMediaQueries from 'postcss-sort-media-queries';

export default {
	plugins: [
		sortMediaQueries({ sort: 'desktop-first' }),
		autoprefixer(),
	]
};
