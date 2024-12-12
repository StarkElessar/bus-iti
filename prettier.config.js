export default {
	tabWidth: 4,
	overrides: [
		{
			files: ['.ts'],
			options: {
				trailingComma: 'es5',
				semi: true,
				singleQuote: true,
			},
		},
		{
			files: ['.scss'],
			options: {
				singleQuote: false,
			},
		},
	],
};
