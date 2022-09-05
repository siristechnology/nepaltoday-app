import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Animated, I18nManager, ScrollView, Share, TouchableOpacity, View } from 'react-native'
import { Button, Header, Image, SafeAreaView, Tag, Text, PlaceholderLine, Placeholder } from '@components'
import ProfileAuthor from '@components/Profile/Author'
import { BaseColor, BaseStyle, useTheme, Images } from '@config'
import * as Utils from '@utils'
import { getRelativeTime } from '../../helper/time'
import styles from './styles'
export const NEPALTODAY_URL = 'https://tinyurl.com/NepalTodayApp'

const PostDetail = (props) => {
	const { navigation, route } = props
	const { colors } = useTheme()
	const article = route?.params?.article
	const [loading, setLoading] = useState(true)
	const [heightHeader, setHeightHeader] = useState(Utils.heightHeader())
	const scrollY = useRef(new Animated.Value(0)).current
	const { imageLink, title, source, createdDate, content } = article

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	const onShare = async () => {
		const { link } = article
		Share.share({
			message: title + '  ' + link + ' #NEPALTODAYAPP ' + NEPALTODAY_URL,
			url: link,
			title: title,
		})
	}

	// For header background color from transparent to header color
	const headerBackgroundColor = scrollY.interpolate({
		inputRange: [0, 140],
		outputRange: [BaseColor.whiteColor, colors.primary],
		extrapolate: 'clamp',
		useNativeDriver: true,
	})

	// For header image opacity
	const headerImageOpacity = scrollY.interpolate({
		inputRange: [0, 250 - heightHeader - 20],
		outputRange: [1, 0],
		extrapolate: 'clamp',
		useNativeDriver: true,
	})

	// artist profile image position from top
	const heightViewImg = scrollY.interpolate({
		inputRange: [0, 250 - heightHeader],
		outputRange: [250, heightHeader],
		// extrapolate: "clamp",
		useNativeDriver: true,
	})

	const handleLinkClick = () => {
		props.navigation.navigate('ArticleWeb', { article })
	}

	const renderPlaceholder = () => {
		const holders = Array.from(Array(5))

		return (
			<Placeholder>
				<View style={{ padding: 20 }}>
					{holders.map((item, index) => (
						<PlaceholderLine key={index} width={100} />
					))}
				</View>
			</Placeholder>
		)
	}

	const renderContent = () => {
		return (
			<Fragment>
				<View style={styles.contentDescription}>
					<Text
						body1
						style={{
							lineHeight: 20,
							paddingTop: 10,
							paddingBottom: 20,
						}}
						numberOfLines={100}
					>
						{content}
					</Text>
				</View>
				<View style={styles.wrapContent}>
					{article.tags.map((item) => {
						return (
							<Tag
								chip
								key={item}
								style={{
									marginTop: 10,
									marginRight: 10,
									paddingHorizontal: 10,
								}}
							>
								{item}
							</Tag>
						)
					})}
				</View>
				<View style={styles.wrapContent}>
					<Button onPress={handleLinkClick} full>
						पूरा पढ्नुहोस्
					</Button>
				</View>
			</Fragment>
		)
	}

	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{ top: 'always', bottom: 'always' }}>
				<Header title={title} />
				<ScrollView
					onContentSizeChange={() => {
						setHeightHeader(Utils.heightHeader())
					}}
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
					overScrollMode={'never'}
					style={{ zIndex: 10 }}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[
							{
								nativeEvent: {
									contentOffset: { y: scrollY },
								},
							},
						],
						{
							useNativeDriver: false,
						},
					)}
				>
					<View style={{ height: 230 - heightHeader }} />
					<View
						style={{
							marginVertical: 10,
							paddingHorizontal: 20,
						}}
					>
						<Text medium caption1 grayColor>
							{getRelativeTime(createdDate)}
						</Text>
						<Text title1 semibold style={{ marginTop: 10 }}>
							{title}
						</Text>
					</View>

					{loading ? renderPlaceholder() : renderContent()}
				</ScrollView>
			</SafeAreaView>
			<Animated.View
				style={[
					styles.headerImageStyle,
					{
						opacity: headerImageOpacity,
						height: heightViewImg,
					},
				]}
			>
				<Image source={{ uri: imageLink }} style={{ height: '100%', width: '100%' }} />
				<TouchableOpacity
					style={[styles.viewIcon, { backgroundColor: colors.primaryLight }]}
					onPress={() => console.log('Your code')}
				>
					<ProfileAuthor image={{ uri: source.logoLink }} size={20} />
				</TouchableOpacity>
			</Animated.View>
			<Animated.View style={[styles.headerStyle, { position: 'absolute' }]}>
				<SafeAreaView style={{ width: '100%' }} forceInset={{ top: 'always', bottom: 'never' }}>
					<Header
						title=""
						renderLeft={() => {
							return (
								<Animated.Image
									resizeMode="contain"
									style={[
										styles.icon,
										{
											transform: [
												{
													scaleX: I18nManager.isRTL ? -1 : 1,
												},
											],
											tintColor: headerBackgroundColor,
										},
									]}
									source={Images.angleLeft}
								/>
							)
						}}
						renderRight={() => {
							return (
								<Animated.Image
									resizeMode="contain"
									style={[
										styles.icon,
										{
											tintColor: headerBackgroundColor,
										},
									]}
									source={Images.shareAltSolid}
								/>
							)
						}}
						onPressLeft={() => {
							navigation.goBack()
						}}
						onPressRight={onShare}
					/>
				</SafeAreaView>
			</Animated.View>
		</View>
	)
}

export default PostDetail
