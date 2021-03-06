import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from './../../components/common'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Container, Tab, Tabs } from 'native-base'
import auth from '@react-native-firebase/auth'
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player'
import { useTrackPlayerEvents } from 'react-native-track-player/lib/hooks'
import BottomPlayer from './components/bottomPlayer'
import FavoriteRadio from './favoriteRadio'
import AllRadio from './allRadio'
import { useTheme } from 'react-native-paper'

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

const RadioScreen = () => {
	const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false)

	const [isPlaying, setIsPlaying] = useState(false)

	const [currentChannelId, setCurrentChannelId] = useState('')

	const theme = useTheme()

	const GET_FM_QUERY = gql`
        query fmScreenQuery{
			getMyFm(nid: "${auth().currentUser.uid}") {
				allFm{
					id
					title
					url
					artist
					artwork
					province
				}
				favoriteFm{
					id
					title
					url
					artist
					artwork
					province
				}
          	}
        }
    `

	const onFMSelect = async (channel, fmList) => {
		await TrackPlayer.reset()
		for (let fmDetail of fmList) {
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
	}

	const pause = async () => {
		await TrackPlayer.pause()
	}

	const stop = async () => {
		await TrackPlayer.stop()
		setCurrentChannelId('')
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
		TrackPlayer.registerPlaybackService(
			() =>
				async function () {
					TrackPlayer.addEventListener('remote-play', () => {
						play()
					})

					TrackPlayer.addEventListener('remote-pause', () => {
						pause()
					})

					TrackPlayer.addEventListener('remote-stop', () => {
						stop()
					})

					TrackPlayer.addEventListener('remote-next', () => {
						skipNext()
					})

					TrackPlayer.addEventListener('remote-previous', () => {
						skipPrevious()
					})

					TrackPlayer.addEventListener('remote-duck', () => {
						pause()
					})
				},
		)
	}, [])

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

	const favoriteList = (data && data.getMyFm.favoriteFm) || []

	const fmList = (data && data.getMyFm.allFm) || []

	useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event) => {
		if (event.state === STATE_PLAYING) {
			setIsPlaying(true)
		} else {
			setIsPlaying(false)
		}
	})

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	} else if (error) {
		return <AppLayout />
	}

	const currentChannel = fmList.filter((x) => x.id === currentChannelId)[0]

	return (
		<Container style={{backgroundColor: theme.colors.lightBackground}}>
			<Tabs tabBarUnderlineStyle={{ backgroundColor: '#ff0000' }}>
				<Tab
					style={{ flex: 1, paddingBottom: (currentChannelId && 70) || 0 }}
					heading="All FM"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<AllRadio
						allFm={fmList}
						favoriteList={favoriteList}
						onFMSelect={onFMSelect}
						refetchFavorite={refetch}
						initSuccess={isTrackPlayerInit}
						currentChannelId={currentChannelId}
						isPlaying={isPlaying}
					/>
				</Tab>
				<Tab
					style={{ flex: 1, marginBottom: (currentChannelId && 67) || 0 }}
					heading="Favorite FM"
					tabStyle={{ backgroundColor: theme.colors.lightBackground }}
					activeTabStyle={{ backgroundColor: theme.colors.lightBackground }}
					textStyle={{ color: theme.colors.text }}
					activeTextStyle={{ color: theme.colors.text }}
				>
					<FavoriteRadio
						onFMSelect={onFMSelect}
						initSuccess={isTrackPlayerInit}
						allFm={fmList}
						refetchFavorite={refetch}
						favoriteList={favoriteList}
						currentChannelId={currentChannelId}
						isPlaying={isPlaying}
					/>
				</Tab>
			</Tabs>
			{(currentChannelId && (
				<BottomPlayer
					isPlaying={isPlaying}
					initSuccess={isTrackPlayerInit}
					onSkipPrevious={skipPrevious}
					onPause={pause}
					onPlay={play}
					onStop={stop}
					onSkipNext={skipNext}
					currentChannel={currentChannel}
				/>
			)) || <View />}
		</Container>
	)
}


export default RadioScreen
