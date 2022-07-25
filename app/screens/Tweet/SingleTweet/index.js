import Icon from '@components/Icon'
import Image from '@components/Image'
import Text from '@components/Text'
import { Images, useTheme } from '@config'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import styles from './styles'
import Loading from './Loading'

const SingleTweet = (props) => {
	const { style, onPress, image, title, subtitle, onAction, loading } = props
	const { colors } = useTheme()

	if (loading) {
		return <Loading style={style} />
	}

	return (
		<TouchableHighlight
			style={[styles.container, style]}
			activeOpacity={0.6}
			underlayColor={colors.border}
			onPress={onPress}
		>
			<View style={styles.contain} onPress={onPress} activeOpacity={0.9}>
				<Image source={image} style={styles.thumb} />
				<View style={{ paddingLeft: 10, flex: 1 }}>
					<Text headline semibold numberOfLines={1} style={styles.marginVertical3}>
						{'SaugatKansakar'}
					</Text>
					<Text numberOfLines={3} style={styles.marginVertical3}>
						{title}
					</Text>
					<Text footnote grayColor style={styles.marginVertical3}>
						{'१ घण्टा अघि'}
					</Text>

					<View style={styles.contentRate} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

SingleTweet.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	item: PropTypes.object,
	onPress: PropTypes.func,
	onAction: PropTypes.func,
	type: PropTypes.string,
}

SingleTweet.defaultProps = {
	style: {},
	onPress: () => {},
	onAction: () => {},
	image: Images.news,
	title: 'Hilton San Francisco',
	subtitle: 'Arts & Humanities',
}

export default SingleTweet
