import React, { useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useLazyQuery } from '@apollo/react-hooks'
import crashlytics from '@react-native-firebase/crashlytics'
import { useScrollToTop } from '@react-navigation/native'
import { CardSlide, News169, NewsList, SafeAreaView, Text } from '@components'
import { BaseStyle, useTheme } from '@config'
import styles from './styles'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import GET_ARTICLES_QUERY from './GET_ARTICLES_QUERY'
import Weather from './weather.component'
import * as Utils from '@utils'

const Home = (props) => {
	const { navigation } = props
	const { colors } = useTheme()
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [localArticles, setLocalArticles] = useState({ getArticles: [] })
	const ref = useRef(null)
	useScrollToTop(ref)

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

		const startTrace = Utils.getStartTrace()
		startTrace && startTrace.stop && startTrace.stop()
	}

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const dataArticles = (data && data.getArticles) || []

	const homeArticles = (dataArticles.length && dataArticles) || localArticles.getArticles

	const topHeadline = homeArticles.find((a) => a.category === 'headline') || homeArticles[0]
	const topNews = homeArticles
		.filter((a) => a._id !== topHeadline._id)
		.sort((a, b) => b.totalWeight - a.totalWeight)
		.slice(0, 100)

	const entertainmentArticles = homeArticles.filter((x) => x.category == 'entertainment') || []

	const goPostDetail = (article) => () => {
		navigation.navigate('PostDetail', { article: article })
	}

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			<FlatList
				ref={ref}
				contentContainerStyle={{ ...styles.paddingSrollView, paddingTop: 4 }}
				data={topNews.slice(3)}
				keyExtractor={(item) => item._id}
				ListHeaderComponent={
					<>
						<View style={{ paddingBottom: 10 }}>
							<Text title1 bold>
								{nepaliDate}
							</Text>
							<Weather />
						</View>

						<News169 article={topHeadline} loading={loading} onPress={goPostDetail(topHeadline)} />

						<View style={styles.paddingFlatList}>
							{topNews.slice(0, 3).map((item, index) => {
								return (
									<NewsList
										key={item._id}
										loading={loading}
										article={item}
										image={item.image}
										title={item.title}
										subtitle={item.subtitle}
										date={item.date}
										style={{
											marginBottom: index == 2 ? 0 : 15,
										}}
										onPress={goPostDetail(item)}
									/>
								)
							})}
						</View>

						<FlatList
							contentContainerStyle={{ ...styles.paddingFlatList, paddingBottom: 20 }}
							horizontal={true}
							showsHorizontalScrollIndicator={false}
							data={entertainmentArticles}
							keyExtractor={(item) => item._id}
							renderItem={({ item, index }) => (
								<CardSlide
									key={item._id}
									article={item}
									loading={loading}
									onPress={goPostDetail(item)}
									style={{
										marginRight: index == entertainmentArticles.length - 1 ? 0 : 15,
									}}
								/>
							)}
						/>
					</>
				}
				renderItem={({ item, index }) => (
					<NewsList
						key={item._id}
						article={item}
						loading={loading}
						style={{
							marginBottom: index == topNews.slice(3).length - 1 ? 0 : 15,
						}}
						onPress={goPostDetail(item)}
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						colors={[colors.primary]}
						tintColor={colors.primary}
					/>
				}
			/>
		</SafeAreaView>
	)
}

export default Home
