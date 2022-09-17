import React, { useRef, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useNavigation, useScrollToTop } from '@react-navigation/native'
import crashlytics from '@react-native-firebase/crashlytics'
import { Text } from '@components'
import SingleTweet from './SingleTweet'
import { useQuery } from '@apollo/client'
import GET_TWEETS_QUERY from './GET_TWEETS_QUERY'
import ScreenContainer from '../ScreenContainer/Index'

const TweetScreen = () => {
	const navigation = useNavigation()
	const { colors } = useTheme()
	const ref = useRef(null)
	useScrollToTop(ref)
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const { loading, data, refetch, error } = useQuery(GET_TWEETS_QUERY, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error('Twitter Api error' + error.message))
	}

	const tweets = data?.getTweets || []

	return (
		<ScreenContainer navigation={navigation} handleRefresh={handleRefresh}>
			<FlatList
				keyExtractor={(item) => item._id}
				ref={ref}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				data={tweets}
				ListHeaderComponent={() => {
					return (
						<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
							<Text title1 bold>
								{'शीर्ष ट्वीटहरू'}
							</Text>
						</View>
					)
				}}
				renderItem={({ item, index }) => <SingleTweet tweet={item} loading={loading} />}
				refreshControl={
					<RefreshControl
						colors={[colors.primary]}
						tintColor={colors.primary}
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
			/>
		</ScreenContainer>
	)
}

export default TweetScreen
