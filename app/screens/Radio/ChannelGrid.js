import React from 'react'
import { View, ScrollView, FlatList } from 'react-native'
import { CardChannelGrid, Text } from '@components'

const ChannelGrid = ({ title, fmList, onFMSelect, styles }) => {
	return (
		<View style={[{ paddingTop: 10 }, styles.paddingView]}>
			<Text title3 bold style={styles.title}>
				{title}
			</Text>
			<ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
				<FlatList
					contentContainerStyle={{ alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}
					data={fmList}
					keyExtractor={(item) => item.id}
					scrollEnabled={false}
					numColumns={10}
					renderItem={({ item, index }) => (
						<CardChannelGrid
							onPress={() => onFMSelect(item)}
							style={{
								paddingRight: index == fmList.length - 1 ? 0 : 10,
								width: 90,
								height: 90,
								marginBottom: 10,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							imgStyle={{
								width: 70,
								height: 70,
							}}
							textStyle={{ fontSize: 16, width: 80 }}
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
