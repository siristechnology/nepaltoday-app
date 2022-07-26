import gql from 'graphql-tag'

const GET_ARTICLES_QUERY = gql`
	query headlineScreenQuery {
		getArticles(
			criteria: {
				categories: [
					{ name: "news", count: 10 }
					{ name: "entertainment", count: 10 }
					{ name: "sports", count: 10 }
					{ name: "cartoon", count: 5 }
					{ name: "business", count: 10 }
					{ name: "social", count: 10 }
					{ name: "health", count: 10 }
					{ name: "technology", count: 10 }
					{ name: "share", count: 10 }
					{ name: "agriculture", count: 10 }
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
		}
	}
`

export default GET_ARTICLES_QUERY
