import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import movie from '../data/movie';
import { View, Text } from './../components/Themed';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import HomeCategories from '../components/HomeCategories';
import * as movieActions from '../store/actions/movie';
import { useDispatch, useSelector } from 'react-redux';
import Movie from './../models/Movie';

function HomeScreen() {
    const data = useSelector((state) => state.movies.availableMovies);
    console.log("this is selector dataKKKKKKKKKK", data);
    const dispatch = useDispatch()
    // const getMovie = useCallback(async () => {
    //     try {
    //         await dispatch(movieActions.fetchMovies());

    //     } catch (err: any) {
    //         alert(err.message);
    //     }

    // }, [dispatch])
    // useEffect(() => {
    //     getMovie();
    // }, [dispatch, getMovie])
    return (
        <View style={styles.container}>

            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <HomeCategories category={item} />
                )}
            />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default HomeScreen;