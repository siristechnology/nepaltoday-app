import React, { useState } from 'react'
import { View } from 'react-native'
import { BaseColor, BaseStyle, Typography, useTheme } from '@config'
import { TextInput } from '@components'

const SearchBox = () => {
	const { colors } = useTheme()
	const [search, setSearch] = useState('')

	const onChangeText = (text) => {
		setSearch(text)
		// setCategory(text ? category.filter((item) => item.title.includes(text)) : CategoryData)
	}

	return (
		<View style={BaseStyle.container}>
			<TextInput
				style={[BaseStyle.textInput, Typography.body1]}
				onChangeText={onChangeText}
				autoCorrect={false}
				placeholder={'Search FM'}
				placeholderTextColor={BaseColor.grayColor}
				value={search}
				selectionColor={colors.primary}
				onSubmitEditing={() => {}}
			/>
		</View>
	)
}

export default SearchBox
