import React from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';
import categories from '../data/categories';
import movie from '../data/movie';
import { View, Text } from './../components/Themed';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import HomeCategories from '../components/HomeCategories';
// const firstCat = categories.items[0];
// const secondCat = movie.seasons.items[0].episodes.items[0];
function HomeScreen() {

    return (
        <View style={styles.container}>
            {/* <FlatList
                data={firstCat.movies}
                renderItem={({ item }) => (
                    <HomeCategories category={firstCat} />
                    )}
            /> */}
            <Text>this is home Screen</Text>




        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default HomeScreen;