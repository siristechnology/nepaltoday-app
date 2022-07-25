import { persistor, store } from 'app/store'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './navigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as Utils from '@utils'
console.disableYellowBox = true
Utils.setupLayoutAnimation()

const NTApp = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaProvider>
					<App />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	)
}

export default NTApp
