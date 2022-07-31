import Text from '@components/Text'
import { useTheme } from '@config'
import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import styles from './styles'
import Loading from './Loading'
import { getRelativeTime } from '../../../helper/time'

const CardSlide = (props) => {
	const { article, style, onPress, loading } = props
	const { colors } = useTheme()
	if (loading && !article) {
		return <Loading style={style} />
	}
	return (
		<TouchableOpacity
			style={[
				styles.container,
				{
					backgroundColor: colors.background,
					borderColor: colors.border,
				},
				style,
			]}
			onPress={onPress}
		>
			<ImageBackground
				source={{ uri: article.imageLink }}
				style={styles.imageBackground}
				borderTopLeftRadius={8}
				borderTopRightRadius={8}
			/>

			<Text body2 style={styles.title} numberOfLines={2}>
				{article.title}
			</Text>
			<Text overline medium grayColor style={styles.description}>
				{getRelativeTime(article.createdDate)}
			</Text>
		</TouchableOpacity>
	)
}

CardSlide.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	image: PropTypes.node.isRequired,
	date: PropTypes.string,
	title: PropTypes.string,
	onPress: PropTypes.func,
}

CardSlide.defaultProps = {
	style: {},
	date: '',
	title: '',
	onPress: () => {},
}

export default CardSlide
