// import React, { useRef, useState } from 'react';
// import { FlatList, Image, StyleSheet, Dimensions, Pressable } from 'react-native';
// import { Text, View } from '../components/Themed';
// import movie from '../data/movie';
// import { ScrollView } from "react-native";
// import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
// import StyledButton from '../components/StyledButton';
// import EpisodeItem from '../components/EpisodeItems';
// import { Picker } from '@react-native-picker/picker';
// import VideoPlayer from '../components/VideoPlayBack';
// import * as FileSystem from 'expo-file-system';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// // import RNBackgroundDownloader from 'react-native-background-downloader';
// import LinearProgress from 'react-native-elements/dist/linearProgress/LinearProgress';
// import DownloadItem from '../components/DownloadItem';
// import { addDownload } from '../store/actions/download';
// import { useDispatch } from 'react-redux';
// const firstSeason = movie.seasons.items[0];
// const poster = firstSeason.episodes.items[0].poster

// function MovieDetailScreen() {

//     const [currentSeason, setCurrentSeason] = useState(firstSeason);
//     const [currentEpisode, setCurrentEpisode] = useState(firstSeason.episodes.items[0])
//     const dispatch = useDispatch();

//     const seasonNames = movie.seasons.items.map((item) => item.name);
//     const [progress, setProgress] = useState(0);
//     const [isloading, setIsLoading] = useState(false);

//     const callback = (downloadProgress: any) => {

//         const progress =
//             (downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite);
//         console.log("progress: ", progress);
//         if (progress > 0) {
//             setIsLoading(false);
//         }
//         setProgress(progress);

//     };

//     //creating downloadResumable.
//     const resumableDownload = useRef(FileSystem.createDownloadResumable(
//         'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
//         FileSystem.documentDirectory + 'small.mp4',
//         {},
//         callback,
//     ));
//     //starting download
//     const startDownload = async () => {
//         try {
//             await resumableDownload.current.downloadAsync();
//             console.log("this is the finish data");

//             console.log(resumableDownload.current.savable());

//         } catch (err) {
//             console.log(err);

//         }
//     };

//     //pausing donwload
//     const pauseDownload = async () => {
//         try {
//             await resumableDownload.current.pauseAsync();

//             console.log('Paused download operation, saving for future retrieval');
//             console.log("download data: ", resumableDownload.current.savable());
//             AsyncStorage.setItem('pausedDownload', JSON.stringify(resumableDownload.current.savable()));
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     // resuming download
//     const resumDownload = async () => {
//         try {
//             const { uri } = await resumableDownload.current.resumeAsync();
//             console.log('Finished downloading to ', uri);
//         } catch (e) {
//             console.error(e);
//         }
//     }

//     return (
//         <View >
//             <VideoPlayer episode={currentEpisode} />

//             <FlatList
//                 data={currentSeason.episodes.items}
//                 style={{ marginBottom: 245, }}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (<EpisodeItem item={item} onPress={(episode) => {
//                     console.log(episode);
//                     setCurrentEpisode(episode);

//                 }} />)}
//                 ListHeaderComponent={(
//                     <View  >
//                         <Pressable onPress={() => {
//                             resumDownload();
//                         }}>
//                             <View style={styles.movieTitleCon} >
//                                 <Text style={styles.movieTitle}>{movie.title}</Text>
//                             </View>
//                         </Pressable>
//                         <View style={styles.info}>
//                             <Text style={styles.match}>98% match</Text>
//                             <Text>{movie.year}</Text>
//                             <View style={styles.age}>
//                                 <Text style={{ color: "black" }}>12+</Text>
//                             </View>
//                             <Text>{movie.numberOfSeasons} Seasons</Text>
//                             <MaterialIcons name="hd" size={24} color="white" style={{ marginLeft: 7 }} />
//                         </View>
//                         <View style={styles.detail}>
//                             <StyledButton color="white" onPress={async () => {
//                                 pauseDownload();

