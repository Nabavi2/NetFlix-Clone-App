import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import DownloadItem from "../components/DownloadItem";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { fetchDownloads } from "../store/actions/DownloadActions";
import { RootTabScreenProps } from "../types";

export default function DownloadScreen() {

  const dispatch = useDispatch();

  
  const downloads: [] = useSelector((state) => state.download.downloadList);
  console.log("this is the download list: ");
  
  console.log(downloads.length);
  // const [isInit, setIsInit] = useState(true);
  const fetch = async () => {
    await dispatch(fetchDownloads())
  }  
  useEffect(() => {
    
    if(downloads.length === 0){
      fetch();
    }

    return () => {

    }
  },[dispatch,fetch]);

  return (
    <FlatList
    
    data={downloads}
    keyExtractor={(item: any) => item.downloadId}
    renderItem={({ item }) => 
    <DownloadItem downloadItem={item} />
  }
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
