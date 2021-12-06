import React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { View, Text } from "./../components/Themed";
import Navigation from "../navigation/index";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedComingSoon } from "../store/actions/Comingsoon";

function HomeCategories(props: any) {
  const { category, isComingSoon } = props;
  const dispatch = useDispatch();
  const movie = isComingSoon
    ? null
    : useSelector((state) => state.movies.availableMovies);
  const comingSoons: [] = isComingSoon
    ? useSelector((state) => state.comingSoon.comingSoonList)
    : null;
  console.log(category.id);
  console.log("CAAAAAAAAAAAAAAAAAAAAA ", movie);
  const filteredComings = comingSoons
    ? comingSoons.filter((item: any) => item.category_id["id"] === category.id)
    : [];
  const navigation = useNavigation();

  console.log("ffffffffff", movie);

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginVertical: 10,
          marginLeft: 10,
          color: "#FFF",
          fontSize: 20,
        }}
      >
        {category.title}
      </Text>
      <FlatList
        data={isComingSoon ? filteredComings : movie}
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%",
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
    // aspectRatio: 16 / 9,
  },
});
export default HomeCategories;
