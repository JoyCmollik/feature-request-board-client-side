module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				dark: '#153D31',
				primary: '#30F697',
				secondary: '#153D31',
				light: '#F4F4F4',
				brand: '#D9FFE4',
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active'],
			transform: ['active'],
		},
	},
	plugins: [],
};
