import { createSlice } from '@reduxjs/toolkit'

export const appStateSlice = createSlice({
	name: 'appState',
	initialState: {
		value: 'active',
	},
	reducers: {
		setAppState: (state, action) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setAppState } = appStateSlice.actions

export default appStateSlice.reducer
