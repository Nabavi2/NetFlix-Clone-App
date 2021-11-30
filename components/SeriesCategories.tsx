import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity, ScrollView, ListView } from 'react-native';

import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import movie from '../data/movie';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { useSelector } from 'react-redux';



function SeriesCategories(props: any) {
    const { category } = props;
    const series = useSelector((state) => state.series.availableSeries);
    const episode = useSelector((state) => state.series.availableEpisode);

    const navigation = useNavigation();

    let i = 0;
    return (
        // <View style={styles.container}>
        //     <ScrollView
        //         horizontal={true}
        //     >
        //         <View style={{ backgroundColor: '#000', width: '100%' }} >
        //             <Text style={{ margin: 10, color: '#FFF', fontSize: 24, }}>
        //                 {category.title}
        //             </Text>
        //             <Pressable onPress={() => {
        //                 navigation.setParams('MovieDetailScreen', { seriesId: category.id });
        //                 navigation.navigate('MovieDetailScreen', { seriesId: category.id })
        //             }}>
        //                 <Image style={styles.image} source={{ uri: category.poster }} />

        //             </Pressable>
        //         </View>

        //     </ScrollView >
        // </View >
        <View style={styles.container}>
            <Text style={{ margin: 10, color: '#FFF', fontSize: 20 }}>
                {category.title}
            </Text>
            <FlatList
                data={episode}
                key={episode.id}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => {
                            navigation.setParams('MovieDetailScreen', { episodeId: item.id });
                            navigation.navigate('MovieDetailScreen', { episodeId: item.id })
                        }}>
                            <Image style={styles.image} source={{ uri: item.poster }} />
                        </Pressable>
                    )
                }}
                horizontal
            />

        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#000',

        marginBottom: 20,

    },
    image: {
        width: '96%',
        height: 200,
        borderRadius: 7,
        margin: 8,
        alignSelf: 'center',
        resizeMode: 'cover',
        aspectRatio: 16 / 9,

    }
})
export default SeriesCategories;