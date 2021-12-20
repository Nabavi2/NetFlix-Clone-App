import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert,
} from "react-native";

import { View } from "../components/Themed";
import HomeCategories from "../components/HomeCategories";
import * as categoryActions from "../store/actions/category";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";

function MovieScreen() {
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [exitApp, setExitApp] = useState(false);
  const [error, setError] = useState(null);

=======
>>>>>>> ad137d27c14ce7c62a3ce7ee14c710cfbc530724
  const category = useSelector((state) => state.category.availableCategories);

  const dispatch = useDispatch();
  const moviesFetchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(categoryActions.fetchCategories());
      setIsLoading(false);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Attention", "Are you sure if you want to exit?", [
          { text: "No" },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    moviesFetchHandler();
  }, [dispatch, moviesFetchHandler]);
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
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
