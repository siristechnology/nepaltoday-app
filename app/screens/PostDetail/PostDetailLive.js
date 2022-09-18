import React from 'react'
import { useQuery } from '@apollo/client'
import PostDetail from './index'
import GET_ARTICLE_QUERY from './GET_ARTICLE_QUERY'
import Loading from './Loading'

const PostDetailLive = ({ navigation, route }) => {
	const articleId = route?.params?.articleId

	const { loading, data } = useQuery(GET_ARTICLE_QUERY, {
		variables: { _id: articleId },
	})

	if (loading) return <Loading />
	else return <PostDetail article={data.getArticle} navigation={navigation} />
}

export default PostDetailLive
