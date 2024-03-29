import { StyleSheet } from 'react-native'
import * as Utils from '@utils'
import { BaseColor } from '@config'

export default StyleSheet.create({
	contain: {
		alignItems: 'center',
	},
	image: {
		width: Utils.scaleWithPixel(110),
		height: Utils.scaleWithPixel(80),
		borderRadius: 8,
	},
	marginVertical3: {
		marginVertical: 3,
	},
	imageWishlist: {
		width: Utils.scaleWithPixel(100),
		height: Utils.scaleWithPixel(100),
		borderRadius: 8,
	},
	loading: {
		width: Utils.scaleWithPixel(110),
	},
})
