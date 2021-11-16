import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity, ScrollView } from 'react-native';

import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import movie from '../data/movie';
import MovieDetailScreen from '../screens/MovieDetailScreen';
// interface HomeCategoryScreen {
//     category: {
//         id: string,
//         title: string,
//         movies: {
//             id: string,
//             poster: string
//         }[]
//     }
// };
function HomeCategories(props: any,) {
    const { category } = props;
    const navigation = useNavigation();

    // const onPress = (movie: { id: any; poster?: string; }) => {
    //     navigation.navigate('MovieDetailScreen', { id: movie.id });
    // }
    let i = 0;
    console.log(" 999999 ", category.categoryId.title);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={{ margin: 10, color: '#000' }}>
                    {category.categoryId.title}
                </Text>
                <Pressable onPress={() => navigation.navigate('MovieDetailScreen')}>
                    <Image style={styles.image} source={{ uri: category.poster }} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate('MovieDetailScreen')}>
                    <Image style={styles.image} source={{ uri: category.poster }} />
                </Pressable>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'

    },
    image: {
        maxWidth: '100%',
        width: "100%",
        height: 200,
        borderRadius: 7,
        margin: 8,
        alignSelf: 'center',
        marginHorizontal: 10,
        padding: 8,
    }
})
export default HomeCategories;