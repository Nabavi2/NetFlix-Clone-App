import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native'
// import { View, Text } from './../components/Themed';
import movie from '../data/movie'
import Colors from '../constants/Colors';
import EpisodeItems from '../components/EpisodeItems';
import VideoPlayBack from '../components/VideoPlayBack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as movieActions from '../store/actions/movie';
import * as seriesActions from '../store/actions/series';
import series from '../store/reducers/series';
import { Video } from 'expo-av';
import { Playback } from 'expo-av/build/AV';


function MovieDetailScreen(props: any) {
    const navigation = useNavigation();
    const id = props.route.params.movieId;
    const id2 = props.route.params.seriesId;

    let movieId = id;
    let seriesId = id2;

    console.log("THIS IS SERRRISSSS IIIIIIDDDDDDDD  ", seriesId)



    const dispatch = useDispatch();
    const episode = useSelector((state) => state.series.availableEpisode);
    const season = useSelector((state) => state.series.availableSeason);
    const movieById = useSelector((state) => state.movies.availableMovieById);
    const series = useSelector((state) => state.series.availableSeries);
    const seasons = season.map((seasonName) => seasonName.name);
    const firstEpisode = episode;
    const firstSeasone = season;
    const [currentSeasone, setCurrentSeasone] = useState(firstSeasone)
    const [currentEpisode, setCurrentEpisode] = useState(firstEpisode);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log("THIS IS EEEPPPPISSSSOnDDDD ", episode)
    console.log("THIS IS SSSSSEEEEOOOSSSSOOOONNNNN ", season)
    console.log("THIS IS SSSEEERRRRRRRRRRRRR ", series)



    const episodeAndSeasonHandler = useCallback(async () => {
        try {
            setError(null)
            setIsLoading(true);
            { movieId ? await dispatch(movieActions.fetchMovieById(id)) : null; }
            await dispatch(seriesActions.fetchSeries());
            await dispatch(seriesActions.fetchEpisode());
            await dispatch(seriesActions.fetchSeason());
            setIsLoading(false);
        } catch (err: any) {
            setError(err.message)
            setIsLoading(false);
            alert(err.message);
        }

    }, [dispatch])
    useEffect(() => {
        episodeAndSeasonHandler();

    }, [dispatch, episodeAndSeasonHandler]);
    if (isLoading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size='large' color='#c75a5f' />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 20, }}>
            {/* <Image
                style={styles.image}
                source={{ uri: firstEpisode.poster }}
            /> */}


            {/* <View style={{ flex: 1, }}> */}
            <View>
                <FlatList
                    data={movieId ? movieById : episode}
                    renderItem={({ item }) => {
                        return (
                            <VideoPlayBack episode={item} />
                        )
                    }}
                />
            </View>
            <ScrollView>
                <View>
                    <FlatList
                        key={movieId}
                        data={movieId ? movieById : series}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Text style={{ fontSize: 30, margin: 10, color: '#FFF' }}>{item.title}</Text>

                                    <View style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
                                        <Text style={{ color: '#61a832', marginHorizontal: 7 }}>98% match</Text>
                                        <Text style={{ fontSize: 18, marginHorizontal: 10, color: '#FFF' }}>{item.name}</Text>
                                        <View style={styles.numContainer}>
                                            <Text style={{ color: 'black', }}>12+</Text>
                                        </View>
                                        <Text style={styles.text1}>{item.title}</Text>
                                        <Text style={styles.text2}>{item.id}</Text>
                                        <MaterialIcons name="hd" size={24} color="white" />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {

                                            return (
                                                <Text>lsdjflsd</Text>
                                            )
                                        }}
                                        style={styles.playIcon}>
                                        <Ionicons name="play-sharp" size={24} color="black" />
                                        <Text style={{ color: 'black', marginLeft: 5 }}>Play</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.downloadIcon}>
                                        <AntDesign name="download" size={24} color="black" />
                                        <Text style={{ color: '#FFF', marginLeft: 5 }}>DownLoad</Text>
                                    </TouchableOpacity>
                                    <Text style={{ margin: 15, alignItems: 'center', color: '#FFF' }}> {item.plot} </Text>
                                    <Text style={{ marginHorizontal: 10, color: '#4e5450' }}  > Cast: {item.cast} </Text>
                                    <Text style={{ marginHorizontal: 10, color: '#4e5450' }}  > Creator: {item.creator_name} </Text>
                                    <View style={{ backgroundColor: '#FFF', width: '80%', height: 1, marginLeft: 13, marginTop: 5, }}></View>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 10, }}>
                                        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                            <MaterialIcons name="add" size={26} color="#FFF" />
                                            <Text style={{ color: '#FFF' }}>My List</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                            <Feather name="thumbs-up" size={26} color="#FFF" />
                                            <Text style={{ color: '#FFF' }}>Rate</Text>
                                        </View>
                                        <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                            <FontAwesome name="send-o" size={26} color="#FFF" />
                                            <Text style={{ color: '#FFF' }}>Rate</Text>
                                        </View>

                                    </View>
                                    <View style={{ backgroundColor: 'red', width: 80, height: 2, marginLeft: 40, marginTop: 5 }}></View>

                                    <View style={{ marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                                        {
                                            seriesId ? <Text style={{ marginHorizontal: 14, color: '#8e96a3' }}> EPISODES </Text> :
                                                <Text style={{ marginHorizontal: 14, color: '#8e96a3' }}> MOVIE </Text>
                                        }


                                        <Text style={{ color: '#8e96a3' }}>MORE LIKE THIS</Text>
                                    </View>
                                    {seriesId ?

                                        <Picker
                                            style={{ width: 150, color: '#FFF', backgroundColor: '#FFF' }}
                                            selectedValue={currentSeasone.name}
                                            onValueChange={(itemValue, itemIndex) => setCurrentSeasone(season[itemIndex].name)}
                                            dropdownIconColor="#FFF"
                                        >
                                            {seasons.map((seasonName) => (<Picker.Item label={seasonName} value={seasonName} />))}
                                            {/* <Picker.Item label={currentSeasone} value={currentSeasone} />) */}
                                        </Picker>

                                        : null}
                                </View>

                            )
                        }}
                    />

                </View>
                <View>
                    {seriesId ?
                        <FlatList
                            data={movieId ? movie : episode}
                            renderItem={({ item }) => {
                                return (
                                    <EpisodeItems episode={item} onPress={setCurrentEpisode} />
                                )
                            }}
                        />
                        : null
                    }
                </View>
            </ScrollView>
            {/* </View> */}
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 16 / 9
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginHorizontal: 15,
    },
    numContainer: {
        backgroundColor: 'yellow',
        width: 40,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 20,

    },
    text1: {
        fontSize: 18,
        marginRight: 2,
        color: '#FFF'
    },
    text2: {
        fontSize: 18,
        marginLeft: 2,
        marginRight: 10,
        color: '#FFF'
    },
    playIcon: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "92%",
        height: 36,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 5,

    },
    downloadIcon: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "92%",
        height: 36,
        backgroundColor: '#4e5450',
        marginTop: 10,
        borderRadius: 5,
    },
    video: {
        aspectRatio: 16 / 9,
        width: '100%'

    }
})
export default MovieDetailScreen;