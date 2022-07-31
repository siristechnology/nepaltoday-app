import Image from '@components/Image'
import Text from '@components/Text'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import Loading from './Loading'
import { getRelativeTime } from '../../../helper/time'

const NewsList = (props) => {
	const { article, style, onPress, loading } = props
	if (loading || !article) {
		return <Loading style={style} />
	}
	return (
		<TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
			<Image source={{ uri: article.imageLink }} style={styles.image} />
			<View
				style={{
					paddingHorizontal: 10,
					flex: 1,
					paddingVertical: 5,
				}}
			>
				<Text light footnote semibold grayColor>
					{getRelativeTime(article.createdDate)}
				</Text>
				<Text headline semibold numberOfLines={2} style={styles.marginVertical5}>
					{article.title}
				</Text>
				<Text caption1 light grayColor>
					{article.source.name}
				</Text>
				<View style={styles.contentRate} />
			</View>
		</TouchableOpacity>
	)
}

NewsList.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	image: PropTypes.node.isRequired,
	onPress: PropTypes.func,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	date: PropTypes.string,
}

NewsList.defaultProps = {
	style: {},
	onPress: () => {},
	title: '',
	subtitle: '',
	date: '',
}

export default NewsList
