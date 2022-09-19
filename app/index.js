import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import theme from './config/theme-paper'
import { ApolloProvider } from '@apollo/client'
import SplashScreen from 'react-native-splash-screen'
import store from './store'
import GraphqlClient from './graphql/graphql-client'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Utils from '@utils'
import { Platform, StatusBar } from 'react-native'

console.disableYellowBox = true
Utils.setupLayoutAnimation()

const NTApp = () => {
	const isDarkMode = false

	useEffect(() => {
		SplashScreen.hide()
	}, [])

	useEffect(() => {
		if (Platform.OS == 'android') {
			StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true)
		}
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true)
	}, [isDarkMode])

	return (
		<ApolloProvider client={GraphqlClient}>
			<PaperProvider theme={theme}>
				<SafeAreaProvider>
					<ReduxProvider store={store}>
						<App />
					</ReduxProvider>
				</SafeAreaProvider>
			</PaperProvider>
		</ApolloProvider>
	)
}

export default NTApp
