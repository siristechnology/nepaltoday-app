import { persistor, store } from 'app/store'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'
import GraphqlClient from './graphql/graphql-client'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import notificationHandler from './services/notification-handler'
import { getReadArticles, clearOldArticles } from './services/asyncStorageService'
import readArticlesService from './services/readArticles.service'
import * as Utils from '@utils'
console.disableYellowBox = true
Utils.setupLayoutAnimation()

const NTApp = () => {
	const [loading, setLoading] = useState(false)
	const [clicked, setClicked] = useState(false)
	const [article, setArticle] = useState({})

	const onRegister = (token) => {
		signInAnonymously().then(() => notificationHandler.register(auth().currentUser, token.token))
	}

	const onNotif = (notif) => {
		if (notif.data && notif.data._id && notif.foreground === false) {
			setLoading(true)
			notificationHandler
				.handleNotificationClick(notif.data._id)
				.then((res) => {
					setArticle(res.data.getArticle)
					setClicked(true)
					setLoading(false)
				})
				.catch((err) => {
					crashlytics().recordError(err)
					setLoading(false)
				})
		} else if (notif.data && notif.data.notifType === 'corona' && notif.foreground === false) {
			setLoading(true)
			setClicked(true)
			setLoading(false)
		}
	}

	useEffect(() => {
		const configureNotification = async () => {
			PushNotification.configure({
				onRegister: onRegister,
				onNotification: onNotif,
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
	}, [])

	return (
		<ApolloProvider client={GraphqlClient}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider>
						<App />
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
		</ApolloProvider>
	)
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

export default NTApp
