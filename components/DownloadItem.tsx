import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { Button, LinearProgress } from "react-native-elements";
import { Text, View } from "./Themed";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import { sendPauseDownload, updateDownload } from "../store/actions/download";
import { useIsFocused } from "@react-navigation/core";
import moment from "moment";

function DownloadItem(props: any) {
  const { downloadItem } = props;

  const [progress, setProgress] = useState(
    downloadItem.progress ? downloadItem.progress : 0
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const bytesWritten = useRef(null);
  const isInit = useRef(true);

  const [isDowloaded, setIsDownlaoded] = useState(downloadItem.downloaded);

  // finding display item for rendering of name.
  const displays: [] = downloadItem.movieId
    ? useSelector((state) => state.movies.availableMovies)
    : useSelector((state) => state.series.availableEpisode);

  const displayId = downloadItem.movieId
    ? downloadItem.movieId
    : downloadItem.episodeId;

  const selectedDisplay: any = displays.find((item) => item.id === displayId)!;

  // const saveFile = async () => {
  //   try {
  //     const asset = await MediaLibrary.createAssetAsync(
  //       resumableDownload.current.fileUri
  //     );
  //     const album = await MediaLibrary.getAlbumAsync("Download");
  //     await MediaLibrary.migrateAlbumIfNeededAsync(album);
  //     // MediaLibr
  //     if (album == null) {
  //       await MediaLibrary.createAlbumAsync("Download", asset, true);
  //     } else {
  //       await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
  //     }
  //     alert("Your item is downloaded!!!");
  //   } catch (e) {
  //   }
  // };

  const dispatch = useDispatch();
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;

    bytesWritten.current = downloadProgress.totalBytesWritten;

    setProgress(progress);
  };

  const downloadData = downloadItem.download;

  //creating downloadResumable.
  const resumableDownload = useRef(
    FileSystem.createDownloadResumable(
      downloadData.url,
      downloadData.fileUri,
      downloadData.options,
      callback,
      downloadData.resumeData ? downloadData.resumeData : null
    )
  );

  const startDownload = async () => {
    try {
      await resumableDownload.current.downloadAsync();
    } catch (err) {
      alert("could not start download!");
    }
  };

  const pauseDownload = async () => {
    try {
      setIsLoading(true);
      const saveData = await resumableDownload.current.pauseAsync();

      await dispatch(
        sendPauseDownload(
          downloadItem.downloadId,
          JSON.stringify(saveData),
          progress
        )
      );

      setIsLoading(false);
      setIsPaused(true);
    } catch (e) {
      alert(e.message);
    }
  };

  const resumDownload = async () => {
    try {
      setIsPaused(false);
      await resumableDownload.current.resumeAsync();
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    if (downloadData.resumeData && isInit.current) {
      isInit.current = false;
      setIsPaused(true);
      return;
    }
    if (progress === 0 && !downloadItem.downloaded) {
      startDownload();
    } else if (progress === 1 || downloadItem.downloaded) {
      setIsDownlaoded(true);
      const update = async () =>
        await dispatch(updateDownload(downloadItem.downloadId));
      update();
    }
  }, [dispatch, updateDownload, progress]);

  const pauseOrResume = isPaused ? (
    <MaterialCommunityIcons name="play" size={24} color="lightgrey" />
  ) : (
    <MaterialCommunityIcons name="pause" size={24} color="lightgrey" />
  );
  const size = Dimensions.get("screen");
  return (
    <View
      style={
        isDowloaded
          ? styles.container
          : { ...styles.container, height: size.height * 0.155 }
      }
    >
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
              loading={isLoading}
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
    overflow: "hidden",
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
    marginBottom: 10,
  },
  image: {
    width: Dimensions.get("screen").width * 0.22,
    height: Dimensions.get("screen").height * 0.1,
    borderRadius: 3,
  },
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
