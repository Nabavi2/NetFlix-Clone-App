import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import { Playback } from "expo-av/build/AV";
import { Ionicons } from "@expo/vector-icons";
import Colors from '../constants/Colors';


function VideoPlayBack(props: any) {
  const { episode } = props;

  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const video = useRef<Playback>(null);

  useEffect(() => {
    if (!video) {
      return;
    }
    (async () => {
      await video?.current?.unloadAsync();
      await video?.current?.loadAsync({ uri: episode.video }, {}, false);

    })();
  }, [episode, setIsLoading]);

  return (
    <View>

      <Video
        ref={video}
        style={styles.video}
        source={{ uri: episode.video }}
        posterSource={{ uri: episode.poster }}
        usePoster={true}
        controls={true}
        onLoadStart={() => setIsLoading(true)}
        useNativeControls
        onReadyForDisplay={() => setIsLoading(false)}
        progressUpdateIntervalMillis={2000}
        onResponderStart={() => setStatus(status)}
        onLoad={() => setIsLoading(true)}
        posterStyle={{ resizeMode: "cover" }}
        onPlaybackStatusUpdate={(status) => {
          setStatus(() => status)
        }}
        resizeMode="contain"

      />
      {isLoading &&
        <ActivityIndicator
          animating
          color={Colors.primary}
          size="large"
          style={{ flex: 1, position: "absolute", top: "50%", left: "45%" }}
        />
      }


      {!status.isPlaying && !isLoading && (
        <Ionicons
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
          style={{
            position: "absolute",
            zIndex: 100,
            top: Dimensions.get("screen").height * 0.08,
            left: Dimensions.get("screen").width * 0.38,
          }}
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
