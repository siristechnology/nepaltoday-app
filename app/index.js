import { persistor, store } from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from '@apollo/client'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import GraphqlClient from './graphql/graphql-client'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Utils from '@utils'
console.disableYellowBox = true
Utils.setupLayoutAnimation()

const NTApp = () => {
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

export default NTApp
