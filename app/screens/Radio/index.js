import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import TrackPlayer, { Capability, Event, State, useTrackPlayerEvents } from 'react-native-track-player'
import { BaseStyle } from '@config'
import { CardChannelGrid, SafeAreaView, Text } from '@components'
import SearchBox from './SearchBox'
import styles from './styles'
import { useQuery } from '@apollo/client'
import GET_FM_QUERY from './GET_FM_QUERY'
import BottomPlayer from './Player/index'
import ChannelGrid from './ChannelGrid'
import RadioSearchResults from './SearchResults'

const trackPlayerInit = async () => {
	await TrackPlayer.setupPlayer()
	TrackPlayer.updateOptions({
		stopWithApp: true,
		capabilities: [Capability.Play, Capability.Pause, Capability.Skip, Capability.SkipToNext],
		compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
	})
	return true
}

const RadioScreen = (props) => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentChannelId, setCurrentChannelId] = useState('')
	const [search, setSearch] = useState('')

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

	const onFMSelect = async (channel) => {
		await TrackPlayer.reset()
		await TrackPlayer.add({ ...channel, type: 'default' })
		await TrackPlayer.play()
		setCurrentChannelId(channel.id)
	}

	const play = async () => {
		await TrackPlayer.play()
	}

	const pause = async () => {
		await TrackPlayer.pause()
	}

	const skipNext = async () => {
		const currentIndex = fmList.indexOf(fmList.find((f) => f.id == currentChannelId))
		const nextIndex = (currentIndex + 1) % fmList.length
		onFMSelect(fmList[nextIndex])
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

	useTrackPlayerEvents([Event.PlaybackState], (event) => {
		if (event.state === State.Playing) {
			setIsPlaying(true)
		} else {
			setIsPlaying(false)
		}
	})

	const currentChannel = fmList.filter((x) => x.id === currentChannelId)[0]

	const popularFms = fmList.slice(0, 20)
	const recentFms = fmList.slice(0, 10)

	return (
		<SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
			<View style={{ flex: 1 }}>
				<ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps="handled">
					<View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
						<Text title1 bold>
							{'रेडियो'}
						</Text>
					</View>

					<SearchBox search={search} setSearch={setSearch} loading={loading} />

					{search.trim() != '' && <RadioSearchResults search={search} fmList={fmList} onPlay={onFMSelect} />}

					{search.trim() == '' && (
						<>
							<View style={styles.paddingView}>
								{favoriteList?.length > 0 && (
									<View>
										<Text title3 bold style={styles.title}>
											{'Your Stations'}
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
							</View>

							<ChannelGrid
								title={'Popular Stations'}
								fmList={popularFms}
								styles={styles}
								onFMSelect={onFMSelect}
							/>

							<ChannelGrid
								title={'Recent Stations'}
								fmList={recentFms}
								styles={styles}
								onFMSelect={onFMSelect}
							/>
						</>
					)}
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
