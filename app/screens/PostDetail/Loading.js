import React from 'react'
import { View } from 'react-native'
import { Placeholder, PlaceholderLine } from 'rn-placeholder'

const Loading = () => {
	const holders = Array.from(Array(5))

	return (
		<View style={{ paddingTop: 60, padding: 20 }}>
			<Placeholder>
				<PlaceholderLine height={20} width={100} />
				{holders.map((item, index) => (
					<PlaceholderLine key={index} height={15} width={90} />
				))}
			</Placeholder>
		</View>
	)
}

export default Loading
