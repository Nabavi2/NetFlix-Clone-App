import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import HomeCategories from "../components/HomeCategories";
import { fetchComingSoons } from "../store/actions/Comingsoon";
function ComingSoonScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const category = useSelector((state) => state.category.availableCategories);
  const selectedComingSoon = useSelector(
    (state) => state.comingSoon.selectedComingSoon
  );

  const loadComingSoon = useCallback(async () => {
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(fetchComingSoons());
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadComingSoon().then(() => setIsLoading(false));
  }, [dispatch, loadComingSoon]);
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
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: selectedComingSoon!.poster ? selectedComingSoon.poster : null,
        }}
        style={styles.image}
      />
      <View style={styles.texts}>
        <Text style={styles.title}>{selectedComingSoon!.title}</Text>
        <Text style={styles.subtitle}>Cast: {selectedComingSoon!.cast}</Text>
        <Text style={styles.subtitle}>
          Creator: {selectedComingSoon!.creatorName}
        </Text>
        <Text style={styles.subtitle}>
          Release: {selectedComingSoon!.releaseDate}
        </Text>
      </View>
      <FlatList
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadComingSoon}
            colors={["red"]}
          />
        }
        data={category}
        renderItem={({ item }) => (
          <HomeCategories category={item} isComingSoon={true} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.3,
    resizeMode: "cover",
    aspectRatio: 11 / 9,
    alignSelf: "center",


  },
  texts: {
    width: "100%",
    marginVertical: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginVertical: 5,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 15,
  },
});

export default ComingSoonScreen;
