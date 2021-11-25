import React, { useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import movie from '../data/movie';
import { ScrollView } from "react-native";
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import StyledButton from '../components/StyledButton';
import EpisodeItem from '../components/EpisodeItems';
import { Picker } from '@react-native-picker/picker';
import VideoPlayer from '../components/VideoPlayBack';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNBackgroundDownloader from 'react-native-background-downloader';
import LinearProgress from 'react-native-elements/dist/linearProgress/LinearProgress';
import DownloadItem from '../components/DownloadItem';
import { addDownload } from '../store/actions/DownloadActions';
import { useDispatch } from 'react-redux';
const firstSeason = movie.seasons.items[0];
const poster = firstSeason.episodes.items[0].poster

function MovieDetailScreen() {

    const [currentSeason, setCurrentSeason] = useState(firstSeason);
    const [currentEpisode, setCurrentEpisode] = useState(firstSeason.episodes.items[0])
    const dispatch = useDispatch();

    const seasonNames = movie.seasons.items.map((item) => item.name);
    const [progress, setProgress] = useState(0);
    const [isloading, setIsLoading] = useState(false);

    const callback = (downloadProgress: any) => {

        const progress =
            (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite);
        console.log("progress: ", progress);
        if (progress > 0) {
            setIsLoading(false);
        }
        setProgress(progress);

    };

    //creating downloadResumable.
    const resumableDownload = useRef(FileSystem.createDownloadResumable(
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        FileSystem.documentDirectory + 'small.mp4',
        {},
        callback,
    ));
    //starting download
    const startDownload = async () => {
        try {
            await resumableDownload.current.downloadAsync();
            console.log("this is the finish data");

            console.log(resumableDownload.current.savable());

        } catch (err) {
            console.log(err);

        }
    };

    //pausing donwload
    const pauseDownload = async () => {
        try {
            await resumableDownload.current.pauseAsync();

            console.log('Paused download operation, saving for future retrieval');
            console.log("download data: ", resumableDownload.current.savable());
            AsyncStorage.setItem('pausedDownload', JSON.stringify(resumableDownload.current.savable()));
        } catch (e) {
            console.error(e);
        }
    }

    // resuming download
    const resumDownload = async () => {
        try {
            const { uri } = await resumableDownload.current.resumeAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View >
            <VideoPlayer episode={currentEpisode} />

            <FlatList
                data={currentSeason.episodes.items}
                style={{ marginBottom: 245, }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (<EpisodeItem item={item} onPress={(episode) => {
                    console.log(episode);
                    setCurrentEpisode(episode);

                }} />)}
                ListHeaderComponent={(
                    <View  >
                        <Pressable onPress={() => {
                            resumDownload();
                        }}>
                            <View style={styles.movieTitleCon} >
                                <Text style={styles.movieTitle}>{movie.title}</Text>
                            </View>
                        </Pressable>
                        <View style={styles.info}>
                            <Text style={styles.match}>98% match</Text>
                            <Text>{movie.year}</Text>
                            <View style={styles.age}>
                                <Text style={{ color: "black" }}>12+</Text>
                            </View>
                            <Text>{movie.numberOfSeasons} Seasons</Text>
                            <MaterialIcons name="hd" size={24} color="white" style={{ marginLeft: 7 }} />
                        </View>
                        <View style={styles.detail}>
                            <StyledButton color="white" onPress={async () => {
                                pauseDownload();

                            }}>
                                <AntDesign name="caretright" size={24} color="black" />
                                <Text style={{ color: "black" }}> Play</Text>
                            </StyledButton>
                            <StyledButton color="#444" onPress={async () => {
                                await dispatch(addDownload(resumableDownload.current.savable(), 1, null, false));
                                console.log(resumableDownload.current.savable());

                                // startDownload();
                                console.log("hello");
                            }}>
                                <AntDesign name="download" size={24} color="white" />
                                <Text> Download</Text>
                            </StyledButton>
                            {/* // progressbar */}
                            {/* <DownloadItem progress={progress} /> */}
                            <Text style={{ marginVertical: 5, }}>{movie.plot}</Text>
                            <View style={{ paddingVertical: 5, }}>
                                <Text style={{ color: "#bfbdbd" }}>Cast: {movie.cast}</Text>
                                <Text style={{ color: "#bfbdbd" }}>Creator: {movie.creator}</Text>
                            </View>
                            <View style={styles.options}>
                                <View style={styles.iconW}>
                                    <AntDesign name="plus" size={24} color="white" />
                                    <Text>My List</Text>
                                </View>
                                <View style={styles.iconW}>
                                    <Feather name="thumbs-up" size={24} color="white" />
                                    <Text>Rate</Text>
                                </View>
                                <View style={styles.iconW}>
                                    <Feather name="send" size={24} color="white" />
                                    <Text>Share</Text>
                                </View>
                            </View>
                            <View style={styles.headerItemList}>
                                <Text style={{ fontWeight: "bold", marginRight: 20, }}>EPIDOES</Text>
                                <Text style={{ color: "#bfbdbd", fontWeight: "bold" }}>MORE LIKE THIS</Text>
                            </View>

                        </View>
                        <View style={styles.seasons}>
                            <Picker
                                style={{ color: "white", width: 140 }}
                                dropdownIconColor="white"
                                selectedValue={currentSeason.name}
                                onValueChange={(itemValue, itemIndex) => {

                                    setCurrentSeason(movie.seasons.items[itemIndex])
                                }}>
                                {seasonNames.map((item) => (
                                    <Picker.Item label={item} value={item} />
                                ))}

                            </Picker>
                        </View>
                    </View>
                )} />

        </View>
    );
}

const styles = StyleSheet.create({

    image: {
        width: "100%",
        aspectRatio: 16 / 9,
        resizeMode: "contain",

    },
    movieTitleCon: {
        width: "100%",
        padding: 5,
        paddingLeft: 10,
        height: 45,
        justifyContent: "flex-end",
        backgroundColor: "#333",
    },
    movieTitle: {
        fontSize: 30,
        fontWeight: "700",
    },
    info: {
        flexDirection: "row",
        padding: 10,


    },
    match: {
        color: "#5ffa43",
        marginRight: 10,
    },
    age: {
        // justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        borderRadius: 3,
        backgroundColor: "yellow",
        marginHorizontal: 12,
    },
    detail: {
        marginHorizontal: 10,

    },
    options: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 10,

    },
    iconW: {
        alignItems: "center",
        marginHorizontal: 30,
    },
    headerItemList: {
        flexDirection: "row",
        padding: 10,

    },
    seasons: {
        backgroundColor: "#222",
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%",
    }

})

export default MovieDetailScreen;