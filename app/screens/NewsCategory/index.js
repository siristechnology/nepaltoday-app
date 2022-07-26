import React, { useEffect, useRef, useState } from 'react'
import { Animated, Platform, RefreshControl, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import crashlytics from '@react-native-firebase/crashlytics'
import { Text, News169, TabSlider, SafeAreaView } from '@components'
import { BaseStyle, useTheme } from '@config'
import * as Utils from '@utils'
import { SceneMap } from 'react-native-tab-view'
import styles from './styles'

import { useLazyQuery } from '@apollo/client'
import GET_ARTICLES_QUERY from './GET_ARTICLES_QUERY'
import { fetchCategoryArticlesfromAsync, storeCategoryArticlestoAsync } from '../../helper/cacheStorage'

const NewsCategory = () => {
	const navigation = useNavigation()
	const { colors } = useTheme()
	const [refreshing, setRefreshing] = useState(false)
	const [index, setIndex] = useState(0)

	const [localArticles, setLocalArticles] = useState({ getArticles: [] })
	const [articles, setArticles] = useState([])

	// const [loading, setLoading] = useState(true)
	const scrollAnim = useRef(new Animated.Value(0)).current

	const [fetchNews, { loading, data, refetch, error }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const fetchArticlesFromAsyncStorage = async () => {
		fetchCategoryArticlesfromAsync()
			.then((res) => {
				setLocalArticles({ getArticles: res })
			})
			.catch((err) => {
				crashlytics().recordError(err)
				setLocalArticles([])
			})
	}

	useEffect(() => {
		fetchArticlesFromAsyncStorage()
		fetchNews()
	}, [fetchNews])

	useEffect(() => {
		const categoryArticles = data?.getArticles || localArticles.getArticles
		const sortedArticles = categoryArticles.slice().sort((a, b) => b.createdDate - a.createdDate)
		setArticles(sortedArticles)
	}, [loading, data, localArticles])

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	if (!loading && data?.getArticles?.length) {
		storeCategoryArticlestoAsync(data.getArticles)
	}

	const goPostDetail = (article) => () => {
		navigation.navigate('PostDetail', { article: article })
	}

	const renderItem = ({ item }) => {
		return (
			<News169
				key={item._id}
				article={item}
				loading={loading}
				style={{ marginVertical: 8 }}
				onPress={goPostDetail(item)}
			/>
		)
	}

	const renderList = (category) => {
		const categoryArticles = articles.filter((a) => a.category == category)

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
							onRefresh={handleRefresh}
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
					data={categoryArticles}
					key={1}
					numColumns={1}
					keyExtractor={(item) => item._id}
					renderItem={renderItem}
				/>
			</View>
		)
	}

	const [routes] = useState([
		{ key: 'news', title: 'समाचार' },
		{ key: 'entertainment', title: 'मनोरन्जन' },
		{ key: 'sports', title: 'खेलकुद' },
		{ key: 'cartoon', title: 'कार्टुन' },
		{ key: 'business', title: 'अर्थ' },
		{ key: 'social', title: 'समाज' },
		{ key: 'health', title: 'स्वास्थ्य' },
		{ key: 'technology', title: 'सूचना प्रविधि' },
		{ key: 'share', title: 'सेयर' },
		{ key: 'agriculture', title: 'कृषि' },
	])

	const renderCategoryTabs = () => {
		const scenes = {}
		routes.forEach((route) => {
			scenes[route.key] = () => {
				return renderList(route.key)
			}
		})
		return SceneMap(scenes)
	}

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
				<Text title1 bold>
					{'शीर्षकहरू'}
				</Text>
			</View>
			<TabSlider
				navigationState={{
					index,
					routes: routes,
				}}
				renderScene={renderCategoryTabs()}
				onIndexChange={setIndex}
			/>
		</SafeAreaView>
	)
}

export default NewsCategory
