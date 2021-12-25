import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { StatusBar } from "expo-status-bar";
import React from "react";
import useCachedResources from "./hooks/useCachedResources";
import { I18nManager } from "react-native";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import AuthReducer from "./store/reducers/AuthReducer";
import movieReducer from "./store/reducers/movie";
import seriesReducer from "./store/reducers/series";
import { DownloadReducer } from "./store/reducers/download";
import ComingSoonReducer from "./store/reducers/ComingSoon";
import CategoryReducer from "./store/reducers/category";
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
const rootReducer = combineReducers({
  auth: AuthReducer,
  movies: movieReducer,
  series: seriesReducer,
  download: DownloadReducer,
  comingSoon: ComingSoonReducer,
  category: CategoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="light" />
      </Provider>
    );
  }
}
