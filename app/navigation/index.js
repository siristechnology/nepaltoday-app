import React, { useEffect, useRef } from 'react'
import { useTheme } from '@config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import PushNotification from 'react-native-push-notification'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import { getReadArticles, clearOldArticles } from '../services/asyncStorageService'
import readArticlesService from '../services/readArticles.service'
import notificationHandler from '../services/notification-handler'
import MainScreens from './MainScreens'
const RootStack = createStackNavigator()

const Navigator = () => {
	const { theme } = useTheme()
	const navigationRef = useRef(null)

	const onNotificationClicked = (notif) => {
		if (notif?.data?._id && notif.foreground === false) {
			navigationRef.current.navigate('PostDetailLive', { articleId: notif.data._id })
		}
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			const configureNotification = async () => {
				PushNotification.configure({
					onRegister: onRegister,
					onNotification: onNotificationClicked,
				})
			}

			const addReadArticles = async () => {
				const readArticles = await getReadArticles()
				auth().currentUser && readArticlesService.saveReadArticle(auth().currentUser.uid, readArticles)
				clearOldArticles()
			}

			configureNotification().then(() => {
				addReadArticles()
			})
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	return (
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
	)
}

const onRegister = (token) => {
	signInAnonymously().then(() => notificationHandler.register(auth().currentUser, token.token))
}

const signInAnonymously = () => {
	return auth()
		.signInAnonymously()
		.then(() => {
			console.log('User signed in anonymously')
		})
		.catch((error) => {
			crashlytics().recordError(error)
		})
}

export default Navigator
