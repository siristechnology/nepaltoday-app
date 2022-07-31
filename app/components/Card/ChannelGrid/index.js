import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from '@config'
import { Image, Text } from '@components'
import PropTypes from 'prop-types'
import styles from './styles'
import Loading from './Loading'

const CardChannelGrid = ({ onPress, image, title, loading, style, imgStyle, textStyle }) => {
	const { colors } = useTheme()

	if (loading) {
		return <Loading style={style} />
	}

	return (
		<TouchableOpacity
			style={[styles.contain, style]}
			onPress={onPress}
			activeOpacity={0.9}
			underlayColor={colors.border}
		>
			<>
				<Image source={image} style={[styles.imageWishlist, imgStyle]} />
				<View style={{ paddingHorizontal: 10 }}>
					<Text headline semibold numberOfLines={1} style={[styles.marginVertical3, textStyle]}>
						{title}
					</Text>

					<View style={styles.contentRate} />
				</View>
			</>
		</TouchableOpacity>
	)
}

CardChannelGrid.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	item: PropTypes.object,
	onPress: PropTypes.func,
	onPressTag: PropTypes.func,
	type: PropTypes.string,
}

CardChannelGrid.defaultProps = {
	style: {},
	onPress: () => {},
	onPressTag: () => {},
	title: 'CNN',
}

export default CardChannelGrid