//                             }}>
//                                 <AntDesign name="caretright" size={24} color="black" />
//                                 <Text style={{ color: "black" }}> Play</Text>
//                             </StyledButton>
//                             <StyledButton color="#444" onPress={async () => {
//                                 await dispatch(addDownload(resumableDownload.current.savable(), 1, null, false));
//                                 console.log(resumableDownload.current.savable());

//                                 // startDownload();
//                                 console.log("hello");
//                             }}>
//                                 <AntDesign name="download" size={24} color="white" />
//                                 <Text> Download</Text>
//                             </StyledButton>
//                             {/* // progressbar */}
//                             {/* <DownloadItem progress={progress} /> */}
//                             <Text style={{ marginVertical: 5, }}>{movie.plot}</Text>
//                             <View style={{ paddingVertical: 5, }}>
//                                 <Text style={{ color: "#bfbdbd" }}>Cast: {movie.cast}</Text>
//                                 <Text style={{ color: "#bfbdbd" }}>Creator: {movie.creator}</Text>
//                             </View>
//                             <View style={styles.options}>
//                                 <View style={styles.iconW}>
//                                     <AntDesign name="plus" size={24} color="white" />
//                                     <Text>My List</Text>
//                                 </View>
//                                 <View style={styles.iconW}>
//                                     <Feather name="thumbs-up" size={24} color="white" />
//                                     <Text>Rate</Text>
//                                 </View>
//                                 <View style={styles.iconW}>
//                                     <Feather name="send" size={24} color="white" />
//                                     <Text>Share</Text>
//                                 </View>
//                             </View>
//                             <View style={styles.headerItemList}>
//                                 <Text style={{ fontWeight: "bold", marginRight: 20, }}>EPIDOES</Text>
//                                 <Text style={{ color: "#bfbdbd", fontWeight: "bold" }}>MORE LIKE THIS</Text>
//                             </View>

//                         </View>
//                         <View style={styles.seasons}>
//                             <Picker
//                                 style={{ color: "white", width: 140 }}
//                                 dropdownIconColor="white"
//                                 selectedValue={currentSeason.name}
//                                 onValueChange={(itemValue, itemIndex) => {

//                                     setCurrentSeason(movie.seasons.items[itemIndex])
//                                 }}>
//                                 {seasonNames.map((item) => (
//                                     <Picker.Item label={item} value={item} />
//                                 ))}

//                             </Picker>
//                         </View>
//                     </View>
//                 )} />

//         </View>
//     );
// }

// const styles = StyleSheet.create({

//     image: {
//         width: "100%",
//         aspectRatio: 16 / 9,
//         resizeMode: "contain",

//     },
//     movieTitleCon: {
//         width: "100%",
//         padding: 5,
//         paddingLeft: 10,
//         height: 45,
//         justifyContent: "flex-end",
//         backgroundColor: "#333",
//     },
//     movieTitle: {
//         fontSize: 30,
//         fontWeight: "700",
//     },
//     info: {
//         flexDirection: "row",
//         padding: 10,


//     },
//     match: {
//         color: "#5ffa43",
//         marginRight: 10,
//     },
//     age: {
//         // justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 4,
//         borderRadius: 3,
//         backgroundColor: "yellow",
//         marginHorizontal: 12,
//     },
//     detail: {
//         marginHorizontal: 10,

//     },
//     options: {
//         flexDirection: "row",
//         width: "100%",
//         paddingVertical: 10,

//     },
//     iconW: {
//         alignItems: "center",
//         marginHorizontal: 30,
//     },
//     headerItemList: {
//         flexDirection: "row",
//         padding: 10,

//     },
//     seasons: {
//         backgroundColor: "#222",
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         width: "100%",
//     }

// })

