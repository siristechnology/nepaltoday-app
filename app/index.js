import { persistor, store } from 'app/store'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import PushNotification from 'react-native-push-notification'
import { useApolloClient } from './graphql/graphql-client'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import notificationHandler from './services/notification-handler'
import { getReadArticles, clearOldArticles } from './services/asyncStorageService'
import readArticlesService from './services/readArticles.service'
import * as Utils from '@utils'
import { Text } from 'react-native'
console.disableYellowBox = true
Utils.setupLayoutAnimation()
const startTrace = Utils.getStartTrace()

const NTApp = () => {
	const [loading, setLoading] = useState(false)
	const [clicked, setClicked] = useState(false)
	const [article, setArticle] = useState({})
	const { client } = useApolloClient()

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
		const timer = setTimeout(() => {
			const configureNotification = async () => {
				PushNotification.configure({
					onRegister: onRegister,
					onNotification: onNotif,
				})
			}

			const addReadArticles = async () => {
				const readArticles = await getReadArticles()
				auth().currentUser && readArticlesService.saveReadArticle(client, auth().currentUser.uid, readArticles)
				clearOldArticles()
			}

			configureNotification().then(() => {
				addReadArticles()
			})
		}, 10000)

		return () => clearTimeout(timer)
	}, [])

	if (!client) {
		return <Text>Initializing app...</Text>
	}

	return (
		<ApolloProvider client={client}>
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
			startTrace.putAttribute('user', auth().currentUser.uid)
			startTrace.putMetric('user_sign_in', new Date())
			console.log('User signed in anonymously')
		})
		.catch((error) => {
			crashlytics().recordError(error)
		})
}

export default NTApp
