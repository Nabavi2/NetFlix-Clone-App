import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

function ComingSoonItem(props: any) {
  const { item } = props;

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300, alignSelf: "center", marginTop: 30, borderRadius: 2, }}
        resizeMode="contain"
        source={{ uri: item.poster }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>Cast: {item.cast}</Text>
        <Text style={styles.subtitle}>Creator: {item.creatorName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: "#444",
    borderRadius: 7,
    width: "80%",
    height: 450,
    marginVertical: 10,
  },
  titleContainer: {
    padding: 10,
    backgroundColor: "transparent",
    marginLeft: 7,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "bold",
  },
  subtitle: {
    color: "lightgrey",
  },
});

export default ComingSoonItem;
