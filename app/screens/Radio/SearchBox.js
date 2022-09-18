import React, { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import { BaseColor, BaseStyle, Typography, useTheme } from '@config'
import { TextInput, Button, Text } from '@components'

const SearchBox = ({ search, setSearch }) => {
	const { colors } = useTheme()
	const [isKeyboardVisible, setKeyboardVisible] = useState(false)

	const onChangeText = (text) => {
		setSearch(text)
	}

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardVisible(true)
		})
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardVisible(false)
		})

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	return (
		<View style={[BaseStyle.container, { flexDirection: 'row', alignItems: 'center', paddingBottom: 0 }]}>
			<TextInput
				style={[BaseStyle.textInput, Typography.body1, { flex: 1 }]}
				onChangeText={onChangeText}
				autoCorrect={false}
				placeholder={'Search FM stations'}
				placeholderTextColor={BaseColor.grayColor}
				value={search}
				selectionColor={colors.primary}
				onSubmitEditing={() => {}}
			/>
			{(isKeyboardVisible || search != '') && (
				<Button
					onPress={() => {
						setSearch('')
						Keyboard.dismiss()
					}}
					style={{ height: 30, marginLeft: 20 }}
					outline
				>
					<Text>{'cancel'}</Text>
				</Button>
			)}
		</View>
	)
}

export default SearchBox
