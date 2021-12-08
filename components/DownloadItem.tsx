import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Button, LinearProgress } from "react-native-elements";
import { Text, View } from "./Themed";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { updateDownload } from "../store/actions/download";
import Movie from "../models/Movie";
import { useIsFocused } from "@react-navigation/core";

import moment from "moment";

function DownloadItem(props: any) {
  const { downloadItem } = props;

  const [progress, setProgress] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDowloaded, setIsDownlaoded] = useState(downloadItem.downloaded);

  // finding display item for rendering of name.
  const displays: [] = downloadItem.movieId
    ? useSelector((state) => state.movies.availableMovies)
    : useSelector((state) => state.series.availableEpisode);

  const displayId = downloadItem.movieId
    ? downloadItem.movieId
    : downloadItem.episodeId;

  const selectedDisplay: any = displays.find(
    (item, index, obj) => item.id === displayId
  )!;

  const saveFile = async () => {
    try {
      console.log("uUUUUUUUUUUUUUUUUUUUUU", resumableDownload.current.fileUri);

      const asset = await MediaLibrary.createAssetAsync(
        resumableDownload.current.fileUri
      );
      console.log("====================================");
      console.log(asset);
      console.log("====================================");
      const album = await MediaLibrary.getAlbumAsync("Download");
      await MediaLibrary.migrateAlbumIfNeededAsync(album);
      // MediaLibr
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, true);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
      }
      alert("Your item is downloaded!!!");
    } catch (e) {
      console.log(e);
    }
  };

  const dispatch = useDispatch();
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log("progress: ", progress);
    setProgress(progress);
  };

  const downloadData = downloadItem.download;
  //creating downloadResumable.
  const resumableDownload = useRef(
    FileSystem.createDownloadResumable(
      downloadData.url,
      downloadData.fileUri,
      downloadData.options,
      callback
      // downloadData.resumData,
    )
  );

  //starting download
  const startDownload = async () => {
    try {
      await resumableDownload.current.downloadAsync();
    } catch (err) {
      alert("could not start download!");
    }
  };

  //pausing donwload
  const pauseDownload = async () => {
    try {
      setIsPaused(true);
      await resumableDownload.current.pauseAsync();
      console.log("Paused download operation, saving for future retrieval");
      AsyncStorage.setItem(
        "pausedDownload",
        JSON.stringify(resumableDownload.current.savable())
      );
    } catch (e) {
      console.error(e);
    }
  };

  // resuming download
  const resumDownload = async () => {
    try {
      setIsPaused(false);
      const { uri } = await resumableDownload.current.resumeAsync();
      console.log("Finished downloading to ", uri);
    } catch (e) {
      console.error(e);
    }
  };
  const focused = useIsFocused();
  useEffect(() => {
    if (!focused) {
      pauseDownload();
    }
  }, [useIsFocused]);

  useEffect(() => {
    if (progress === 0 && !downloadItem.downloaded) {
      startDownload();
    } else if (progress === 1) {
      setIsDownlaoded(true);
      const update = async () =>
        await dispatch(updateDownload(downloadItem.downloadId));
      update();
    }
  }, [startDownload, dispatch, updateDownload]);

  const pauseOrResume = isPaused ? (
    <MaterialCommunityIcons name="play" size={24} color="lightgrey" />
  ) : (
    <MaterialCommunityIcons name="pause" size={24} color="lightgrey" />
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleAndImage}>
          <Image
            source={{ uri: selectedDisplay.poster }}
            style={styles.image}
          />

          <View style={styles.titleCon}>
            <Text style={styles.title}>
              {selectedDisplay ? selectedDisplay.title : "...."}
            </Text>
            <Text style={{ color: "lightgrey" }}>
              {moment(downloadItem.created_at).format("YYYY/DD/MM HH:mm")}
            </Text>
          </View>
        </View>
        {/* <View style={styles.saveButton}>
          <Button
            buttonStyle={styles.saveButton}
            icon={{ name: "save", color: "white", type: "materialIcons" }}
            onPress={saveFile}
          />
        </View> */}
      </View>
      {!isDowloaded ? (
        <View style={styles.bottomContainer}>
          <View style={styles.progCon}>
            <LinearProgress
              color="lightgreen"
              trackColor="grey"
              value={downloadItem.downloaded ? 1 : progress}
              variant="determinate"
            />
            <Text style={{ color: "white", alignSelf: "center" }}>
              {(progress * 100).toFixed(0)}%
            </Text>
          </View>
          <View style={{ ...styles.button, marginLeft: 10 }}>
            <Button
              buttonStyle={{ ...styles.button }}
              icon={pauseOrResume}
              onPress={isPaused ? resumDownload : pauseDownload}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.124,
    paddingHorizontal: 20,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flexDirection: "row",
    paddingRight: 0,
    justifyContent: "space-between",
    backgroundColor: "transparent",
    width: "100%",
    overflow: "visible",
  },
  image: { width: 80, height: 80, borderRadius: 3 },
  titleAndImage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  titleCon: {
    marginLeft: 10,
    backgroundColor: "transparent",
  },
  progCon: {
    backgroundColor: "transparent",
    paddingTop: 14,
    width: "90%",
    justifyContent: "center",
  },
  saveButton: {
    overflow: "hidden",
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 32,
    height: 30,
    borderRadius: 3,
    padding: 0,
    backgroundColor: "#444",
  },
});
export default DownloadItem;
