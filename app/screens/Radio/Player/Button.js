import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from '@config'
import styles from './styles'

const PlayerButton = ({ name, onAction }) => {
	const { colors } = useTheme()

	return (
		<TouchableHighlight
			onPress={onAction}
			activeOpacity={0.6}
			underlayColor={colors.border}
			style={[styles.btnAction]}
		>
			<View style={[styles.btnAction]}>
				<Icon name={name} size={30} style={styles.icon} />
			</View>
		</TouchableHighlight>
	)
}

export default PlayerButton
