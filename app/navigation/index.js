import React, { useEffect, useRef } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { useTheme } from '@config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DarkModeProvider, useDarkMode } from 'react-native-dark-mode'
import MainScreens from './MainScreens'
const RootStack = createStackNavigator()

const Navigator = (props) => {
	const { theme, colors } = useTheme()
	const isDarkMode = useDarkMode()
	const navigationRef = useRef(null)

	useEffect(() => {
		// Config status bar
		if (Platform.OS == 'android') {
			StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true)
		}
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true)
	}, [isDarkMode])

	return (
		<View style={{ flex: 1, position: 'relative' }}>
			<DarkModeProvider>
				<NavigationContainer theme={theme} ref={navigationRef}>
					<RootStack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						{Object.keys(MainScreens).map((name, index) => {
							const { component, options } = MainScreens[name]
							return <RootStack.Screen key={name} name={name} component={component} options={options} />
						})}
					</RootStack.Navigator>
				</NavigationContainer>
			</DarkModeProvider>
		</View>
	)
}

export default Navigator
