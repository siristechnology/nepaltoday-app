import React, { useEffect, useState } from 'react'
import { ActivityIndicator, AppState, Image, Share, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Header, SafeAreaView } from '@components'
import { BaseStyle, Images } from '@config'
import styles from './styles'
export const NEPALTODAY_URL = 'https://tinyurl.com/NepalTodayApp'

const ArticleWeb = (props) => {
	const { navigation, route } = props
	const article = route?.params?.article
	const { link, title } = article
	const [appState, setAppState] = useState(AppState.currentState)

	const onShare = async () => {
		Share.share({
			message: title + '  ' + link + ' #NEPALTODAYAPP ' + NEPALTODAY_URL,
			url: link,
			title: title,
		})
	}

	useEffect(() => {
		const eventSubs = AppState.addEventListener('change', updateAppState)
		return () => {
			eventSubs && eventSubs.remove(updateAppState)
		}
	}, [])

	const updateAppState = (nextAppState) => {
		setAppState(nextAppState)
	}

	if (appState != 'active') {
		return null
	}

	return (
		<SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{ top: 'always', bottom: 'always' }}>
			<Header
				title={title}
				renderLeft={() => {
					return <Image resizeMode="contain" style={[styles.icon]} source={Images.angleLeft} />
				}}
				renderRight={() => {
					return <Image resizeMode="contain" style={[styles.icon]} source={Images.shareAltSolid} />
				}}
				onPressLeft={() => {
					navigation.goBack()
				}}
				onPressRight={onShare}
			/>
			<WebView
				source={{ uri: link }}
				mediaPlaybackRequiresUserAction={true}
				mixedContentMode="always"
				allowsInlineMediaPlayback="false"
				startInLoadingState
				pullToRefreshEnabled="true"
				renderLoading={() => (
					<View style={{ flex: 1 }}>
						<ActivityIndicator color="#009688" size={'large'} />
					</View>
				)}
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			/>
		</SafeAreaView>
	)
}

export default ArticleWeb
