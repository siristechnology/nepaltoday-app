import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ScrollView, View } from 'react-native'
import { BaseColor, BaseStyle } from '@config'
import { HomeChannelData, HomeListData, HomePopularData, HomeTopicData, PostListData } from '@data'
import StationsData from './stations'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CardChannelGrid, CardSlide, CategoryList, SafeAreaView, Text } from '@components'
import SearchBox from './SearchBox'
import styles from './styles'

const Home = (props) => {
	const { navigation } = props
	const { t } = useTranslation()
	const [topics, setTopics] = useState(HomeTopicData)
	const [channels, setChannels] = useState(HomeChannelData)
	const [popular, setPopular] = useState(HomePopularData)
	const [list, setList] = useState(HomeListData)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

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
			<View style={[{ flex: 1, paddingTop: 20 }]}>
				<View style={{ paddingHorizontal: 20 }}>
					<Text header bold>
						{t('FM')}
					</Text>
				</View>
				<SearchBox onSubmitEditing={() => {}} loading={false} />
				<ScrollView contentContainerStyle={styles.paddingSrollView}>
					<View>
						<Text title3 semibold style={styles.title}>
							{t('Favourite Stations')}
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
					<View style={styles.topicsView}>
						<Text title3 semibold style={styles.title}>
							{t('Browse Stations')}
						</Text>
						<Text light footnote regular grayColor>
							{t('Stations from all providences')}
						</Text>
						<SafeAreaView style={{ flex: 1 }}>
							<FlatList
								contentContainerStyle={{ marginTop: 10 }}
								data={StationsData}
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
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							/>
						</SafeAreaView>
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
