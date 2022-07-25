import ProfileAuthor from '@components/Profile/Author'
import Text from '@components/Text'
import { BaseColor, Images } from '@config'
import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import Loading from './Loading'
import { getRelativeTime } from '../../../helper/time'

const News43 = (props) => {
	const { article, style, onPress, loading } = props
	if (loading || !article) {
		return <Loading style={style} />
	}

	return (
		<TouchableOpacity style={style} onPress={onPress}>
			<ImageBackground source={{ uri: article.imageLink }} style={styles.imageBackground} borderRadius={8}>
				<View style={styles.viewBackground}>
					<View style={styles.viewItem}>
						<ProfileAuthor
							styleThumb={styles.styleThumb}
							image={{ uri: article.source.logoLink }}
							styleName={{ color: BaseColor.whiteColor }}
							styleDescription={{
								color: BaseColor.whiteColor,
							}}
							name={`${article.source.name}`}
							description={getRelativeTime(article.createdDate)}
						/>
					</View>
					<Text title3 whiteColor semibold>
						{article.title}
					</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	)
}

News43.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	image: PropTypes.node.isRequired,
	avatar: PropTypes.node.isRequired,
	name: PropTypes.string,
	description: PropTypes.string,
	title: PropTypes.string,
	onPress: PropTypes.func,
}

News43.defaultProps = {
	style: {},
	image: Images.news,
	avatar: Images.profile2,
	name: '',
	description: '',
	title: '',
	onPress: () => {},
}

export default News43
