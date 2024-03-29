import React, { useEffect, useRef, useState } from 'react'
import { Animated, RefreshControl, View } from 'react-native'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import crashlytics from '@react-native-firebase/crashlytics'
import { Text, News169, TabSlider } from '@components'
import { useTheme } from '@config'
import { SceneMap } from 'react-native-tab-view'
import { useLazyQuery } from '@apollo/client'
import GET_ARTICLES_QUERY from './GET_ARTICLES_QUERY'
import { fetchCategoryArticlesfromAsync, storeCategoryArticlestoAsync } from '../../helper/cacheStorage'
import ScreenContainer from '../ScreenContainer/Index'

const NewsCategory = () => {
	const navigation = useNavigation()
	const { colors } = useTheme()
	const [refreshing, setRefreshing] = useState(false)
	const [index, setIndex] = useState(0)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })
	const [articles, setArticles] = useState([])
	const scrollAnim = useRef(new Animated.Value(0)).current

	const [fetchNews, { loading, data, refetch, error }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error(error))
	}

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
		fetchArticlesFromAsyncStorage().then(() => {
			fetchNews()
		})
	}, [fetchNews])

	useEffect(() => {
		const categoryArticles = data?.getArticles || localArticles.getArticles
		const sortedArticles = categoryArticles.slice().sort((a, b) => b.createdDate - a.createdDate)
		setArticles(sortedArticles)

		if (!loading && data?.getArticles?.length) {
			storeCategoryArticlestoAsync(data.getArticles)
		}
	}, [loading, data, localArticles])

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

	const RenderList = (category) => {
		const ref = useRef(null)
		useScrollToTop(ref)
		const categoryArticles = articles.filter((a) => a.category == category)

		return (
			<View style={{ flex: 1 }}>
				<Animated.FlatList
					ref={ref}
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
				return RenderList(route.key)
			}
		})
		return SceneMap(scenes)
	}
	const categoryTabs = renderCategoryTabs()

	return (
		<ScreenContainer navigation={navigation} handleRefresh={handleRefresh}>
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
				renderScene={categoryTabs}
				onIndexChange={setIndex}
			/>
		</ScreenContainer>
	)
}

export default NewsCategory
