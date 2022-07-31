import React, { useEffect, useRef, useState } from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { BaseSetting, useTheme } from '@config'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { languageSelect } from '@selectors'
import * as Utils from '@utils'
import { DarkModeProvider, useDarkMode } from 'react-native-dark-mode'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import { AllScreens } from './config'
const RootStack = createStackNavigator()
const MainStack = createStackNavigator()

const MainScreens = () => {
	return (
		<MainStack.Navigator
			// initialRouteName="NewsMenu"
			screenOptions={{
				headerShown: false,
			}}
		>
			{Object.keys(AllScreens).map((name, index) => {
				const { component, options } = AllScreens[name]
				return <MainStack.Screen key={name} name={name} component={component} options={options} />
			})}
		</MainStack.Navigator>
	)
}

const Navigator = (props) => {
	const { theme, colors } = useTheme()
	const isDarkMode = useDarkMode()
	const language = useSelector(languageSelect)
	const { navigation } = props
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(true)
	const navigationRef = useRef(null)

	useEffect(() => {
		// Config status bar
		if (Platform.OS == 'android') {
			StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true)
		}
		StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true)
	}, [isDarkMode])

	useEffect(() => {
		SplashScreen.hide()

		const onProcess = async () => {
			Utils.enableExperimental()
			setLoading(false)

			navigationRef?.current?.dispatch(StackActions.replace('NewsMenu'))
			navigationRef?.current?.navigate('NewsMenu')
		}
		// onProcess()
	}, [dispatch, language])

	return (
		<View style={{ flex: 1, position: 'relative' }}>
			<DarkModeProvider>
				<NavigationContainer theme={theme} ref={navigationRef}>
					<RootStack.Navigator
						screenOptions={{
							headerShown: false,
							cardStyle: { backgroundColor: 'transparent' },
							cardOverlayEnabled: false,
							cardStyleInterpolator: ({ current: { progress } }) => ({
								cardStyle: {
									opacity: progress.interpolate({
										inputRange: [0, 0.5, 0.9, 1],
										outputRange: [0, 0.25, 0.7, 1],
									}),
								},
								overlayStyle: {
									opacity: progress.interpolate({
										inputRange: [0, 1],
										outputRange: [0, 0.5],
										extrapolate: 'clamp',
									}),
								},
							}),
						}}
						mode="modal"
					>
						<RootStack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
						{/* {Object.keys(ModalScreens).map((name, index) => {
							const { component, options } = ModalScreens[name]
							return <RootStack.Screen key={name} name={name} component={component} options={options} />
						})} */}
					</RootStack.Navigator>
				</NavigationContainer>
			</DarkModeProvider>
		</View>
	)
}

export default Navigator
