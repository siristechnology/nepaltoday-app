import gql from 'graphql-tag'
// import auth from '@react-native-firebase/auth'

// getMyFm(nid: "${auth().currentUser?.uid}") {

const GET_FM_QUERY = gql`
	query fmScreenQuery {
		getMyFm {
			allFm {
				id
				title
				url
				artist
				artwork
				province
			}
			favoriteFm {
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
