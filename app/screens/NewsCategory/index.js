import { Text, News169, TabSlider, SafeAreaView } from '@components'
import { BaseStyle, useTheme } from '@config'
// Load sample data
import { PostListData } from '@data'
import * as Utils from '@utils'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, RefreshControl, View } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useNavigation, useRoute } from '@react-navigation/native'

export const modes = {
	square: 'square',
	bars: 'bars',
	thList: 'th-list',
	thLarge: 'th-large',
}

const Post = ({ mode = modes.square, posts = PostListData }) => {
	const navigation = useNavigation()
	const { t } = useTranslation()
	const { colors } = useTheme()
	const [refreshing, setRefreshing] = useState(false)
	const [modeView, setModeView] = useState(mode)
	const [index, setIndex] = React.useState(0)
	const [list, setList] = useState(posts)
	const [loading, setLoading] = useState(true)
	const scrollAnim = useRef(new Animated.Value(0)).current
	const offsetAnim = useRef(new Animated.Value(0)).current
	const clampedScroll = useRef(
		Animated.diffClamp(
			Animated.add(
				scrollAnim.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolateLeft: 'clamp',
				}),
				offsetAnim,
			),
			0,
			40,
		),
	).current

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	const goPostDetail = (item) => () => {
		navigation.navigate('PostDetail', { item: item })
	}

	const renderItem = ({ item, index }) => {
		return (
			<News169
				avatar={item.avatar}
				loading={loading}
				style={{ marginVertical: 8 }}
				name={item.name}
				description={item.description}
				title={item.title}
				image={item.image}
				onPress={goPostDetail(item)}
			/>
		)
	}

	console.log('modeView', modeView)

	const renderList = () => {
		const navbarTranslate = clampedScroll.interpolate({
			inputRange: [0, 40],
			outputRange: [0, -40],
			extrapolate: 'clamp',
		})
		const android = Platform.OS == 'android'
		return (
			<View style={{ flex: 1 }}>
				<Animated.FlatList
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: 20,
					}}
					refreshControl={
						<RefreshControl
							colors={[colors.primary]}
							tintColor={colors.primary}
							refreshing={refreshing}
							onRefresh={() => {}}
						/>
					}
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: {
										y: scrollAnim,
									},
								},
							},
						],
						{ useNativeDriver: true },
					)}
					data={list}
					key={1}
					numColumns={1}
					keyExtractor={(item, index) => item.id}
					renderItem={renderItem}
				/>
			</View>
		)
	}

	const [routes] = React.useState([
		{ key: 'apps1', title: 'apps1' },
		{ key: 'apps2', title: 'apps2' },
		// { key: 'screens', title: 'screens' },
		// { key: 'components', title: 'components' },
		// { key: 'setting', title: 'setting' },
	])

	const scene1 = () => {
		return renderList()
	}

	const renderScene = SceneMap({
		apps1: scene1,
		apps2: scene1,
	})

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			<View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
				<Text title2 bold>
					{t('Categories')}
				</Text>
			</View>
			<TabSlider
				navigationState={{
					index,
					routes: routes,
				}}
				renderScene={renderScene}
				onIndexChange={setIndex}
			/>
		</SafeAreaView>
	)
}

export default Post
