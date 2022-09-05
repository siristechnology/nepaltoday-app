import { ApolloClient, HttpLink, from } from '@apollo/client'
import { InvalidationPolicyCache } from 'apollo-invalidation-policies'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
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

const httpLink = new HttpLink({ uri: SERVER_URL })

const cache = new InvalidationPolicyCache({
	invalidationPolicies: {
		timeToLive: 86400000,
	},
})

const client = new ApolloClient({
	link: from([errorLink, retryLink, httpLink]),
	cache,
})

export default client
