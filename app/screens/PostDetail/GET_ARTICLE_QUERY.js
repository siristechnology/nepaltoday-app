import gql from 'graphql-tag'

const GET_ARTICLE_QUERY = gql`
	query articleQuery($_id: String!) {
		getArticle(_id: $_id) {
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
			source {
				_id
				name
				logoLink
			}
		}
	}
`

export default GET_ARTICLE_QUERY
