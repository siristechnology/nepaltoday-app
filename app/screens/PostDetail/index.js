import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Animated, FlatList, I18nManager, ScrollView, Share, TouchableOpacity, View } from 'react-native'
import { Header, Image, NewsList, SafeAreaView, Tag, Text, PlaceholderLine, Placeholder } from '@components'
import ProfileAuthor from '@components/Profile/Author'
import { BaseColor, BaseStyle, useTheme, Images } from '@config'
import { HomeListData } from '@data'
import * as Utils from '@utils'
import { getRelativeTime } from '../../helper/time'
import styles from './styles'

const facilitiesInit = [
	{ id: '1', icon: 'wifi', name: 'News', checked: true },
	{ id: '2', icon: 'bath', name: 'Impeachment' },
	{ id: '3', icon: 'paw', name: 'West Bank' },
	{ id: '4', icon: 'bus', name: 'Donald Trump' },
	{ id: '5', icon: 'cart-plus', name: 'Corona Virus' },
	{ id: '6', icon: 'clock', name: 'White House' },
]

const PostDetail = (props) => {
	const { navigation, route } = props
	const { t } = useTranslation()
	const { colors } = useTheme()
	const article = route?.params?.article
	const [loading, setLoading] = useState(true)
	const [list, setList] = useState(HomeListData)
	const [facilities, setFacilities] = useState(facilitiesInit)
	const [heightHeader, setHeightHeader] = useState(Utils.heightHeader())
	const scrollY = useRef(new Animated.Value(0)).current
	const { category, imageLink, title, source, createdDate, content } = article

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])

	const goPostDetail = (item) => () => {
		navigation.push('PostDetail', { item: item })
	}

	const onShare = async () => {
		try {
			const result = await Share.share({
				message: 'https://codecanyon.net/user/passionui/portfolio',
			})

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message)
		}
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
						body2
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
				<Text
					title3
					semibold
					style={{
						paddingHorizontal: 20,
						paddingTop: 15,
						paddingBottom: 5,
					}}
				>
					{t('tags')}
				</Text>
				<View style={styles.wrapContent}>
					{facilities.map((item) => {
						return (
							<Tag
								chip
								key={item.id}
								style={{
									marginTop: 10,
									marginRight: 10,
									paddingHorizontal: 10,
								}}
							>
								{item.name}
							</Tag>
						)
					})}
				</View>
				<Text
					title3
					semibold
					style={{
						paddingHorizontal: 20,
						marginBottom: 20,
					}}
				>
					{'Related News'}
				</Text>
				<FlatList
					contentContainerStyle={{ paddingHorizontal: 20 }}
					data={list}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<NewsList
							image={item.image}
							date={item.date}
							title={item.title}
							subtitle={item.subtitle}
							style={{
								marginBottom: index == list.length - 1 ? 0 : 20,
							}}
							onPress={goPostDetail(item)}
						/>
					)}
				/>
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
