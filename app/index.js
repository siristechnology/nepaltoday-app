import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import SplashScreen from 'react-native-splash-screen'
import { DarkModeProvider, useDarkMode } from 'react-native-dark-mode'
import store from './store'
import GraphqlClient from './graphql/graphql-client'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Utils from '@utils'
import { Platform, StatusBar } from 'react-native'

console.disableYellowBox = true
Utils.setupLayoutAnimation()

const NTApp = () => {
	const isDarkMode = useDarkMode()

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
			<SafeAreaProvider>
				<ReduxProvider store={store}>
					<DarkModeProvider>
						<App />
					</DarkModeProvider>
				</ReduxProvider>
			</SafeAreaProvider>
		</ApolloProvider>
	)
}

export default NTApp
