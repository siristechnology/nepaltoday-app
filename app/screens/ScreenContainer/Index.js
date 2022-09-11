import React, { useCallback, useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { useDispatch } from 'react-redux'
import { useDebounceCallback } from '@react-hook/debounce'
import { useFocusEffect } from '@react-navigation/native'
import { setAppState } from './appStateSlice'
import { SafeAreaView } from '@components'
import { BaseStyle } from '@config'

const ScreenContainer = (props) => {
	const dispatch = useDispatch()
	const appState = useRef(AppState.currentState)
	const { children, handleRefresh } = props

	useFocusEffect(
		useDebounceCallback(
			useCallback(() => {
				handleRefresh()
			}, [handleRefresh]),
			10000,
			true,
		),
	)

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState) => {
			dispatch(setAppState(nextAppState))

			if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
				handleRefresh()
			}

			appState.current = nextAppState
		})

		return () => {
			subscription && subscription.remove()
		}
	}, [])

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			{children}
		</SafeAreaView>
	)
}

export default ScreenContainer
