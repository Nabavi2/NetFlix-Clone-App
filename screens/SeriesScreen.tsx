import React, { useCallback, useEffect, useState } from "react";

import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { View } from "./../components/Themed";
import * as seriesActions from "../store/actions/series";
import { useDispatch, useSelector } from "react-redux";
import SeriesCategories from "../components/SeriesCategories";
import Colors from "../constants/Colors";

function SeriesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const category = useSelector((state) => state.category.availableCategories);

  const dispatch = useDispatch();
  const movieAndSeriesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(seriesActions.fetchSeason());
      await dispatch(seriesActions.fetchSeries());
      await dispatch(seriesActions.fetchEpisode());
      setIsLoading(false);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    movieAndSeriesHandler();
  }, [dispatch, movieAndSeriesHandler]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        renderItem={({ item }) => <SeriesCategories category={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "96%",
    borderRadius: 7,
    margin: 8,
    alignSelf: "center",
    marginHorizontal: 10,
    padding: 8,
    resizeMode: "cover",
    aspectRatio: 17 / 9,
    marginVertical: 10,
  },
});
export default SeriesScreen;
