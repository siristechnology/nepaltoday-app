import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { CardChannelGrid, Text } from '@components'
import { useTheme } from '@config'
import * as Utils from '@utils'

const ChannelGrid = ({ title, fmList, onFMSelect, styles }) => {
	const { colors } = useTheme()

	return (
		<View style={[{ marginTop: 20 }]}>
			<Text title3 bold style={[styles.title, styles.paddingView]}>
				{title}
			</Text>
			<ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<FlatList
					contentContainerStyle={{
						alignSelf: 'flex-start',
					}}
					data={fmList}
					keyExtractor={(item) => item.id}
					scrollEnabled={false}
					numColumns={10}
					renderItem={({ item }) => (
						<CardChannelGrid
							onPress={() => onFMSelect(item)}
							style={{
								paddingTop: Utils.scaleWithPixel(10),
								width: Utils.scaleWithPixel(100),
								height: Utils.scaleWithPixel(100),
								alignItems: 'center',
								justifyContent: 'center',
							}}
							imgStyle={{
								width: Utils.scaleWithPixel(70),
								height: Utils.scaleWithPixel(70),
								borderWidth: 1,
								borderColor: colors.border,
							}}
							textStyle={{ fontSize: 16, textAlign: 'center' }}
							// loading={loading}
							image={{ uri: item.artwork }}
							title={item.title}
						/>
					)}
				/>
			</ScrollView>
		</View>
	)
}

export default ChannelGrid
