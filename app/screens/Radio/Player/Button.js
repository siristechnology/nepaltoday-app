import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from '@config'
import styles from './styles'
import { ActivityIndicator } from 'react-native-paper'

const PlayerButton = ({ name, onAction, style, isloading }) => {
	const { colors } = useTheme()

	return (
		<TouchableHighlight
			onPress={onAction}
			activeOpacity={0.6}
			underlayColor={colors.border}
			style={[styles.btnAction]}
		>
			<View style={[styles.btnAction]}>
				{!isloading && <Icon name={name} size={35} style={[styles.icon, style]} />}
				{isloading && <ActivityIndicator color={styles.icon.color} size={35} style={[styles.icon, style]} />}
			</View>
		</TouchableHighlight>
	)
}

export default PlayerButton
