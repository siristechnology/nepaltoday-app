import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import TrackPlayer from 'react-native-track-player'
import { BaseStyle } from '@config'
import { CardChannelGrid, CategoryList, SafeAreaView, Text } from '@components'
import SearchBox from './SearchBox'
import styles from './styles'
import { useQuery } from '@apollo/client'
import GET_FM_QUERY from './GET_FM_QUERY'
import BottomPlayer from './Player/index'

const trackPlayerInit = async () => {
	await TrackPlayer.setupPlayer()
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_STOP,
			TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
			TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
		],
	})
	return true
}

const RadioScreen = (props) => {
	const { navigation } = props
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentChannelId, setCurrentChannelId] = useState('')

	useEffect(() => {
		TrackPlayer.registerPlaybackService(
			() =>
				async function () {
					TrackPlayer.addEventListener('remote-play', () => {
						play()
					})

					TrackPlayer.addEventListener('remote-pause', () => {
						pause()
					})

					TrackPlayer.addEventListener('remote-next', () => {
						skipNext()
					})

					TrackPlayer.addEventListener('remote-duck', () => {
						pause()
					})
				},
		)
	}, [])

	const onFMSelect = async (channel, fmList) => {
		await TrackPlayer.reset()
		for (const fmDetail of fmList) {
			await TrackPlayer.add({
				id: fmDetail.id,
				url: fmDetail.url,
				type: 'default',
				title: fmDetail.title,
				album: fmDetail.album,
				artist: fmDetail.artist,
				artwork: fmDetail.artwork,
			})
		}
		await TrackPlayer.play()
		await TrackPlayer.skip(channel.id)
		setCurrentChannelId(channel.id)
		setIsPlaying(true)
	}

	const play = async () => {
		await TrackPlayer.play()
		const currentId = await TrackPlayer.getCurrentTrack()
		setCurrentChannelId(currentId)
		setIsPlaying(true)
	}

	const pause = async () => {
		await TrackPlayer.pause()
		setIsPlaying(false)
	}

	const skipNext = async () => {
		await TrackPlayer.skipToNext()
		const currentId = await TrackPlayer.getCurrentTrack()
		setCurrentChannelId(currentId)
	}

	const skipPrevious = async () => {
		await TrackPlayer.skipToPrevious()
		const currentId = await TrackPlayer.getCurrentTrack()
		setCurrentChannelId(currentId)
	}

	useEffect(() => {
		const startPlayer = async () => {
			const isInit = await trackPlayerInit()
			setIsTrackPlayerInit(isInit)
		}
		startPlayer()
	}, [])

	const { data, loading, error, refetch } = useQuery(GET_FM_QUERY, {
		variables: {},
	})

	let favoriteList = (data && data.getMyFm.favoriteFm) || []
	const fmList = (data && data.getMyFm.allFm) || []
	favoriteList = fmList.slice(0, 10)

	const goPost = (item) => () => {
		navigation.navigate('Post', { item: item })
	}

	const currentChannel = fmList.filter((x) => x.id === currentChannelId)[0]

	const provinces = [...new Set(fmList.map((f) => f.province))]
	const provinceFms = provinces.map((p) => fmList.find((f) => f.province == p))

	return (
		<SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
			<View style={{ flex: 1 }}>
				<ScrollView scrollEventThrottle={16}>
					<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
						<Text title1 bold>
							{'रेडियो'}
						</Text>
					</View>

					<SearchBox onSubmitEditing={() => {}} loading={false} />

					<View style={styles.paddingView}>
						{favoriteList?.length > 0 && (
							<View>
								<Text title3 semibold style={styles.title}>
									{'Suggested Stations'}
								</Text>
								<FlatList
									contentContainerStyle={{ marginTop: 15 }}
									horizontal={true}
									showsHorizontalScrollIndicator={false}
									data={favoriteList}
									keyExtractor={(item) => item.id}
									renderItem={({ item, index }) => (
										<CardChannelGrid
											loading={loading}
											onPress={() => onFMSelect(item, fmList)}
											style={{
												marginRight: index == favoriteList.length - 1 ? 0 : 15,
											}}
											image={{ uri: item.artwork }}
											title={item.title}
										/>
									)}
								/>
							</View>
						)}

						<View>
							<Text title3 semibold style={styles.title}>
								{'Browse Stations'}
							</Text>
							<Text light footnote regular grayColor>
								{'Stations from all providences'}
							</Text>
							<View style={{ marginTop: 10 }}>
								{provinceFms.map((item, index) => {
									return (
										<CategoryList
											key={item.id}
											loading={loading}
											onPress={goPost(item)}
											style={{
												marginBottom: index == fmList.length - 1 ? 0 : 15,
											}}
											image={{ uri: item.artwork }}
											title={item.province}
											subtitle={item.title}
										/>
									)
								})}
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			{currentChannel != null && (
				<BottomPlayer
					isPlaying={isPlaying}
					initSuccess={isTrackPlayerInit}
					currentChannel={currentChannel}
					onPlay={play}
					onPause={pause}
					onSkipNext={skipNext}
				/>
			)}
		</SafeAreaView>
	)
}

export default RadioScreen
