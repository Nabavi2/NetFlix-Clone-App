import React, { useEffect, useState } from 'react';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Image, StyleSheet } from 'react-native'
import { View, Text } from './../components/Themed';
import movie from '../data/movie'
import Colors from '../constants/Colors';
import EpisodeItems from '../components/EpisodeItems';
import VideoPlayBack from '../components/VideoPlayBack';
import { useDispatch, useSelector } from 'react-redux';
import * as movieActions from '../store/actions/movie';
function MovieDetailScreen() {
    //const videos = useSelector((state) => state.movies.availableMovies);
    const dispatch = useDispatch();
    const firstEpisode = movie.seasons.items[0].episodes.items[0];
    const firstSeasone = movie.seasons.items[0];
    const seasons = movie.seasons.items.map(season => (season.name));
    const [currentSeasone, setCurrentSeasone] = useState(firstSeasone)
    const [currentEpisode, setCurrentEpisode] = useState(firstSeasone.episodes.items[0])

    // const getMovie = async () => {
    //     try {
    //         await dispatch(movieActions.fetchMovies());
    //         console.log("Movies fetched");
    //     } catch (err: any) {
    //         alert(err.message);
    //     }

    // }

    // useEffect(() => {
    //     getMovie();
    // })



    return (
        <View style={{ flex: 1, }}>

            {/* <Image
                style={styles.image}
                source={{ uri: firstEpisode.poster }}
            /> */}
            <VideoPlayBack episode={movie.seasons.items[0].episodes.items[0]} />
            <FlatList
                data={currentSeasone.episodes.items}
                renderItem={({ item }) => (
                    <EpisodeItems episode={item} onPress={setCurrentEpisode} />
                )}
                ListHeaderComponent={(
                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: 30, margin: 10 }}>{movie.title}</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Text style={{ color: '#61a832', marginHorizontal: 7 }}>98% match</Text>
                            <Text style={{ fontSize: 18, marginHorizontal: 10, }}>{movie.year}</Text>
                            <View style={styles.numContainer}>
                                <Text style={{ color: 'black', }}>12+</Text>
                            </View>
                            <Text style={styles.text1}>{movie.numberOfSeasons}</Text>
                            <Text style={styles.text2}>{movie.seasons.items[0].id}</Text>
                            <MaterialIcons name="hd" size={24} color="white" />
                        </View>
                        <TouchableOpacity style={styles.playIcon}>
                            <Ionicons name="play-sharp" size={24} color="black" />
                            <Text style={{ color: 'black', marginLeft: 5 }}>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.downloadIcon}>
                            <AntDesign name="download" size={24} color="black" />
                            <Text style={{ color: '#FFF', marginLeft: 5 }}>DownLoad</Text>
                        </TouchableOpacity>
                        <Text style={{ margin: 15, alignItems: 'center' }}> {movie.plot} </Text>
                        <Text style={{ marginHorizontal: 10, color: '#4e5450' }}  > Cast: {movie.cast} </Text>
                        <Text style={{ marginHorizontal: 10, color: '#4e5450' }}  > Creator: {movie.creator} </Text>
                        <View style={{ backgroundColor: '#FFF', width: '80%', height: 1, marginLeft: 13, marginTop: 5, }}></View>
                        <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 10, }}>
                            <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                <MaterialIcons name="add" size={26} color="#FFF" />
                                <Text>My List</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                <Feather name="thumbs-up" size={26} color="#FFF" />
                                <Text>Rate</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginHorizontal: 20 }}>
                                <FontAwesome name="send-o" size={26} color="#FFF" />
                                <Text>Rate</Text>
                            </View>

                        </View>
                        <View style={{ backgroundColor: 'red', width: 80, height: 2, marginLeft: 40, marginTop: 5 }}></View>

                        <View style={{ marginTop: 10, marginBottom: 20, flexDirection: 'row' }}>
                            <Text style={{ marginHorizontal: 14 }}> EPISODES </Text>
                            <Text style={{ color: '#8e96a3' }}>MORE LIKE THIS</Text>
                        </View>
                        <Picker
                            style={{ width: 150, color: '#FFF' }}
                            selectedValue={currentSeasone.name}
                            onValueChange={(itemValue, itemIndex) => setCurrentSeasone(movie.seasons.items[itemIndex])}
                            dropdownIconColor="#FFF"
                        >
                            {seasons.map(seasonName => (<Picker.Item label={seasonName} value={seasonName} />))

                            }
                        </Picker>
                    </View>
                )}
            />

            {/* <TouchableOpacity
                style={{
                    backgroundColor: '#633f59',
                    width: '90%',
                    height: 40,
                    borderRadius: 25,
                    marginBottom: 20,
                    marginTop: 7,
                    alignItems: 'center', justifyContent: 'center',
                }}
                onPress={async () => {
                    console.log("Videos form reducer1 : ", videos)

                    console.log("Videos form reducer2 : ", videos)
                }}
            >
                <Text> fetch movie</Text>
            </TouchableOpacity> */}

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
        marginRight: 2
    },
    text2: {
        fontSize: 18,
        marginLeft: 2,
        marginRight: 10
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

})
export default MovieDetailScreen;