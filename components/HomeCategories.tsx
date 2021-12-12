import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { View, Text } from "./../components/Themed";
import Navigation from "../navigation/index";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedComingSoon } from "../store/actions/Comingsoon";
import * as movieActions from "../store/actions/movie";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../constants/links";

function HomeCategories(props: any) {
  const { category, isComingSoon } = props;

  const [arrLength, setArrLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(0);
  const first = useRef(true);
  const dispatch = useDispatch();
  const movie: [] = isComingSoon
    ? []
    : useSelector((state) => state.movies.availableMovies);
  const comingSoons: [] = isComingSoon
    ? useSelector((state) => state.comingSoon.comingSoonList)
    : null;
  console.log(category.id);

  const filteredMovies = movie.filter(
    (item: any) => item.category_id["id"] === category.id
  );

  const filteredComings = comingSoons
    ? comingSoons.filter((item: any) => item.category_id["id"] === category.id)
    : [];
  const navigation = useNavigation();

  const getLength = async () => {
    const token = await AsyncStorage.getItem("userData");
    const response = await fetch(
      `${url}/movies/count?category_id_eq=${category.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    setArrLength(res);
  };

  const movieHandler = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      await dispatch(movieActions.fetchMovies(start, category.id));
      setStart(start + 5);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);

      alert(err.message);
      setIsLoading(false);
    }
  }, [dispatch, start]);

  useEffect(() => {
    if (first.current && !isComingSoon) {
      first.current = false;
      movieHandler();
      getLength();
    }
  }, [dispatch, movieHandler]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 0,
          color: "#FFF",
          fontSize: 20,
        }}
      >
        {category.title}
      </Text>
      {!isLoading ? (
        <FlatList
          initialScrollIndex={start === 0 || start === 5 ? 0 : start - 3}
          decelerationRate={0.85}
          onEndReached={
            arrLength === filteredMovies.length ? null : () => movieHandler()
          }
          onEndReachedThreshold={0}
          data={isComingSoon ? filteredComings : filteredMovies}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={async () => {
                  if (isComingSoon) {
                    await dispatch(updateSelectedComingSoon(item));
                  } else {
                    navigation.setParams("MovieDetailScreen", {
                      movieId: item.id,
                    });
                    navigation.navigate("MovieDetailScreen", {
                      movieId: item.id,
                    });
                  }
                }}
              >
                <Image style={styles.image} source={{ uri: item.poster }} />
              </Pressable>
            );
          }}
          horizontal
        />
      ) : (
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 12,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.25,
  },
  image: {
    overflow: "hidden",
    width: Dimensions.get("screen").width * 0.25,
    height: Dimensions.get("screen").height * 0.18,
    borderRadius: 7,
    margin: 8,
    alignSelf: "center",
    resizeMode: "cover",
  },
});
export default HomeCategories;
