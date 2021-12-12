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
  const searchedMovie: [] = useSelector(
    (state) => state.movies.searchedMovieByName
  );

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFoundMessage, setNotfoundMessage] = useState(null);

  const dispatch = useDispatch();
  const emp = async () => {
    console.log('the length is zero now!')
    console.log(search)
    await dispatch(movieActions.emptySearchHandler());
  }
  useEffect(() => {
    if (search.length === 0) {
      emp();
    }

  }, [search.length])

  const searchHandler = async (title: any) => {


    try {
      setError(null);
      setIsLoading(true);
      await dispatch(movieActions.searchMovieByName(title));

      setIsLoading(false);
      if (searchedMovie.length === 0) {
        setNotfoundMessage('No match found!')
      }
    } catch (err: any) {
      setError(err.message);
      alert(err.message)
      setIsLoading(false);
      console.log(err.message);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const searchNotfoundHandler = (text: string) => {
    console.log(text);

    setSearch(text);
    console.log('====================================');
    console.log(search);
    console.log('====================================');
    if (text.length === 0) {
      setNotfoundMessage(null)
    }


  }

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <TextInput
          placeholder="Search..."
          onChangeText={(text: string) => searchNotfoundHandler(text)}
          value={search}
          style={styles.searchInput}
        />
        <Button title="Search" onPress={() => searchHandler(search)} disabled={search.length === 0} color={search.length === 0 ? Colors.secondary : Colors.primary} />

      </View>
      {searchedMovie.length === 0 || search.length === 0 ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: '#FFF', fontSize: 25, }}>{notFoundMessage}</Text></View> : <FlatList
          data={searchedMovie}
          keyExtractor={(item, index) => item.title}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.setParams("MovieDetailScreen", { movieId: item.id });

                  navigation.navigate("MovieDetailScreen", { movieId: item.id });
                  setNotfoundMessage(null)
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
                  <View style={{ flexDirection: "row", height: 35, width: 200 }}>
                    <Text style={{ color: "#FFF", fontSize: 18, marginLeft: 10 }}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", height: 44, width: 200 }}>
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
        />}
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
  searchInput: {
    width: '70%',
    marginRight: 10,
    height: 37,
    borderColor: Colors.secondary,
    borderWidth: 1,
    backgroundColor: '#FFF',
    paddingLeft: 5,
    borderRadius: 5,

  }
});
export default SearchScreen;
