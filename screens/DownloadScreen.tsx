import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import DownloadItem from "../components/DownloadItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetchDownloads } from "../store/actions/download";
import { RootTabScreenProps } from "../types";

export default function DownloadScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const downloads: [] = useSelector((state) => state.download.downloadList);
  console.log("this is the download list: keke");

  console.log(downloads);

  const loadDownloads = useCallback( async () => {
    setIsLoading(true);
    try{
        await dispatch(fetchDownloads());
    }catch(err){
        alert(err);
    }
    setIsLoading(false);
    
}, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadDownloads);
    return () => {
      unsubscribe();
    }
  })


  useEffect(() => {
      setIsLoading(true);
      loadDownloads().then(() => setIsLoading(false));        
  }, [dispatch, loadDownloads]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <FlatList
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
