import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { View, Text } from "./../components/Themed";
import HomeCategories from "../components/HomeCategories";
import * as categoryActions from "../store/actions/category";
import { useDispatch, useSelector } from "react-redux";
import DoubleTapToClose from "../components/OnBackPress";

function MovieScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);

  const category = useSelector((state) => state.category.availableCategories);

  const dispatch = useDispatch();
  const moviesFetchHandler = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(categoryActions.fetchCategories());

      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
      setIsLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    moviesFetchHandler();
  }, [dispatch, moviesFetchHandler]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#c75a5f" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        renderItem={({ item }) => <HomeCategories category={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "96%",
    borderRadius: 7,
    margin: 8,
    alignSelf: "center",
    marginHorizontal: 10,
    padding: 8,
    resizeMode: "cover",
    aspectRatio: 16 / 9,
    marginVertical: 10,
  },
});
export default MovieScreen;
