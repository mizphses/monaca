const path = require('path')

module.exports = () => ({
	entry: ['src/app.js', 'src/stylesheets/app.scss'],
	host: '0.0.0.0',
	html: {
		template: './src/index.html'
	},
	postcss: [
		// Add more postcss plugins here
		// by default we have autoprefixer pre added
		require('postcss-flexbugs-fixes')
	],
	webpack(config) {
		config.resolve.modules.push(path.resolve('src'))

		return config
	}
})