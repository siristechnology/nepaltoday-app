module.exports = {
	env: {
		production: {
			plugins: ['transform-remove-console'],
		},
	},
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blacklist: null,
				whitelist: null,
				safe: false,
				allowlist: ['SERVER_URL', 'WEATHER_API_APPID', 'API_LOG_LEVEL'],
			},
		],
	],
}
