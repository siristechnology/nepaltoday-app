import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useLazyQuery } from '@apollo/react-hooks'
import crashlytics from '@react-native-firebase/crashlytics'
import { CardChannelGrid, CardSlide, CategoryList, News169, NewsList, SafeAreaView, Text } from '@components'
import { BaseColor, BaseStyle } from '@config'
import { HomeChannelData, HomeListData, HomePopularData, HomeTopicData, PostListData } from '@data'
import styles from './styles'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import GET_ARTICLES_QUERY from './GET_ARTICLES_QUERY'
import Weather from './weather.component'

const Home = (props) => {
	const { navigation } = props
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [topics, setTopics] = useState(HomeTopicData)
	const [channels, setChannels] = useState(HomeChannelData)
	const [popular, setPopular] = useState(HomePopularData)
	const [list, setList] = useState(HomeListData)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })

	const [fetchNews, { loading, data, refetch, error, called }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		if (called) {
			refetch()
				.then(() => {
					setRefreshing(false)
				})
				.catch((err) => setRefreshing(false))
		} else {
			fetchNews()
			setRefreshing(false)
		}
	}

	const fetchArticlesFromAsyncStorage = async () => {
		fetchfromAsync()
			.then((res) => {
				setLocalArticles({ getArticles: res })
			})
			.catch((err) => {
				crashlytics().recordError(err)
				setLocalArticles([])
			})
	}

	useEffect(() => {
		getFormattedCurrentNepaliDate().then((npDate) => {
			setNepaliDate(npDate)
		})
		fetchArticlesFromAsyncStorage()
			.then(() => {
				fetchNews()
			})
			.then(() => {
				const article = props.route.params?.article
				if (article && article.source) {
					props.navigation.navigate('ArticleDetail', { article, articles: [article] })
				}
			})
	}, [fetchNews])

	if (!loading && data != null && data.getArticles && data.getArticles.length) {
		const myArticles = data.getArticles
		storetoAsync(myArticles)
	}

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const dataArticles = (data && data.getArticles) || []

	const homeArticles = (dataArticles.length && dataArticles) || localArticles.getArticles

	const topHeadline = homeArticles.find((a) => a.category === 'headline') || homeArticles[0]
	const headlineArticles = homeArticles.filter((x) => x.category == 'headline') || []
	const topNews = homeArticles
		.filter((a) => a._id !== topHeadline._id)
		.sort((a, b) => b.totalWeight - a.totalWeight)
		.slice(0, 100)

	const goPost = (item) => () => {
		navigation.navigate('Post', { item: item })
	}

	const goPostDetail = (item) => () => {
		navigation.navigate('PostDetail', { item: item })
	}

	const goToCategory = () => {
		navigation.navigate('Category')
	}

	const renderContent = () => {
		const mainNews = PostListData[0]
		return (
			<View>
				<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
					<Text title1 bold>
						{nepaliDate}
					</Text>
					<Weather />
				</View>
				<ScrollView contentContainerStyle={styles.paddingSrollView}>
					<News169
						article={topHeadline}
						avatar={mainNews.image}
						loading={loading}
						name={mainNews.name}
						description={mainNews.description}
						title={mainNews.title}
						image={mainNews.image}
						onPress={goPostDetail(mainNews)}
					/>
					<FlatList
						scrollEnabled={false}
						contentContainerStyle={styles.paddingFlatList}
						data={list}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<NewsList
								loading={loading}
								image={item.image}
								title={item.title}
								subtitle={item.subtitle}
								date={item.date}
								style={{
									marginBottom: index == list.length - 1 ? 0 : 15,
								}}
								onPress={goPostDetail(item)}
							/>
						)}
					/>

					<FlatList
						contentContainerStyle={styles.paddingFlatList}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						data={popular}
						keyExtractor={(item, index) => item.id}
						renderItem={({ item, index }) => (
							<CardSlide
								loading={loading}
								onPress={goPostDetail(item)}
								style={{
									marginRight: index == popular.length - 1 ? 0 : 15,
								}}
								image={item.image}
								date={item.date}
								title={item.title}
							/>
						)}
					/>
					<View style={styles.topicsView}>
						<Text title3 semibold style={styles.title}>
							{'browse topics'}
						</Text>
						<Text light footnote regular grayColor>
							{'sss sss ww'}
						</Text>
						<FlatList
							contentContainerStyle={{ marginTop: 10 }}
							data={topics}
							keyExtractor={(item, index) => item.id}
							renderItem={({ item, index }) => (
								<CategoryList
									loading={loading}
									onPress={goPost(item)}
									style={{
										marginBottom: index == topics.length - 1 ? 0 : 15,
									}}
									image={item.image}
									title={item.title}
									subtitle={item.subtitle}
								/>
							)}
							ListFooterComponent={
								<TouchableOpacity onPress={goToCategory}>
									<Text body2 semibold accentColor>
										{'see_more'}
									</Text>
								</TouchableOpacity>
							}
							ListFooterComponentStyle={{
								width: '100%',
								alignItems: 'center',
								paddingTop: 15,
							}}
						/>
					</View>
					<View>
						<Text title3 semibold style={styles.title}>
							{'discover_channels'}
						</Text>
						<Text light footnote regular grayColor>
							{'description_discover_channels'}
						</Text>
						<FlatList
							contentContainerStyle={{ marginTop: 15 }}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={channels}
							keyExtractor={(item, index) => item.id}
							renderItem={({ item, index }) => (
								<CardChannelGrid
									loading={loading}
									onPress={goPostDetail}
									style={{
										marginRight: index == channels.length - 1 ? 0 : 15,
									}}
									image={item.image}
									title={item.title}
								/>
							)}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
				{renderContent()}
			</SafeAreaView>
		</View>
	)
}

export default Home
