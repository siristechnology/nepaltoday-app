import React from 'react'
import { View } from 'react-native'
import { PlaceholderLine, Placeholder } from '@components'
import styles from './styles'

const Loading = (props) => {
	const { style, imgStyle } = props

	return (
		<View style={[styles.contain, style]} activeOpacity={0.9}>
			<Placeholder style={[styles.loading]}>
				<PlaceholderLine style={[styles.imageWishlist, imgStyle]} />
				<PlaceholderLine style={[styles.marginVertical3]} width={80} />
			</Placeholder>
		</View>
	)
}

export default Loading
