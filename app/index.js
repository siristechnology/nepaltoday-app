import { persistor, store } from "app/store";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
console.disableYellowBox = true;
import * as Utils from "@utils";
Utils.setupLayoutAnimation();

const Mazi = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Mazi;
