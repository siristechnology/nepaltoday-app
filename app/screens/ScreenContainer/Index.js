import React, { useCallback } from 'react'
import { useDebounceCallback } from '@react-hook/debounce'
import { useFocusEffect } from '@react-navigation/native'
import { SafeAreaView } from '@components'
import { BaseStyle } from '@config'

const ScreenContainer = (props) => {
	useFocusEffect(
		useDebounceCallback(
			useCallback(() => {
				props.handleRefresh()
			}, [props]),
			10000,
			true,
		),
	)

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			{props.children}
		</SafeAreaView>
	)
}

export default ScreenContainer
