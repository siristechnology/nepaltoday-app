import gql from 'graphql-tag'
import auth from '@react-native-firebase/auth'

const GET_FM_QUERY = gql`
	query fmScreenQuery {
		getMyFm(nid: "${auth().currentUser?.uid}") {
			allFm {
				id
				title
				url
				artist
				artwork
				province
			}
		}
	}
`
export default GET_FM_QUERY
