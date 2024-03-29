import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import { useLazyQuery } from '@apollo/react-hooks'
import crashlytics from '@react-native-firebase/crashlytics'
import perf from '@react-native-firebase/perf'
import { CardSlide, News169, NewsList, Text } from '@components'
import { useTheme } from '@config'
import styles from './styles'
import { fetchfromAsync, storetoAsync } from '../../helper/cacheStorage'
import { getFormattedCurrentNepaliDate } from '../../helper/dateFormatter'
import GET_ARTICLES_QUERY from './GET_ARTICLES_QUERY'
import Weather from './weather.component'
import ScreenContainer from '../ScreenContainer/Index'

const Home = (props) => {
	const { navigation } = props
	const { colors } = useTheme()
	const [nepaliDate, setNepaliDate] = useState('')
	const [refreshing, setRefreshing] = useState(false)
	const [home_page_load_time, setHome_page_load_time] = useState()
	const [localArticles, setLocalArticles] = useState([])
	const [homeArticles, setHomeArticles] = useState([])
	const [topHeadline, setTopHeadline] = useState()

	const ref = useRef(null)
	useScrollToTop(ref)

	const [fetchNews, { loading, data, refetch, error }] = useLazyQuery(GET_ARTICLES_QUERY, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error(error))
	}

	const handleRefresh = useCallback(async () => {
		setRefreshing(true)
		try {
			const query_trace = await perf().startTrace('query_time')
			await refetch()
			setRefreshing(false)
			query_trace.stop()
		} catch (err) {
			setRefreshing(false)
		}
	}, [refetch])

	const fetchArticlesFromAsyncStorage = async () => {
		fetchfromAsync()
			.then((res) => {
				setLocalArticles(res)
			})
			.catch((err) => {
				crashlytics().recordError(err)
				setLocalArticles([])
			})
	}

	useEffect(() => {
		const init = async () => {
			const metric = await perf().startTrace('home_page_load_time')
			setHome_page_load_time(metric)
		}
		!home_page_load_time && init()
	}, [])

	useEffect(() => {
		if (localArticles) {
			home_page_load_time && home_page_load_time.stop()
		}
	}, [home_page_load_time, localArticles])

	useEffect(() => {
		fetchArticlesFromAsyncStorage().then(() => {
			fetchNews()
		})
		getFormattedCurrentNepaliDate().then((npDate) => {
			setNepaliDate(npDate)
		})
	}, [fetchNews])

	useEffect(() => {
		if (!loading && data?.getArticles?.length) {
			const myArticles = data.getArticles
			storetoAsync(myArticles)
		}
	}, [data?.getArticles, loading])

	useEffect(() => {
		const articles = data?.getArticles?.length ? data.getArticles : localArticles

		const topArticle = articles.find((a) => a.category === 'headline') || articles[0]
		setTopHeadline(topArticle)

		const sortedArticles = articles
			.filter((a) => a._id !== topArticle._id)
			.sort((a, b) => b.totalWeight - a.totalWeight)
			.slice(0, 100)

		setHomeArticles(sortedArticles)
	}, [data?.getArticles, loading, localArticles])

	const entertainmentArticles = homeArticles.filter((x) => x.category == 'entertainment') || []

	const goPostDetail = (article) => () => {
		navigation.navigate('PostDetail', { article: article })
	}

	const renderNewsItem = ({ item, index }) => (
		<NewsList
			key={item?._id || index}
			article={item}
			style={{
				marginBottom: index == homeArticles.slice(3).length - 1 ? 0 : 15,
			}}
			onPress={goPostDetail(item)}
		/>
	)

	const renderCardSlide = ({ item, index }) => (
		<CardSlide
			key={item._id}
			article={item}
			onPress={goPostDetail(item)}
			style={{
				marginRight: index == entertainmentArticles.length - 1 ? 0 : 15,
			}}
		/>
	)

	return (
		<ScreenContainer navigation={navigation} scrollRef={ref} handleRefresh={handleRefresh}>
			<FlatList
				ref={ref}
				contentContainerStyle={{ ...styles.paddingSrollView, paddingTop: 4 }}
				data={homeArticles.slice(3)}
				keyExtractor={(item) => item._id}
				initialNumToRender={3}
				maxToRenderPerBatch={3}
				ListHeaderComponent={
					<>
						<View style={{ paddingBottom: 10 }}>
							<Text title1 bold>
								{nepaliDate}
							</Text>
							<Weather />
						</View>

						<News169 article={topHeadline} onPress={goPostDetail(topHeadline)} />

						<View style={styles.paddingFlatList}>
							{homeArticles.slice(0, 3).map((item, index) => {
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
							renderItem={renderCardSlide}
						/>
					</>
				}
				renderItem={renderNewsItem}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
						colors={[colors.primary]}
						tintColor={colors.primary}
					/>
				}
			/>
		</ScreenContainer>
	)
}

export default Home
