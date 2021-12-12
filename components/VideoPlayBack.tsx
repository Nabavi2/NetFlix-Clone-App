import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Video } from "expo-av";
import { Playback } from "expo-av/build/AV";
import { Ionicons } from "@expo/vector-icons";

function VideoPlayBack(props: any) {
  const { episode } = props;

  const [status, setStatus] = useState({});
  const video = useRef<Playback>(null);

  useEffect(() => {
    if (!video) {
      return;
    }
    (async () => {
      await video?.current?.unloadAsync();
      await video?.current?.loadAsync({ uri: episode.video }, {}, false);
    })();
  }, [episode]);
  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: episode.video }}
        posterSource={{ uri: episode.poster }}
        useNativeControls
        usePoster={true}
        isLooping={true}
        posterStyle={{ resizeMode: "cover" }}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        resizeMode="contain"
      />
      {!status.isPlaying && (
        <Ionicons
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          style={{ position: "absolute", zIndex: 100, top: Dimensions.get("screen").height * 0.08, left: Dimensions.get("screen").width * 0.38 }}
          name="play"
          size={100}
          color="#FFF"
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  video: {
    aspectRatio: 16 / 9,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default VideoPlayBack;
