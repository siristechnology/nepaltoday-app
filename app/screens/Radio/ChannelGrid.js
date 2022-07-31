import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { CardChannelGrid, Text } from '@components'
import { useTheme } from '@config'

const ChannelGrid = ({ title, fmList, onFMSelect, styles }) => {
	const { colors } = useTheme()

	return (
		<View style={[{ marginTop: 20 }, styles.paddingView]}>
			<Text title3 bold style={styles.title}>
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
					renderItem={({ item, index }) => (
						<CardChannelGrid
							onPress={() => onFMSelect(item)}
							style={{
								paddingTop: 10,
								width: 120,
								height: 120,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							imgStyle={{
								width: 90,
								height: 90,
								borderWidth: 1,
								borderColor: colors.border,
							}}
							textStyle={{ fontSize: 16, width: 100 }}
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
