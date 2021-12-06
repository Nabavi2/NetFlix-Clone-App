import React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { View, Text } from "./../components/Themed";
import Navigation from "../navigation/index";
import { useNavigation } from "@react-navigation/native";
import movie from "../data/movie";
import { Episode } from "../types";
import MovieDetailScreen from "../screens/MovieDetailScreen";
import { AntDesign } from "@expo/vector-icons";

interface EpisodesItem {
  episode: Episode;
  onPress: (episode: any) => {};
}
function EpisodeItems(props: EpisodesItem) {
  const { episode, onPress } = props;

  return (
    <Pressable
      onPress={() => onPress}
      style={{ flex: 1, padding: 8, backgroundColor: "#000" }}
    >
      <View style={styles.container}>
        <Image style={styles.imageView} source={{ uri: episode.poster }} />
        <View style={styles.rowContainer}>
          <Text style={{ fontSize: 12, color: "#FFF" }}>{episode.title}</Text>
          <Text style={{ fontSize: 10, color: "#968d8c" }}>
            {" "}
            {episode.duration}{" "}
          </Text>
        </View>
        <AntDesign name="download" size={24} color="#FFF" />
      </View>
      <Text style={{ marginHorizontal: 10, marginBottom: 10, color: "#FFF" }}>
        {" "}
        {episode.plot}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 5,
    alignItems: "center",
    backgroundColor: "#000",
  },
  rowContainer: {
    width: 150,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#000",
    marginHorizontal: 8,
  },
  imageView: {
    width: 130,
    aspectRatio: 16 / 9,
    resizeMode: "cover",
    borderRadius: 7,
    alignItems: "center",
    marginRight: 10,
  },
});
export default EpisodeItems;
