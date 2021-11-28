import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import DownloadItem from "../components/DownloadItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetchDownloads } from "../store/actions/download";
import { RootTabScreenProps } from "../types";

export default function DownloadScreen() {

  const dispatch = useDispatch();


  const downloads: [] = useSelector((state) => state.download.downloadList);
  console.log(downloads);
  const [isInit, setIsInit] = useState(true);
  const fetch = async () => {
    await dispatch(fetchDownloads())
  }
  useEffect(() => {

    if (isInit) {
      setIsInit(false);
      fetch();
    }
  }, [dispatch, fetch]);

  return (
    // <View>
    //   <View ><Button title="fetch" onPress={fetch} /></View>
    <FlatList

      data={downloads}
      keyExtractor={(item: any) => item.downloadId}
      renderItem={({ item }) =>
        // <View style={{paddingLeft: 40}}><Text>{item.downloadId}</Text></View>
        <DownloadItem downloadItem={item} />
      }
    />
    // </View>
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
