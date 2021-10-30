import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Episode } from '../types';
import { Video } from 'expo-av'
import { Playback } from 'expo-av/build/AV';
interface VideoPlayBackItems {
    episode: Episode
}
function VideoPlayBack(props: VideoPlayBackItems) {
    const { episode } = props;
    // const [episodes, setEpisodes] = useState(episode);
    const [status, setStatus] = useState({});
    const video = useRef<Playback>(null);
    useEffect(() => {
        if (!video) {
            return;
        }
        (async () => {
            await video?.current?.unloadAsync();
            await video?.current?.loadAsync(
                { uri: episode.video },
                {},
                false
            )
        })()
    }, [episode])
    return (
        <Video
            ref={video}
            style={styles.video}
            source={{ uri: episode.video }}
            posterSource={{ uri: episode.poster }}
            useNativeControls
            usePoster={true}
            posterStyle={{ resizeMode: 'cover' }}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            resizeMode="contain"
        />
    );
}
const styles = StyleSheet.create({
    video: {
        aspectRatio: 16 / 9,
        width: '100%'

    }
})
export default VideoPlayBack;