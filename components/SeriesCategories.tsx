import React from "react";
import { StyleSheet, Image, FlatList, Pressable } from "react-native";
import { View, Text } from "./../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function SeriesCategories(props: any) {
  const { category } = props;
  const episode = useSelector((state) => state.series.availableEpisode);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ margin: 10, color: "#FFF", fontSize: 20 }}>
        {category.title}
      </Text>
      <FlatList
        data={episode}
        key={episode.id}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("MovieDetailScreen", {
                  episodeId: item.id,
                });
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
    height: 240,
  },
  image: {
    overflow: "hidden",
    width: 130,
    height: 180,
    borderRadius: 7,
    margin: 8,
    alignSelf: "center",
    resizeMode: "cover",
  },
});
export default SeriesCategories;
