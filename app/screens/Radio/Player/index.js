import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { BaseColor } from '@config'
import { Image, PlaceholderLine, Placeholder } from '@components'
import styles from './styles'
import PlayerButton from './Button'
import { State } from 'react-native-track-player'

const BottomPlayer = ({ currentChannel, playerState, onPlay, onPause, onSkipNext, isFavourite, onFavourite }) => {
	return (
		<View style={[styles.container]}>
			<View style={styles.contain} activeOpacity={0.9}>
				<Image source={{ uri: currentChannel.artwork }} style={styles.imageStation} />
				<View style={{ paddingLeft: 10, flex: 1, justifyContent: 'flex-start', minHeight: 60 }}>
					<Text variant="titleMedium" numberOfLines={1} style={styles.marginVertical3}>
						{currentChannel.title}
					</Text>
					{[State.Playing, State.Paused].indexOf(playerState) == -1 && (
						<Placeholder>
							<PlaceholderLine width={80} />
						</Placeholder>
					)}
					{[State.Playing, State.Paused].indexOf(playerState) != -1 && (
						<Text variant="bodySmall">{currentChannel.province}</Text>
					)}
				</View>
				<View style={styles.playerBtns}>
					{(!isFavourite && <PlayerButton name="star" onAction={onFavourite} />) || (
						<PlayerButton name="star" onAction={onFavourite} style={{ color: BaseColor.yellowColor }} />
					)}

					{(playerState == State.Playing && <PlayerButton name="pause-circle" onAction={onPause} />) ||
						(playerState == State.Paused && <PlayerButton name="play-circle" onAction={onPlay} />) || (
							<PlayerButton isloading={true} />
						)}
					<PlayerButton name="step-forward" onAction={onSkipNext} />
				</View>
			</View>
		</View>
	)
}

BottomPlayer.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	item: PropTypes.object,
	onPress: PropTypes.func,
	onAction: PropTypes.func,
	type: PropTypes.string,
}

export default BottomPlayer
