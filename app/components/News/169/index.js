import ProfileAuthor from '@components/Profile/Author'
import Text from '@components/Text'
import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import styles from './styles'
import Loading from './Loading'
import { getRelativeTime } from '../../../helper/time'

const News169 = (props) => {
	const { article, style, onPress, loading } = props

	if (loading || !article) {
		return <Loading style={style} />
	}

	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<ImageBackground source={{ uri: article.imageLink }} style={styles.imageBackground} borderRadius={8} />
			<ProfileAuthor
				image={{ uri: article.source.logoLink }}
				name={article.source.name}
				description={getRelativeTime(article.createdDate)}
			/>
			<Text title3 semibold>
				{article.title}
			</Text>
		</TouchableOpacity>
	)
}

News169.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	article: PropTypes.object,
	name: PropTypes.string,
	description: PropTypes.string,
	title: PropTypes.string,
	onPress: PropTypes.func,
}

News169.defaultProps = {
	style: {},
	name: '',
	description: '',
	title: '',
	onPress: () => {},
}

export default News169
