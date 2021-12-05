import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Episode } from '../types';
import { Video, AVPlaybackStatus } from 'expo-av'
import { Playback } from 'expo-av/build/AV';
import { Ionicons } from '@expo/vector-icons';
// interface VideoPlayBackItems {
//     episode: Episode
// }
function VideoPlayBack(props: any) {
    const { episode } = props;

    // const [episodes, setEpisodes] = useState(episode);
    console.log(" thsi si videos play back 000000000  ", episode.id)
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
        <View>
            <Video
                ref={video}
                style={styles.video}
                source={{ uri: episode.video }}
                posterSource={{ uri: episode.poster }}
                useNativeControls
                usePoster={true}
                isLooping={true}
                posterStyle={{ resizeMode: 'cover' }}
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                resizeMode="contain"
            />
            {!status.isPlaying &&
                <Ionicons
                    onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                    style={{ position: 'absolute', zIndex: 100, top: 70, left: 170, }}
                    name="play" size={100} color="#FFF" />}

            {/* <View style={styles.buttons}>
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
            </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    video: {
        aspectRatio: 16 / 9,
        width: '100%',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

})
export default VideoPlayBack;
