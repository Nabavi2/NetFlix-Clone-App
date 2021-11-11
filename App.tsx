import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import authReducer from "./store/reducers/Auth";

const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer);
export default function App() {


  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </Provider>
    );
  }
}
