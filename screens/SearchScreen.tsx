import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
} from "react-native";
import { SearchBar } from "react-native-elements";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";

function SearchScreen() {
  const episode = useSelector((state) => state.series.availableEpisode);
  const movies = useSelector((state) => state.movies.availableMovies);
  const movie = useSelector((state) => state.movies.availableMovies);

  const movieIdArray = movie.map((MovieId: any) => MovieId.id);
  // const data = movies.concat(episode)

  const id = movieIdArray.map((movieId: any) => movieId.id);

  console.log(
    "CONCAT DATA DADADADAD IN SEARCH SCREAN DATA  ",
    movieIdArray,
    "IIIDDDDD AAAAARRRRRRRAAAAAYYYYYvv   ",
    id
  );

  const [filterData, setFilterData] = useState(movie);
  const [search, setSearch] = useState();

  let i = 0;
  const searchFilterFunction = (text: any) => {
    if (text) {
      const newData = filterData.filter((item: any) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "not found".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("skldddddkkkdskdsklsdklsdklsdk  ", newData);
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(movie);
      setSearch(text);
    }
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SearchBar
        placeholder="Search..."
        onChangeText={(text) => searchFilterFunction(text)}
        autoCorrect={true}
        value={search}
      />

      <FlatList
        data={filterData}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.setParams("MovieDetailScreen", { movieId: item.id });
                navigation.setParams("MovieDetailScreen", {
                  episodeId: item.id,
                });
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
                  <Text style={{ color: "#FFF", fontSize: 20, marginLeft: 10 }}>
                    {item.title}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", height: 34, width: 150 }}>
                  <Text
                    style={{
                      color: "#a8b4b5",
                      fontSize: 17,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  >
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
    marginLeft: 10,
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
