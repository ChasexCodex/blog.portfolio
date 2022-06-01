module.exports = {
	content: [
		'./pages/**/*.tsx',
		'./components/**/*.tsx',
		'./layouts/**/*.tsx',
	],
	theme: {
		extend: {
			fontSize: {
				'2xs': ['0.6rem', { lineHeight: '0.8rem'}],
			},
		},
	},
	plugins: [],
}
