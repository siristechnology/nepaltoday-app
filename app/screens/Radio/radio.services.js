import AsyncStorage from '@react-native-async-storage/async-storage'
const FAVORITE_FMS = 'FAVORITE_FMS'

class RadioService {
	getFavorites = async (nid) => {
		const savedFavFmStr = await AsyncStorage.getItem(FAVORITE_FMS)
		const savedFavFms = savedFavFmStr != null ? JSON.parse(savedFavFmStr) : []
		return savedFavFms
	}

	saveFavorite = async (nid, fm) => {
		const savedFavFmStr = await AsyncStorage.getItem(FAVORITE_FMS)
		const savedFavFms = savedFavFmStr != null ? JSON.parse(savedFavFmStr) : []
		let allFavFms = savedFavFms

		if (savedFavFms.findIndex((f) => f.id == fm.id) == -1) {
			allFavFms = savedFavFms.concat(fm)
			AsyncStorage.setItem(FAVORITE_FMS, JSON.stringify(allFavFms))
			return allFavFms
		}
		return allFavFms
	}

	deleteFavorite = async (nid, fmId) => {
		const savedFavFmStr = await AsyncStorage.getItem(FAVORITE_FMS)
		const savedFavFms = savedFavFmStr != null ? JSON.parse(savedFavFmStr) : []

		const allFavFms = savedFavFms.filter((f) => f.id != fmId)
		AsyncStorage.setItem(FAVORITE_FMS, JSON.stringify(allFavFms))

		return allFavFms
	}
}

export default new RadioService()
