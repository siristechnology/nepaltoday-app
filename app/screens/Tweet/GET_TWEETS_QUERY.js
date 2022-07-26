import gql from 'graphql-tag'

const GET_TWEETS_QUERY = gql`
	query twitterScreenQuery {
		getTweets {
			_id
			text
			name
			tweetId
			handle
			profileImage
			description
			publishedDate
		}
	}
`

export default GET_TWEETS_QUERY
