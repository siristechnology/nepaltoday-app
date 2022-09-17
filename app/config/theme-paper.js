import { MD3LightTheme as DefaultTheme } from 'react-native-paper'

const theme = {
	...DefaultTheme,
	roundness: 2,
	version: 3,
	colors: {
		...DefaultTheme.colors,
		primary: '#3498db',
		secondary: '#f1c40f',
		tertiary: '#a1b2c3',
		primaryDark: '#F90030',
		primaryLight: '#FF5E80',
		accent: '#4A90A4',
		background: 'white',
		card: '#F5F5F5',
		text: '#212121',
		border: '#c7c7cc',
	},
}

export default theme
