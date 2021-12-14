import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DownloadItem from "../components/DownloadItem";
import { Text, View } from "../components/Themed";
import { fetchDownloads } from "../store/actions/download";

export default function DownloadScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, SetIsRefreshing] = useState(false);
  const downloads = useSelector((state) => state.download.downloadList);

  const loadDownloads = useCallback(async () => {
    SetIsRefreshing(true);
    setIsLoading(true);
    try {
      await dispatch(fetchDownloads());
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
    SetIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadDownloads();
  }, [dispatch, loadDownloads]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          paddingTop: 5,
        }}
      >
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (downloads.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: "lightgrey" }}>
          No download added yet. Try adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={loadDownloads}
          colors={["red"]}
        />
      }
      style={{ backgroundColor: "black" }}
      data={downloads}
      keyExtractor={(item: any) => item.downloadId}
      renderItem={({ item }) => <DownloadItem downloadItem={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
