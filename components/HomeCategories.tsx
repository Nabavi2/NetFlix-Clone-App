import React from 'react';
import { StyleSheet, Image, FlatList, Pressable, TouchableOpacity } from 'react-native';
import categories from '../data/categories';
import { View, Text } from './../components/Themed';
import Navigation from '../navigation/index';
import { useNavigation } from '@react-navigation/native';
import movie from '../data/movie';
import MovieDetailScreen from '../screens/MovieDetailScreen';
interface HomeCategoryScreen {
    category: {
        id: string,
        title: string,
        movies: {
            id: string,
            poster: string
        }[]
    }
};
function HomeCategories(props: HomeCategoryScreen,) {
    const { category } = props;
    const navigation = useNavigation();
    // const onPress = (movie: { id: any; poster?: string; }) => {
    //     navigation.navigate('MovieDetailScreen', { id: movie.id });
    // }
    let i = 0;
    return (

        <>
            <View style={styles.container}>

                <View style={{ backgroundColor: 'black', marginBottom: 10 }}>
                    <Text style={{ margin: 10, }}>
                        {category.title}

                    </Text>

                    <FlatList
                        data={category.movies}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => navigation.navigate('MovieDetailScreen')}>

                                <Image style={styles.image} source={{ uri: item.poster }} />
                            </Pressable>
                        )
                        }
                        horizontal
                    />

                </View>

            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    image: {
        width: 120,
        height: 200,
        borderRadius: 7,
        margin: 8
    }
})
export default HomeCategories;