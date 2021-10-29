import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native'
import { View, Text } from './../components/Themed';
import movie from '../data/movie'
import Colors from '../constants/Colors';
function MovieDetailScreen() {
    const secondCat = movie.seasons.items[0].episodes.items[0];
    return (
        <View style={{ flex: 1, }}>

            <Image
                style={styles.image}
                source={{ uri: secondCat.poster }}
            />
            <Text style={{ fontSize: 30, margin: 10 }}>{movie.title}</Text>
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <Text style={{ color: '#61a832', marginHorizontal: 7 }}>98% match</Text>
                <Text style={{ fontSize: 18, marginHorizontal: 10, }}>{movie.year}</Text>
                <View style={styles.numContainer}>
                    <Text style={{ color: 'black', }}>12+</Text>
                </View>
                <Text style={styles.text1}>{movie.numberOfSeasons}</Text>
                <Text style={styles.text2}>{movie.seasons.items[0].id}</Text>
                <Ionicons name="open" size={20} color="black" />
            </View>



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
    }
})
export default MovieDetailScreen;