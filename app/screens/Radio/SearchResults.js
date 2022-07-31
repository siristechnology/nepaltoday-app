import React from 'react'
import { FlatList, View } from 'react-native'
import { CategoryList } from '@components'
import styles from './styles'

const Index = ({ search, fmList, loading, onPlay, onFavourite }) => {
	const filteredList = fmList.filter(
		(f) =>
			f.title.toLowerCase().includes(search.toLowerCase()) ||
			f.province.toLowerCase().includes(search.toLowerCase()),
	)

	return (
		<View style={styles.paddingView}>
			<FlatList
				contentContainerStyle={{ marginTop: 15 }}
				showsHorizontalScrollIndicator={false}
				data={filteredList}
				keyExtractor={(item) => item.id}
				renderItem={({ item, index }) => (
					<CategoryList
						loading={loading}
						onPress={() => onPlay(item)}
						style={{
							marginBottom: index == filteredList.length - 1 ? 0 : 15,
						}}
						image={{ uri: item.artwork }}
						title={item.title}
						subtitle={item.province}
					/>
				)}
			/>
		</View>
	)
}

export default Index
