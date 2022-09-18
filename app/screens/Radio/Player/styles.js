import { StyleSheet } from 'react-native'
import * as Utils from '@utils'
import { BaseColor } from '@config'

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 8,
		paddingVertical: 8,
		backgroundColor: BaseColor.lightGrayColor,
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
	imageStation: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	playerBtns: {
		flexDirection: 'row',
		marginLeft: 10,
		alignItems: 'center',
	},
	icon: {
		color: BaseColor.kashmir,
	},
	btnAction: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Utils.scaleWithPixel(10),
		margin: Utils.scaleWithPixel(2),
		minWidth: Utils.scaleWithPixel(20),
	},
})
