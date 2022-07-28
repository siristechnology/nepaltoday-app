import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Text, Image } from '@components'
import styles from './styles'
import Loading from './Loading'
import PlayerButton from './Button'

const BottomPlayer = ({ initSuccess, currentChannel, isPlaying, onPause, onPlay, onSkipNext }) => {
	if (!initSuccess) {
		return <Loading />
	}

	return (
		<View style={[styles.container]}>
			<View style={styles.contain} activeOpacity={0.9}>
				<Image source={{ uri: currentChannel.artwork }} style={styles.imageStation} />
				<View style={{ paddingLeft: 10, flex: 1 }}>
					<Text headline semibold numberOfLines={1} style={styles.marginVertical3}>
						{currentChannel.title}
					</Text>
					<Text footnote semibold grayColor style={styles.marginVertical3}>
						{currentChannel.province}
					</Text>
				</View>
				<View style={styles.playerBtns}>
					{(isPlaying && <PlayerButton name="pause-circle" onAction={onPlay} />) || (
						<PlayerButton name="pause-circle" onAction={onPause} />
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
