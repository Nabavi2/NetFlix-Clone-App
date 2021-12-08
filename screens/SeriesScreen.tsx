import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import movie from "../data/movie";
import { View, Text } from "./../components/Themed";
import HomeCategories from "../components/HomeCategories";
import * as movieActions from "../store/actions/movie";
import * as seriesActions from "../store/actions/series";
import * as categoryActions from "../store/actions/category";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./../models/Movie";
import SeriesCategories from "../components/SeriesCategories";
import Colors from "../constants/Colors";

function SeriesScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const category = useSelector((state) => state.category.availableCategories);

  const dispatch = useDispatch();
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
