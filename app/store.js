import { configureStore } from '@reduxjs/toolkit'
import appStateSlice from './screens/ScreenContainer/appStateSlice'

export default configureStore({
	reducer: {
		appState: appStateSlice,
	},
})
