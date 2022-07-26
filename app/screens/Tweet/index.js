import React, { useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import crashlytics from '@react-native-firebase/crashlytics'
import { BaseStyle, useTheme } from '@config'
import { SafeAreaView, Text } from '@components'
import SingleTweet from './SingleTweet'
import styles from './styles'
import { useQuery } from '@apollo/client'
import GET_TWEETS_QUERY from './GET_TWEETS_QUERY'

const Favourite = () => {
	const { colors } = useTheme()

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

	const renderContent = () => {
		return (
			<View style={[{ flex: 1 }]}>
				<FlatList
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					data={tweets}
					keyExtractor={(item) => item._id}
					ListHeaderComponent={() => {
						return (
							<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
								<Text title1 bold>
									{'Top Tweets'}
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
			</View>
		)
	}

	return (
		<SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
			{renderContent()}
		</SafeAreaView>
	)
}

export default Favourite
