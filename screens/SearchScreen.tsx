import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, Image, Button, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as movieActions from '../store/actions/movie';
import * as seriesActions from '../store/actions/series';
function SearchScreen() {


    const movies = useSelector((state) => state.movies.availableMovies);
    const series = useSelector((state) => state.series.availableSeries);


    const [filterData, setFilterData] = useState(movies);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    // const dispatch = useDispatch()
    // const movieAndSeriesHandler = useCallback(async () => {
    //     try {
    //         setError(null)
    //         setIsLoading(true);
    //         await dispatch(movieActions.fetchMovies());
    //         await dispatch(seriesActions.fetchSeries());
    //         setIsLoading(false);
    //     } catch (err: any) {
    //         setError(err.message)
    //         setIsLoading(false);
    //         alert(err.message);
    //     }

    // }, [dispatch])
    // useEffect(() => {
    //     movieAndSeriesHandler();
    // }, [dispatch, movieAndSeriesHandler]);


    // setFilterData(movies);
    // setMasterData(movies);
    const searchFilterFunction = (text: any) => {
        if (text) {
            const newData = filterData.filter((item: any) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterData(newData);
            setSearch(text);

        } else {
            setFilterData(movies);
            setSearch(text)
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row-reverse', width: '100%', }}>
                <TextInput
                    style={{ borderColor: 'black', width: 200 }}
                    placeholder="Type Here"
                    onChangeText={(text) => searchFilterFunction(text)}
                    autoCorrect={true}
                    value={search}

                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={searchFilterFunction}
                >
                    <Text>Search</Text>
                </TouchableOpacity>

            </View>
            <FlatList
                data={movies}
                key={movies.id}
                renderItem={({ item }) => {
                    return (
                        <Image
                            style={styles.image}
                            source={{ uri: item.poster }} />
                    )
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        marginLeft: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#c75a5f',
        resizeMode: 'cover',
    },
    button: {
        backgroundColor: '#633f59',
        width: 80,
        height: 40,
        borderRadius: 25,
        marginBottom: 20,
        marginTop: 7,
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default SearchScreen;