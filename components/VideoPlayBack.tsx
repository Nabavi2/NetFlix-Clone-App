import { Video } from 'expo-av';
import { Playback } from 'expo-av/build/AV';
import React, { useEffect, useRef, useState } from 'react';
import { Episode } from '../types';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';


interface VideoPlayerProps {
    episode: Episode,
}

function VideoPlayer(props: VideoPlayerProps) {

    const { episode} = props;
    const videoRef = useRef<Playback>(null);
    const [status, setStatus] = useState({});
    
    useEffect( () => {
        if(!videoRef){
            return;
        }
       const playNext =  ( async () => {
           console.log("hellloooo");
           
            await videoRef?.current?.unloadAsync();
            await videoRef?.current?.loadAsync({uri: episode.video}, {},false);
            
        });

        playNext();

    }, [episode])


    return (
     <View>





         
          <Video
        
        ref={videoRef}
        style={styles.video}
        source={{uri: episode.video}}
        resizeMode="contain"
        posterSource={{uri: episode.poster}}
         usePoster
        posterStyle={{resizeMode: "cover"}}
        useNativeControls
        onPlaybackStatusUpdate={ (status) => setStatus( () => status) }
      />
     </View>
    );
}

const styles = StyleSheet.create({
    video: {
        width: "100%",
        aspectRatio: 16/9,
    }
})

export default VideoPlayer;