// export default MovieDetailScreen;
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Text, View } from "../components/Themed";
import movie from "../data/movie";
import { ScrollView } from "react-native";
import {
    AntDesign,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
import { addDownload } from "../store/actions/download";
import * as movieActions from "../store/actions/movie";
import * as seriesActions from "../store/actions/series";
import series from "../store/reducers/series";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import VideoPlayBack from "../components/VideoPlayBack";
import EpisodeItems from "../components/EpisodeItems";

function MovieDetailScreen(props: any) {
    const dispatch = useDispatch();

    //creating downloadResumable.
    const resumableDownload = useRef(
        FileSystem.createDownloadResumable(
            "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            FileSystem.documentDirectory + "small.mp4",
            {}
        )
    );
    const navigation = useNavigation();
    const id = props.route.params.movieId;
    const id2 = props.route.params.seriesId;

    let movieId = id;
    let seriesId = id2;

    const episode = useSelector((state) => state.series.availableEpisode);
    const season = useSelector((state) => state.series.availableSeason);
    const movieById = useSelector((state) => state.movies.availableMovieById);
    const series = useSelector((state) => state.series.availableSeries);
    const seasons = season.map((seasonName: any) => seasonName.name);
    const firstEpisode = episode;
    const firstSeasone = season;
    const [currentSeasone, setCurrentSeasone] = useState(firstSeasone);
    const [currentEpisode, setCurrentEpisode] = useState(firstEpisode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const episodeAndSeasonHandler = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            {
                movieId ? await dispatch(movieActions.fetchMovieById(id)) : null;
            }
            await dispatch(seriesActions.fetchSeries());
            await dispatch(seriesActions.fetchEpisode());
            await dispatch(seriesActions.fetchSeason());
            setIsLoading(false);
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
            alert(err.message);
        }
    }, [dispatch]);
    useEffect(() => {
        episodeAndSeasonHandler();
    }, [dispatch, episodeAndSeasonHandler]);
    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#c75a5f" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000", paddingTop: 20 }}>
            <View>
                <FlatList
                    data={movieId ? movieById : episode}
                    renderItem={({ item }) => {
                        return <VideoPlayBack episode={item} />;
                    }}
                />
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#000' }}>
                    <FlatList
                        key={movieId}
                        data={movieId ? movieById : series}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ backgroundColor: '#000' }}>
                                    <Text style={{ fontSize: 30, margin: 10, color: "#FFF" }}>
                                        {item.title}
                                    </Text>

                                    <View
                                        style={{ flexDirection: "row-reverse", marginLeft: 10, backgroundColor: '#000' }}
                                    >
                                        <Text style={{ color: "#61a832", marginHorizontal: 7 }}>
                                            98% match
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                marginHorizontal: 10,
                                                color: "#FFF",
                                            }}
                                        >
                                            {item.name}
                                        </Text>
                                        <View style={styles.numContainer}>
                                            <Text style={{ color: "black" }}>12+</Text>
                                        </View>
                                        <Text style={styles.text1}>{item.title}</Text>
                                        <Text style={styles.text2}>{item.id}</Text>
                                        <MaterialIcons name="hd" size={24} color="white" />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            return <Text>lsdjflsd</Text>;
                                        }}
                                        style={styles.playIcon}
                                    >
                                        <Ionicons name="play-sharp" size={24} color="black" />
                                        <Text style={{ color: "black", marginLeft: 5 }}>Play</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.downloadIcon}
                                        onPress={async () => {
                                            await dispatch(
                                                addDownload(
                                                    resumableDownload.current.savable(),
                                                    movieById.id,
                                                    episode.id,
                                                    false
                                                )
                                            );
                                        }}
                                    >
                                        <AntDesign name="download" size={24} color="black" />
                                        <Text style={{ color: "#FFF", marginLeft: 5 }}>
                                            DownLoad
                                        </Text>
                                    </TouchableOpacity>

                                    <Text
                                        style={{ margin: 15, alignItems: "center", color: "#FFF" }}
                                    >
                                        {" "}
                                        {item.plot}{" "}
                                    </Text>
                                    <Text style={{ marginHorizontal: 10, color: "#4e5450" }}>
                                        {" "}
                                        Cast: {item.cast}{" "}
                                    </Text>
                                    <Text style={{ marginHorizontal: 10, color: "#4e5450" }}>
                                        {" "}
                                        Creator: {item.creator_name}{" "}
                                    </Text>
                                    <View
                                        style={{
                                            backgroundColor: "#FFF",
                                            width: "80%",
                                            height: 1,
                                            marginLeft: 13,
                                            marginTop: 5,
                                        }}
                                    ></View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            marginHorizontal: 30,
                                            marginTop: 10,
                                            backgroundColor: "#000"
                                        }}
                                    >
                                        <View
                                            style={{ alignItems: "center", marginHorizontal: 20, backgroundColor: "#000" }}
                                        >
                                            <MaterialIcons name="add" size={26} color="#FFF" />
                                            <Text style={{ color: "#FFF" }}>My List</Text>
                                        </View>
                                        <View
                                            style={{ alignItems: "center", marginHorizontal: 20, backgroundColor: "#000" }}
                                        >
                                            <Feather name="thumbs-up" size={26} color="#FFF" />
                                            <Text style={{ color: "#FFF" }}>Rate</Text>
                                        </View>
                                        <View
                                            style={{ alignItems: "center", marginHorizontal: 20, backgroundColor: "#000" }}
                                        >
                                            <FontAwesome name="send-o" size={26} color="#FFF" />
                                            <Text style={{ color: "#FFF" }}>Rate</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: "red",
                                            width: 80,
                                            height: 2,
                                            marginLeft: 40,
                                            marginTop: 5,
                                        }}
                                    ></View>

                                    <View
                                        style={{
                                            marginTop: 10,
                                            marginBottom: 20,
                                            flexDirection: "row",
                                            backgroundColor: "#000"
                                        }}
                                    >
                                        {seriesId ? (
                                            <Text style={{ marginHorizontal: 14, color: "#8e96a3" }}>
                                                {" "}
                                                EPISODES{" "}
                                            </Text>
                                        ) : (
                                            <Text style={{ marginHorizontal: 14, color: "#8e96a3" }}>
                                                {" "}
                                                MOVIE{" "}
                                            </Text>
                                        )}
                                        <Text style={{ color: "#8e96a3" }}>MORE LIKE THIS</Text>
                                    </View>
                                    {seriesId ? (
                                        <Picker
                                            style={{
                                                width: 150,
                                                color: "#FFF",
                                                backgroundColor: "#FFF",
                                            }}
                                            selectedValue={currentSeasone.name}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setCurrentSeasone(season[itemIndex].name)
                                            }
                                            dropdownIconColor="#FFF"
                                        >
                                            {seasons.map((seasonName: any) => (
                                                <Picker.Item label={seasonName} value={seasonName} />
                                            ))}
                                        </Picker>
                                    ) : null}
                                </View>
                            );
                        }}
                    />
                </View>
                <View>
                    {seriesId ? (
                        <FlatList
                            data={movieId ? movie : episode}
                            renderItem={({ item }) => {
                                return (
                                    <EpisodeItems episode={item} onPress={setCurrentEpisode} />
                                );
                            }}
                        />
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 15,
    },
    numContainer: {
        backgroundColor: "yellow",
        width: 40,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginRight: 20,
    },
    text1: {
        fontSize: 18,
        marginRight: 2,
        color: "#FFF",
    },
    text2: {
        fontSize: 18,
        marginLeft: 2,
        marginRight: 10,
        color: "#FFF",
    },
    playIcon: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "92%",
        height: 36,
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 5,
    },
    downloadIcon: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "92%",
        height: 36,
        backgroundColor: "#4e5450",
        marginTop: 10,
        borderRadius: 5,
    },
    video: {
        aspectRatio: 16 / 9,
        width: "100%",
    },
});
export default MovieDetailScreen;
