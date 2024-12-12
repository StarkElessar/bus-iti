export default {
	extends: ['@archoleat/stylelint-config-extended-scss'],
	rules: {
		'plugin/use-defensive-css': [
			true,
			{
				'custom-property-fallbacks': false,
			},
		],
		'declaration-empty-line-before': 'never',
		'selector-no-qualifying-type': null,
		'scss/at-function-named-arguments': null,
		'scss/at-mixin-named-arguments': null,
		'scss/comment-no-loud': null,
		'scss/media-feature-value-dollar-variable': null,
		'plugin/no-low-performance-animation-properties': null,
		'no-unknown-animations': null,
		'scss/no-duplicate-dollar-variables': null,
		'order/properties-order': null,
		'order/order': null,
		'plugin/use-logical-properties-and-values': null,
		'plugin/use-logical-units': null,
		'max-nesting-depth': [
			5,
			{
				ignore: ['blockless-at-rules'],
			},
		],
		'selector-class-pattern': '^[a-z0-9]+(?:[-_][a-z0-9]+)*(?:__?[a-z0-9]+(?:[-_][a-z0-9]+)*)*$'
	},
};
