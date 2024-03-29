import { StyleSheet } from 'react-native'
import * as Utils from '@utils'
import { BaseColor } from '@config'

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 20,
		paddingRight: 8,
		paddingVertical: 8,
	},
	contain: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	contentRate: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
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
		width: 80,
		height: 80,
		borderRadius: 8,
	},
	icon: {
		color: BaseColor.grayColor,
	},
	thumb: {
		width: Utils.scaleWithPixel(50),
		height: Utils.scaleWithPixel(50),
		borderRadius: 40,
		marginRight: 5,
	},
	btnAction: {
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
