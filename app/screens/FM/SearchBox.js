import React, { useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BaseColor, BaseStyle, Typography, useTheme } from '@config'
import { TextInput } from '@components'

const onChangeText = (text) => {
	setSearch(text)
	setCategory(text ? category.filter((item) => item.title.includes(text)) : CategoryData)
}

const SearchBox = () => {
	const { t } = useTranslation()
	const { colors } = useTheme()
	const [search, setSearch] = useState('')

	return (
		<View style={BaseStyle.container}>
			<TextInput
				style={[BaseStyle.textInput, Typography.body1]}
				onChangeText={onChangeText}
				autoCorrect={false}
				placeholder={t('Search FM')}
				placeholderTextColor={BaseColor.grayColor}
				value={search}
				selectionColor={colors.primary}
				onSubmitEditing={() => {}}
			/>
		</View>
	)
}

export default SearchBox
