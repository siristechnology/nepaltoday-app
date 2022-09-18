import { Text } from '@components'
import { BaseColor, useTheme } from '@config'
import React from 'react'

import { Dimensions, View } from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'
import styles from './styles'

const initialLayout = { width: Dimensions.get('window').width }

const TabSlider = (props) => {
	const { colors } = useTheme()

	const renderTabBar = (props) => (
		<TabBar
			{...props}
			renderIndicator={() => null}
			scrollEnabled
			style={[styles.tabbar, { backgroundColor: colors.background }]}
			tabStyle={styles.tab}
			activeColor={BaseColor.whiteColor}
			inactiveColor={colors.text}
			renderLabel={({ route, focused, color }) => {
				return (
					<View
						style={[
							styles.viewLabel,
							{
								borderBottomColor: focused ? colors.primary : 'transparent',
							},
						]}
					>
						<Text style={{ width: '100%' }} subhead bold={focused} grayColor={!focused}>
							{route.title}
						</Text>
					</View>
				)
			}}
		/>
	)

	return <TabView lazy scrollEnabled={true} initialLayout={initialLayout} renderTabBar={renderTabBar} {...props} />
}

export default TabSlider
