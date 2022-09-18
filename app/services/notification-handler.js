import client from '../graphql/graphql-client'
import gql from 'graphql-tag'
import * as RNLocalize from 'react-native-localize'
import crashlytics from '@react-native-firebase/crashlytics'
import moment from 'moment'

class NotificationHandler {
	register = (user, token) => {
		this.storeFcmToken(user, token)
	}

	storeFcmToken = async (user, token) => {
		client
			.mutate({
				mutation: STORE_FCM_MUTATION,
				variables: {
					input: {
						nid: user.uid,
						fcmToken: token,
						countryCode: RNLocalize.getCountry(),
						timeZone: RNLocalize.getTimeZone(),
						modifiedDate: moment.utc(),
					},
				},
			})
			.catch((reason) => crashlytics().recordError(reason))
	}
}

const STORE_FCM_MUTATION = gql`
	mutation storeFcmMutation($input: StoreFcmInput!) {
		storeFcmToken(input: $input) {
			success
		}
	}
`

export default new NotificationHandler()
