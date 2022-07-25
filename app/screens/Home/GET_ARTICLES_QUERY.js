import gql from 'graphql-tag'
import auth from '@react-native-firebase/auth'

// , nid: "${(auth().currentUser && auth().currentUser.uid) || ''}"

const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
		getArticles(
			criteria: {
				categories: [
					{ name: "headline", count: 10 }
					{ name: "politics", count: 10 }
					{ name: "entertainment", count: 10 }
					{ name: "news", count: 5 }
					{ name: "business", count: 5 }
					{ name: "sports", count: 10 }
					{ name: "social", count: 5 }
				]
			}
		) {
			_id
			title
			shortDescription
			content
			link
			imageLink
			createdDate
			modifiedDate
			category
			tags
			totalWeight
			source {
				name
				logoLink
			}
			likes {
				nid
			}
			dislikes {
				nid
			}
		}
	}
`

export default GET_ARTICLES_QUERY
