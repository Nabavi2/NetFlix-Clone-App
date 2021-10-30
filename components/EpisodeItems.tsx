import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity } from 'react-native';
import categories from '../data/categories';
import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import movie from '../data/movie';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { AntDesign } from '@expo/vector-icons';
// const episod = movie.seasons.items[0].episodes.items[0];

interface EpisodesItem {
    episode: {
        id: string,
        title: string,
        poster: string,
        duration: string,
        plot: string,
        video: string,

    }
};
function EpisodeItems(props: EpisodesItem,) {
    const { episode } = props;

    return (
        <View style={{ flex: 1, padding: 8, }}>
            <View style={styles.container}>

                <Image
                    style={styles.imageView}
                    source={{ uri: episode.poster }} />
                <View style={styles.rowContainer}>
                    <Text style={{ fontSize: 12, }}>{episode.title}</Text>
                    <Text style={{ fontSize: 10, color: '#968d8c' }}> {episode.duration} </Text>
                </View>
                <AntDesign name="download" size={24} color="#FFF" />
            </View>
            <Text style={{ marginHorizontal: 10, marginBottom: 10, }}> {episode.plot} </Text>
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 5,
        alignItems: 'center',


    },
    rowContainer: {
        width: 180,
        height: 100,
        justifyContent: 'center'
    }
    ,
    imageView: {
        width: 130,
        aspectRatio: 16 / 9,
        resizeMode: 'cover',
        borderRadius: 7,
        alignItems: 'center',
        marginRight: 15,
    }
})
export default EpisodeItems;