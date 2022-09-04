import { useEffect, useState } from 'react'
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import crashlytics from '@react-native-firebase/crashlytics'
import { SERVER_URL, API_LOG_LEVEL } from '@env'

export const useApolloClient = () => {
	const [client, setClient] = useState()

	useEffect(() => {
		async function init() {
			const errorLink = onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors) {
					graphQLErrors.forEach((error) => crashlytics().recordError(new Error(error.message)))
				}

				if (networkError) {
					crashlytics().recordError(new Error(networkError.message))
				}
			})

			const retryLink = new RetryLink({
				delay: {
					initial: 300,
					max: Infinity,
					jitter: true,
				},
				attempts: {
					max: 5,
					retryIf: (error, _operation) => !!error,
				},
			})

			const httpLink = new HttpLink({
				uri: SERVER_URL,
				fetch: (...pl) => {
					if (API_LOG_LEVEL != 'debug' && API_LOG_LEVEL != 'info') return fetch(...pl)
					const [_, options] = pl
					const body = JSON.parse(options.body)
					console.log('📡:', body.operationName)
					API_LOG_LEVEL == 'debug' && console.log(body.query)
					Object.keys(body.variables).length > 0 && console.log(body.variables)
					return fetch(...pl)
				},
			})

			const cache = new InMemoryCache()
			await persistCache({
				cache,
				debounce: 100,
				storage: new AsyncStorageWrapper(AsyncStorage),
			})

			setClient(
				new ApolloClient({
					link: from([errorLink, retryLink, httpLink]),
					cache,
				}),
			)
		}

		init()
	}, [])

	return {
		client,
	}
}
