import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, LinearProgress } from "react-native-elements";
import { Text, View } from "./Themed";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { updateDownload } from "../store/actions/download";

function DownloadItem(props: any) {
  const { downloadItem } = props;
  // const displayId = downloadItem.movieId ? downloadItem.movieId : downloadItem.episodeId;
  // const displayItemList = 
  //the two above are for displaying name of download item.
  const [progress, setProgress] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dispatch = useDispatch();
  const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log("progress: ", progress);
    if (progress > 0) {
      setIsLoading(false);
    }
    setProgress(progress);
  };

  // if(downloadItem.downloaded === true){
  //   setProgress(1);
  // }

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

  useEffect(() => {
    if (progress === 0 && !downloadItem.downloaded) {
      startDownload();
    } else if (progress === 1) {
      const update = async () =>
        await dispatch(updateDownload(downloadItem.downloadId));
      update();
    }
  }, [startDownload,]);

  const pauseOrResume = isPaused ? (
    <MaterialCommunityIcons name="play" size={24} color="lightgrey" />
  ) : (
    <MaterialCommunityIcons name="pause" size={24} color="lightgrey" />
  );

  // const downloadedView = ;

  const [isCanceled, setIsCanceled] = useState(false);
  const containerStyle = isCanceled
    ? { ...styles.container, backgroundColor: "darkgrey" }
    : styles.container;
  return (
    <View style={containerStyle}>
      <View style={styles.titleCon}>
        <Text style={styles.title}>Mountain Tigers</Text>
      </View>
      <View style={styles.pCon}>
        <LinearProgress
          color="lightgreen"
          trackColor="grey"
          value={downloadItem.downloaded ? 1 : progress}
          variant="determinate"
        />
      </View>
      {progress === 1 || downloadItem.downloaded ? (
        <View style={styles.checkIcon}>
          <Feather name="check-square" size={24} color="white" />
        </View>
      ) : (
        <>
          <View style={{ ...styles.button, marginLeft: 5 }}>
            <Button
              // buttonStyle={{marginLeft: 30}}
              buttonStyle={styles.button}
              icon={pauseOrResume}
              onPress={isPaused ? resumDownload : pauseDownload}
            />
          </View>
          <View style={{ ...styles.button, marginLeft: 5 }}>
            <Button
              // buttonStyle={{marginLeft: 30}}
              buttonStyle={styles.button}
              icon={
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="lightgrey"
                />
              }
              onPress={async () => {
                try {
                  await resumableDownload.current.cancelAsync();
                  setIsCanceled(true);
                } catch (error) {
                  alert(error);
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 45,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  titleCon: {
    width: 85,
    marginRight: 10,
    backgroundColor: "transparent",
  },
  pCon: {
    width: "50%",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 35,
    height: 35,
    borderRadius: 5,
    padding: 0,
    backgroundColor: "transparent",
  },
  checkIcon: {
    alignItems: "center",
    width: 85,
  },
});
export default DownloadItem;
