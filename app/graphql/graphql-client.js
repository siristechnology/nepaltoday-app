import { ApolloClient, HttpLink, from } from '@apollo/client'
import { InvalidationPolicyCache } from 'apollo-invalidation-policies'
import { onError } from '@apollo/client/link/error'
import crashlytics from '@react-native-firebase/crashlytics'
import { SERVER_URL } from '@env'

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((error) => crashlytics().recordError(new Error(error.message)))
	}

	if (networkError) {
		crashlytics().recordError(new Error(networkError.message))
	}
})

const cache = new InvalidationPolicyCache({
	invalidationPolicies: {
		timeToLive: 86400000,
	},
})

const httpLink = new HttpLink({ uri: SERVER_URL })

const client = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache,
})

export default client
