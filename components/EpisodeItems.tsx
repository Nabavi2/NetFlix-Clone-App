import React from "react";
import { StyleSheet, Image, Pressable } from "react-native";
import { View, Text } from "./../components/Themed";
import Colors from "../constants/Colors";

function EpisodeItems(props: any) {
  const { episode, onPress } = props;

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, padding: 8, backgroundColor: "#000" }}
    >
      <View style={styles.container}>
        <Image style={styles.imageView} source={{ uri: episode.poster }} />
        <View style={styles.rowContainer}>
          <Text style={{ fontSize: 15, color: "#FFF" }}>{episode.title}</Text>
          <Text style={{ fontSize: 13, color: Colors.secondary }}>
            {episode.duration}
          </Text>
        </View>
      </View>
      <Text style={{ marginHorizontal: 10, marginBottom: 10, color: "#FFF" }}>
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
