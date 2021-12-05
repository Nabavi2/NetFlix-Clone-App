import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity, ScrollView, ListView } from 'react-native';

import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { useSelector } from 'react-redux';



function SeriesCategories(props: any) {
    const { category } = props;
    const episode = useSelector((state) => state.series.availableEpisode);
    const season = useSelector((state) => state.series.availableSeason);

    const navigation = useNavigation();
    console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNDDDDDDDDDDD ,', episode.season_id)

    let i = 0;
    return (
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
                            console.log('IIIIIIIIIIIIIIIIIIIIITTTTTTTTTEEEEEEEEEMM ', item);
                            navigation.setParams('MovieDetailScreen', { seriesId: item.season_d.series_id });
                            navigation.navigate('MovieDetailScreen', { seriesId: item.season_d.series_id })
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
        backgroundColor: "#000",
        width: "100%",
        height: 240,
    },
    image: {
        overflow: "hidden",
        width: 130,
        height: 180,
        borderRadius: 7,
        margin: 8,
        alignSelf: "center",
        resizeMode: "cover",
        // aspectRatio: 16 / 9,
    },
})
export default SeriesCategories;