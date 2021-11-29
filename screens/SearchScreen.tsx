import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, TextInput, Image, Button, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import * as movieActions from '../store/actions/movie';
import * as seriesActions from '../store/actions/series';
function SearchScreen() {


    // const movies = useSelector((state) => state.movies.availableMovies);
    const episode: [] = useSelector((state) => state.series.availableEpisode);
    const movies: [] = useSelector((state) => state.movies.availableMovies);

    // const data = series.prototype.concat(movies);
    const data = movies.concat(episode)
    console.log('CONCAT DATA DADADADAD IN SEARCH SCREAN DATA  ', data)



    const [filterData, setFilterData] = useState(data);
    const [search, setSearch] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


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
            setFilterData(data);
            setSearch(text)
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <SearchBar
                placeholder="Search..."
                onChangeText={(text) => searchFilterFunction(text)}
                autoCorrect={true}
                value={search}
            />
            {/* <View style={{ flexDirection: 'row-reverse', width: '100%', marginTop: 20, marginLeft: 10, marginRight: 10, }}>
            </View> */}
            <FlatList
                data={filterData}

                renderItem={({ item }) => {
                    return (
                        <View style={{ flexDirection: 'row', width: "90%", marginTop: 20, }}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.poster }} />
                            <Text style={{ color: 'red', fontSize: 24, padding: 10, }}>{item.title}</Text>
                        </View>
                    )
                }}
                style={{ marginLeft: 10, }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    image: {
        marginLeft: 10,
        marginBottom: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#c75a5f',
        resizeMode: 'cover',
    },
    input: {
        borderColor: 'grey',
        width: '96%',
        borderWidth: 1,
    }
})
export default SearchScreen;