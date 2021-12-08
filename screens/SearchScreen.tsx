import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Image,
  Button,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/Colors";
import * as movieActions from "../store/actions/movie";
import { useIsFocused } from "@react-navigation/core";
import { EmptyList } from "./../store/actions/movie";

function SearchScreen() {
  const searchedMovie = useSelector(
    (state) => state.movies.searchedMovieByName
  );

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const searchHandler = async (title: any) => {
    try {
      setError(null);
      setIsLoading(true);
      await dispatch(movieActions.searchMovieByName(title));
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      console.log(err.message);
    }
  };

  const focused = useIsFocused();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text: string) => setSearch(text)}
        value={search}
      />
      <Button title="Search" onPress={() => searchHandler(search)} />
      <FlatList
        data={searchedMovie}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.setParams("MovieDetailScreen", { movieId: item.id });
                navigation.navigate("MovieDetailScreen", { movieId: item.id });
              }}
              style={{
                flexDirection: "row",
                width: "90%",
                marginTop: 20,
                height: 80,
              }}
            >
              <Image style={styles.image} source={{ uri: item.poster }} />
              <View style={{ justifyContent: "center" }}>
                <View style={{ flexDirection: "row", height: 35, width: 150 }}>
                  {/* <Text style={{ color: Colors.secondary, fontSize: 17, marginRight: 10, marginLeft: 10, }}></Text> */}
                  <Text style={{ color: "#FFF", fontSize: 18, marginLeft: 10 }}>
                    {item.title}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", height: 34, width: 150 }}>
                  <Text
                    style={{
                      color: Colors.secondary,
                      fontSize: 15,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  >
                    {" "}
                    Duration:
                  </Text>
                  <Text style={{ color: "#a8b4b5", fontSize: 18 }}>
                    {item.duration}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
        style={{ marginLeft: 10 }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              width: "90%",
              backgroundColor: Colors.secondary,
            }}
          ></View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    marginLeft: Dimensions.get("screen").width * 0.012,
    marginBottom: 10,
    width: 120,
    height: 70,
    borderRadius: 5,
    borderColor: "#c75a5f",
    resizeMode: "cover",
  },
  input: {
    borderColor: "grey",
    width: "96%",
    borderWidth: 1,
  },
});
export default SearchScreen;
