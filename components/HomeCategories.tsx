import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity, ScrollView, ListView } from 'react-native';

import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';


function HomeCategories(props: any) {
    const { category } = props;

    console.log('CAAAAAAAAAAAAAAAAAAAAA ', category)
    const movie = useSelector((state) => state.movies.availableMovies);


    const navigation = useNavigation();


    let i = 0;
    return (
        <View style={styles.container}>
            <Text style={{ marginVertical: 10, marginLeft: 10, color: '#FFF', fontSize: 20, }}>
                {category.title}
            </Text>
            <FlatList
                data={movie}
                key={movie.id}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={() => {
                            navigation.setParams('MovieDetailScreen', { movieId: item.id });
                            navigation.navigate('MovieDetailScreen', { movieId: item.id })
                        }}>
                            <Image style={styles.image} source={{ uri: item.poster }} />
                        </Pressable>
                    )
                }}
                horizontal
            />

        </View >

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#000',
        width: '100%',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 7,
        margin: 8,
        alignSelf: 'center',
        resizeMode: 'cover',
        aspectRatio: 16 / 9,

    }
})
export default HomeCategories;
